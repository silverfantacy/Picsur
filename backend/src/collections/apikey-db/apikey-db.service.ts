import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
    AsyncFailable,
    Fail,
    FT,
    HasFailed,
} from 'picsur-shared/dist/types/failable';
import { FindResult } from 'picsur-shared/dist/types/find-result';
import { generateRandomString } from 'picsur-shared/dist/util/random';
import { Repository } from 'typeorm';
import { hashSync, compareSync } from 'bcrypt-ts';
import { EApiKeyBackend } from '../../database/entities/apikey.entity.js';
import { EUserBackend } from '../../database/entities/users/user.entity.js';

@Injectable()
export class ApiKeyDbService {
  private readonly logger = new Logger(ApiKeyDbService.name);

  constructor(
    @InjectRepository(EApiKeyBackend)
    private readonly apikeyRepo: Repository<EApiKeyBackend>,
  ) {}

  async createApiKey(userid: string): AsyncFailable<EApiKeyBackend<string>> {
    const apikey = new EApiKeyBackend<string>();
    apikey.user = userid;
    apikey.created = new Date();
    // YYYY-MM-DD- followed by a random string for uniqueness
    apikey.name =
      new Date().toISOString().slice(0, 10) +
      '_' +
      generateRandomString(6);

    // Generate plaintext key and hash it for storage
    const plaintextKey = generateRandomString(32);
    apikey.key = hashSync(plaintextKey, 10);

    try {
      const saved = await this.apikeyRepo.save(apikey);
      // Return the plaintext key only once to the user
      return { ...saved, key: plaintextKey } as EApiKeyBackend<string>;
    } catch (e) {
      return Fail(FT.Database, e);
    }
  }

  async findOne(
    id: string,
    userid: string | undefined,
  ): AsyncFailable<EApiKeyBackend<string>> {
    try {
      const apikey = await this.apikeyRepo.findOne({
        where: {
          user:
            userid !== undefined
              ? // This is stupid, but typeorm do typeorm
                ({ id: userid } as any)
              : undefined,
          id,
        },
        loadRelationIds: true,
      });
      if (!apikey) return Fail(FT.NotFound, 'API key not found');
      return apikey as EApiKeyBackend<string>;
    } catch (e) {
      return Fail(FT.Database, e);
    }
  }

  async findMany(
    count: number,
    page: number,
    userid: string | undefined,
  ): AsyncFailable<FindResult<EApiKeyBackend<string>>> {
    if (count < 1 || page < 0) return Fail(FT.UsrValidation, 'Invalid page');
    if (count > 100) return Fail(FT.UsrValidation, 'Too many results');

    try {
      const [apikeys, amount] = await this.apikeyRepo.findAndCount({
        where: {
          user:
            userid !== undefined
              ? // This is stupid, but typeorm do typeorm
                ({ id: userid } as any)
              : undefined,
        },
        order: { created: 'DESC' },
        skip: count * page,
        take: count,
        loadRelationIds: true,
      });

      return {
        results: apikeys as EApiKeyBackend<string>[],
        total: amount,
        page,
        pages: Math.ceil(amount / count),
      };
    } catch (e) {
      return Fail(FT.Database, e);
    }
  }

  async updateApiKey(
    id: string,
    name: string,
    userid: string | undefined,
  ): AsyncFailable<EApiKeyBackend<string>> {
    const apikey = await this.findOne(id, userid);
    if (HasFailed(apikey)) return apikey;

    try {
      apikey.name = name;

      return this.apikeyRepo.save(apikey);
    } catch (e) {
      return Fail(FT.Database, e);
    }
  }

  async deleteApiKey(
    id: string,
    userid: string | undefined,
  ): AsyncFailable<EApiKeyBackend<string>> {
    const apikeyToDelete = await this.findOne(id, userid);
    if (HasFailed(apikeyToDelete)) return apikeyToDelete;

    const apiKeyCopy = { ...apikeyToDelete };
    try {
      await this.apikeyRepo.remove(apikeyToDelete);
      return apiKeyCopy as EApiKeyBackend<string>;
    } catch (e) {
      return Fail(FT.Database, e);
    }
  }

  async resolve(key: string): AsyncFailable<EApiKeyBackend<EUserBackend>> {
    try {
      // Note: Since keys are hashed, we need to fetch all keys and compare
      // For better performance in production, consider:
      // 1. Adding an indexed lookup field (e.g., SHA256 of key)
      // 2. Implementing caching for frequently used keys
      // 3. Setting reasonable limits on total API keys per user
      const apikeys = await this.apikeyRepo.find({
        relations: ['user'],
      });

      for (const apikey of apikeys) {
        if (compareSync(key, apikey.key)) {
          this.updateLastUsed(apikey);
          return apikey as EApiKeyBackend<EUserBackend>;
        }
      }

      return Fail(FT.NotFound, 'API key not found');
    } catch (e) {
      return Fail(FT.Database, e);
    }
  }

  private updateLastUsed(apikey: EApiKeyBackend) {
    (async () => {
      apikey.last_used = new Date();
      this.apikeyRepo.save(apikey);
    })().catch(this.logger.error.bind(this.logger));
  }
}
