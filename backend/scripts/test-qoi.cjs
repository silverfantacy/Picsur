// Exercise the native QOI addon after installation on the target Node.js runtime.
const assert = require('node:assert/strict');
const { createRequire } = require('node:module');
const { resolve } = require('node:path');
const qoi = createRequire(resolve(__dirname, '../package.json'))('qoi-img');

async function main() {
  const pixels = Buffer.from([255, 0, 0, 255, 0, 255, 0, 128]);
  const options = { width: 2, height: 1, channels: 4 };
  const encoded = qoi.QOIencode(pixels, options);
  assert.ok(qoi.IsQOI(encoded));
  const decoded = qoi.QOIdecode(encoded);
  assert.equal(decoded.width, options.width);
  assert.equal(decoded.height, options.height);
  assert.deepEqual(decoded.pixels, pixels);
  // Construct and collect stream states to exercise the patched native finalizer.
  for (let i = 0; i < 32; i++) {
    new qoi.QOIEncoder(options).destroy();
    new qoi.QOIDecoder(4).destroy();
  }
  await new Promise(setImmediate);
  if (global.gc) global.gc();
  console.log(`${process.version}: native QOI encode/decode and stream state lifetimes passed`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
