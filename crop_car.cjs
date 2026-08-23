const fs = require('fs');
const PNG = require('pngjs').PNG;

const refPath = `C:\\Users\\Admin\\.gemini\\antigravity\\scratch\\fixkar-web\\public\\splash-reference.png`;
const carOutPath = `C:\\Users\\Admin\\.gemini\\antigravity\\scratch\\fixkar-web\\public\\splash-car.png`;

fs.createReadStream(refPath)
  .pipe(new PNG())
  .on('parsed', function() {
    // Car bounding box in 1024x682:
    // Car is located around x=140 to x=430, y=260 to y=370
    const cropX = 135;
    const cropY = 260;
    const cropWidth = 295;
    const cropHeight = 115;

    const carPng = new PNG({ width: cropWidth, height: cropHeight });

    for (let y = 0; y < cropHeight; y++) {
      for (let x = 0; x < cropWidth; x++) {
        const srcX = cropX + x;
        const srcY = cropY + y;
        const srcIdx = (this.width * srcY + srcX) << 2;
        const destIdx = (cropWidth * y + x) << 2;

        const r = this.data[srcIdx];
        const g = this.data[srcIdx + 1];
        const b = this.data[srcIdx + 2];

        carPng.data[destIdx] = r;
        carPng.data[destIdx + 1] = g;
        carPng.data[destIdx + 2] = b;

        // Background removal for dark background pixels (R, G, B < 24)
        // Keep car body, wheels, red taillights, white highlights
        const maxVal = Math.max(r, g, b);
        if (maxVal < 18) {
          carPng.data[destIdx + 3] = 0; // Completely transparent background
        } else {
          // Feather edges near dark background
          const alpha = Math.min(255, Math.max(0, Math.floor((maxVal - 10) * 12)));
          carPng.data[destIdx + 3] = alpha;
        }
      }
    }

    carPng.pack().pipe(fs.createWriteStream(carOutPath)).on('finish', () => {
      console.log(`Car layer saved to ${carOutPath}`);
    });
  });
