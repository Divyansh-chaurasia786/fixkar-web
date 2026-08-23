const fs = require('fs');
const path = require('path');
const PNG = require('pngjs').PNG;

const inputPath = `C:\\Users\\Admin\\.gemini\\antigravity\\brain\\3f431345-2077-4afb-803a-9203352a4a15\\.user_uploaded\\media_1786697249880.png`;
const outputPath = `C:\\Users\\Admin\\.gemini\\antigravity\\scratch\\fixkar-web\\public\\fixkar-logo.png`;

fs.createReadStream(inputPath)
  .pipe(new PNG({ filterType: 4 }))
  .on('parsed', function() {
    console.log(`Processing logo image: ${this.width}x${this.height}`);

    // Flood fill background detection starting from corners (0,0), (width-1, 0), etc.
    const visited = new Uint8Array(this.width * this.height);
    const queue = [];

    // Add corners to queue
    const corners = [
      [0, 0],
      [this.width - 1, 0],
      [0, this.height - 1],
      [this.width - 1, this.height - 1]
    ];

    const getIdx = (x, y) => (this.width * y + x) << 2;

    for (const [cx, cy] of corners) {
      const idx = getIdx(cx, cy);
      const r = this.data[idx];
      const g = this.data[idx + 1];
      const b = this.data[idx + 2];
      // If corner is background-like (light)
      if (r > 230 && g > 230 && b > 230) {
        queue.push([cx, cy]);
        visited[cy * this.width + cx] = 1;
      }
    }

    // Flood fill connected background pixels
    while (queue.length > 0) {
      const [x, y] = queue.pop();
      const idx = getIdx(x, y);

      // Make background pixel transparent
      this.data[idx + 3] = 0;

      // Check 4-neighbors
      const neighbors = [
        [x + 1, y],
        [x - 1, y],
        [x, y + 1],
        [x, y - 1]
      ];

      for (const [nx, ny] of neighbors) {
        if (nx >= 0 && nx < this.width && ny >= 0 && ny < this.height) {
          const nPos = ny * this.width + nx;
          if (!visited[nPos]) {
            const nIdx = getIdx(nx, ny);
            const nr = this.data[nIdx];
            const ng = this.data[nIdx + 1];
            const nb = this.data[nIdx + 2];

            // If neighbor is light background
            if (nr > 225 && ng > 225 && nb > 225) {
              visited[nPos] = 1;
              queue.push([nx, ny]);
            }
          }
        }
      }
    }

    // Secondary pass for anti-aliasing edges near background
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const pPos = y * this.width + x;
        if (!visited[pPos]) {
          const idx = getIdx(x, y);
          const r = this.data[idx];
          const g = this.data[idx + 1];
          const b = this.data[idx + 2];
          
          // Smooth fringe around edges
          if (r > 240 && g > 240 && b > 240) {
            const distToWhite = (r + g + b) / 3;
            if (distToWhite > 248) {
              this.data[idx + 3] = 0;
            } else {
              const alpha = Math.max(0, Math.floor((255 - distToWhite) * 20));
              this.data[idx + 3] = Math.min(this.data[idx + 3], alpha);
            }
          }
        }
      }
    }

    this.pack().pipe(fs.createWriteStream(outputPath)).on('finish', () => {
      console.log(`Saved transparent logo to ${outputPath}`);
    });
  });
