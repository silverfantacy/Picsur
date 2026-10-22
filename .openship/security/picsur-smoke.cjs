const assert=require('node:assert/strict');
const {createRequire}=require('node:module');
const z=require('node:zlib');
const data=Buffer.from('Hecate Node.js security runtime smoke');
assert.deepEqual(z.brotliDecompressSync(z.brotliCompressSync(data)),data);

(async()=>{
assert.equal(process.version,"v22.23.4");
const r=createRequire('/picsur/backend/package.json');const q=r('qoi-img');
const pixels=Buffer.from([255,0,0,255]);assert.deepEqual(q.QOIdecode(q.QOIencode(pixels,{width:1,height:1,channels:4})).pixels,pixels);
for(let i=0;i<32;i++){new q.QOIEncoder({width:1,height:1,channels:4}).destroy();new q.QOIDecoder(4).destroy();}
r('bmp-img');r('posix.js');const out=await r('sharp')({create:{width:2,height:2,channels:4,background:'#ff0000'}}).png().toBuffer();assert.ok(out.length>0);
await new Promise(setImmediate);if(global.gc)global.gc();

console.log(process.version,"picsur native modules and Brotli OK");
})().catch(e=>{console.error(e);process.exitCode=1;});
