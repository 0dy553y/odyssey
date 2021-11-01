import { ChallengeColor } from '../types/challenges';

export function getHexCode(color: ChallengeColor): string {
  switch (color) {
    case ChallengeColor.BLUE:
      return '#3836A6';
    case ChallengeColor.PURPLE:
      return '#9F88E3';
    case ChallengeColor.NAVY:
      return '#2B2A5E';
    case ChallengeColor.ORANGE:
      return '#CC871F';
    case ChallengeColor.PINK:
      return '#B17B9C';
    case ChallengeColor.GREEN:
      return '#3CA195';
    default:
      // Black
      return '#000000';
  }
}

export function getComplementaryColor(color: ChallengeColor): string {
  switch (color) {
    case ChallengeColor.BLUE:
      return '#BE90A0';
    case ChallengeColor.PURPLE:
      return '#DDC28F';
    case ChallengeColor.NAVY:
      return '#99AEF8';
    case ChallengeColor.ORANGE:
      return '#FFCE84';
    case ChallengeColor.PINK:
      return '#9CB17B';
    case ChallengeColor.GREEN:
      return '#BEECA1';
    default:
      return '#FFF';
  }
}
