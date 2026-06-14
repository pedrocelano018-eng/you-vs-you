import { deflateSync } from 'node:zlib'
import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const here = dirname(fileURLToPath(import.meta.url))
const out = join(here, '..', 'public')

const VIOLET = [124, 58, 237, 255]
const WHITE = [255, 255, 255, 255]

function crc32(buf) {
  let c = ~0
  for (let i = 0; i < buf.length; i++) {
    c ^= buf[i]
    for (let k = 0; k < 8; k++) c = (c >>> 1) ^ (0xedb88320 & -(c & 1))
  }
  return ~c >>> 0
}

function chunk(type, data) {
  const len = Buffer.alloc(4)
  len.writeUInt32BE(data.length, 0)
  const typeBuf = Buffer.from(type, 'ascii')
  const body = Buffer.concat([typeBuf, data])
  const crc = Buffer.alloc(4)
  crc.writeUInt32BE(crc32(body), 0)
  return Buffer.concat([len, body, crc])
}

// Distance from point to segment, for anti-aliased-ish checkmark drawing.
function distToSeg(px, py, ax, ay, bx, by) {
  const dx = bx - ax
  const dy = by - ay
  const len2 = dx * dx + dy * dy
  let t = len2 === 0 ? 0 : ((px - ax) * dx + (py - ay) * dy) / len2
  t = Math.max(0, Math.min(1, t))
  const cx = ax + t * dx
  const cy = ay + t * dy
  return Math.hypot(px - cx, py - cy)
}

function makePNG(size, rounded) {
  const radius = rounded ? size * 0.22 : 0
  const stroke = size * 0.066
  // Checkmark points scaled to size.
  const p1 = [size * 0.29, size * 0.51]
  const p2 = [size * 0.42, size * 0.64]
  const p3 = [size * 0.71, size * 0.34]

  const raw = Buffer.alloc((size * 4 + 1) * size)
  let o = 0
  for (let y = 0; y < size; y++) {
    raw[o++] = 0 // filter: none
    for (let x = 0; x < size; x++) {
      // Rounded-corner mask.
      let inside = true
      if (rounded) {
        const cxs = [radius, size - radius]
        const cys = [radius, size - radius]
        for (const cx of cxs) {
          for (const cy of cys) {
            const nearCornerX = (cx === radius && x < radius) || (cx !== radius && x > size - radius)
            const nearCornerY = (cy === radius && y < radius) || (cy !== radius && y > size - radius)
            if (nearCornerX && nearCornerY) {
              if (Math.hypot(x - cx, y - cy) > radius) inside = false
            }
          }
        }
      }

      let color = VIOLET
      if (!inside) {
        color = [0, 0, 0, 0]
      } else {
        const d = Math.min(
          distToSeg(x, y, p1[0], p1[1], p2[0], p2[1]),
          distToSeg(x, y, p2[0], p2[1], p3[0], p3[1]),
        )
        if (d <= stroke / 2) color = WHITE
      }
      raw[o++] = color[0]
      raw[o++] = color[1]
      raw[o++] = color[2]
      raw[o++] = color[3]
    }
  }

  const ihdr = Buffer.alloc(13)
  ihdr.writeUInt32BE(size, 0)
  ihdr.writeUInt32BE(size, 4)
  ihdr[8] = 8 // bit depth
  ihdr[9] = 6 // color type RGBA
  ihdr[10] = 0
  ihdr[11] = 0
  ihdr[12] = 0

  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])
  const png = Buffer.concat([
    sig,
    chunk('IHDR', ihdr),
    chunk('IDAT', deflateSync(raw, { level: 9 })),
    chunk('IEND', Buffer.alloc(0)),
  ])
  return png
}

writeFileSync(join(out, 'icon-192.png'), makePNG(192, true))
writeFileSync(join(out, 'icon-512.png'), makePNG(512, true))
writeFileSync(join(out, 'apple-touch-icon.png'), makePNG(180, false))
console.log('Icons generated in public/')
