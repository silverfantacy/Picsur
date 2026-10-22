// Exercise the native QOI addon after installation on the target Node.js runtime.
const assert = require('node:assert/strict');
const { createRequire } = require('node:module');
const { resolve } = require('node:path');
const { Readable, Writable } = require('node:stream');
const { pipeline } = require('node:stream/promises');
const qoi = createRequire(resolve(__dirname, '../package.json'))('qoi-img');

async function transform(input, codec) {
  const chunks = [];
  await pipeline(
    Readable.from([input]),
    codec,
    new Writable({
      write(chunk, encoding, callback) {
        chunks.push(chunk);
        callback();
      },
    }),
  );
  return Buffer.concat(chunks);
}

async function main() {
  const pixels = Buffer.from([255, 0, 0, 255, 0, 255, 0, 128]);
  const options = { width: 2, height: 1, channels: 4 };
  const encoded = qoi.QOIencode(pixels, options);
  assert.ok(qoi.IsQOI(encoded));
  const decoded = qoi.QOIdecode(encoded);
  assert.equal(decoded.width, options.width);
  assert.equal(decoded.height, options.height);
  assert.deepEqual(decoded.pixels, pixels);
  const streamed = await transform(pixels, new qoi.QOIEncoder(options));
  assert.deepEqual(await transform(streamed, new qoi.QOIDecoder(4)), pixels);
  if (global.gc) global.gc();
  console.log(`${process.version}: native QOI encode/decode and streams passed`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
