import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { Resvg } from '@resvg/resvg-js'

const here = dirname(fileURLToPath(import.meta.url))
const out = join(here, '..', 'public')
const svg = readFileSync(join(out, 'icon.svg'), 'utf8')

function render(size, file) {
  const resvg = new Resvg(svg, {
    fitTo: { mode: 'width', value: size },
    font: { loadSystemFonts: true },
    background: '#ffffff',
  })
  const png = resvg.render().asPng()
  writeFileSync(join(out, file), png)
}

render(192, 'icon-192.png')
render(512, 'icon-512.png')
render(180, 'apple-touch-icon.png')
console.log('Icons generated from icon.svg')
