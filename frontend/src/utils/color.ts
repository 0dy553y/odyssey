import { ChallengeColor } from '../types/challenges';
import tinycolor from 'tinycolor2';

export function getHexCode(color: ChallengeColor): string {
  switch (color) {
    case ChallengeColor.BLUE:
      return '#3836A6';
    case ChallengeColor.PURPLE:
      return '#9F88E3';
    default:
      // Black
      return '#000000';
  }
}

export function getComplementaryColor(hexColor: string): string {
  return tinycolor(hexColor).spin(180).toHexString();
}
