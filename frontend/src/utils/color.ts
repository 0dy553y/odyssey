import { ChallengeColor } from '../types/challenges';

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
