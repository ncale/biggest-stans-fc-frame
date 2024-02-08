import satori, { SatoriOptions } from 'satori';
import SvgMarkup from '@/src/components/SvgMarkup';
import { join } from 'path';
import * as fs from "fs";

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

async function makeSvg(username: string, stanUsernames: string[], stanTotalReactions: number[]): Promise<string> {
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

export default makeSvg;