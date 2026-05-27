import sharp from "sharp";
import { readFileSync } from "fs";

const input = "public/logo.png";
const output = "public/logo.png";

const image = sharp(input);
const { data, info } = await image
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const pixels = new Uint8Array(data);
const threshold = 220; // pixels mais brancos que isso viram transparentes

for (let i = 0; i < pixels.length; i += 4) {
  const r = pixels[i];
  const g = pixels[i + 1];
  const b = pixels[i + 2];

  const isWhiteOrNearWhite = r > threshold && g > threshold && b > threshold;
  if (isWhiteOrNearWhite) {
    pixels[i + 3] = 0; // alpha = 0 (transparente)
  }
}

await sharp(Buffer.from(pixels), {
  raw: { width: info.width, height: info.height, channels: 4 },
})
  .png()
  .toFile(output);

console.log(`✅ Branco removido — ${output} salvo com fundo transparente.`);
