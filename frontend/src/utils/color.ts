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

export function getComplementaryColor(color: ChallengeColor): string {
  switch (color) {
    case ChallengeColor.BLUE:
      return '#BE90A0';
    case ChallengeColor.PURPLE:
      return '#DDC28F';
    default:
      return '#FFF';
  }
}
