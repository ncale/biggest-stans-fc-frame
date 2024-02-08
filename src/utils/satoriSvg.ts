import satori, { SatoriOptions } from 'satori';
import SvgMarkup from '@/src/components/SvgMarkup';
import { join } from 'path';
import * as fs from 'fs';
import { Resvg } from '@resvg/resvg-js'

async function getFontData(): Promise<ArrayBuffer> {
  try {
    // Create path
    const fontPath = join(process.cwd(), 'Roboto-Regular.ttf')
    let fontData = fs.readFileSync(fontPath)
    return fontData;
  } catch (err) {
    console.error('Error reading file:', err);
    throw err;
  }
};

export async function makeSvg(username: string, stanUsernames: string[], stanTotalReactions: number[]): Promise<string> {
    const tsx = SvgMarkup(username, stanUsernames, stanTotalReactions);
    const fontData = await getFontData();
    const options: SatoriOptions = {
        width: 1200,
        height: 628,
        fonts: [{name: 'Inter', data: fontData}]
    }
    console.log("creating the SVG...");
    const svg = await satori(tsx, options);
    console.log("SVG output:", svg);
    return svg;
};

export function convertToPng(svg: string) {
  const opts = {
    background: 'rgba(238, 235, 230, .9)',
    fitTo: {
      mode: 'width',
      value: 1200,
    },
    font: {
      fontFiles: ['./example/SourceHanSerifCN-Light-subset.ttf'], // Load custom fonts.
      loadSystemFonts: false, // It will be faster to disable loading system fonts.
      // defaultFontFamily: 'Source Han Serif CN Light', // You can omit this.
    },
  }
  const resvg = new Resvg(svg)
  const pngData = resvg.render()
  const pngBuffer = pngData.asPng()

  console.info('Original SVG Size:', `${resvg.width} x ${resvg.height}`)
  console.info('Output PNG Size  :', `${pngData.width} x ${pngData.height}`)

  console.log("CURRENT WD:", process.cwd())

  const pngFileName = join(process.cwd(), './text-out.png')
  const response = fs.writeFileSync(pngFileName, pngBuffer)
  return pngFileName;
}
