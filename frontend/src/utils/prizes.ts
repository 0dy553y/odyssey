import { Prize } from 'types/prize';

// Please help name, I have no creativity.
export const prizes: Prize[] = [
  {
    prizeName: 'Talaria',
    prizePath: 'shoe.vox',
    challengeName: 'Walking',
  },
  {
    prizeName: 'Journal',
    prizePath: 'journal.vox',
    challengeName: 'Gratitude Journaling',
  },
];

export function getPrizePath(challengeName: string): string {
  const prize = prizes.filter(
    (p: Prize) => p.challengeName === challengeName
  )[0];
  if (prize) {
    return prize.prizePath;
  } else {
    // placeholder.
    return 'trophy';
  }
}

export function getPrize(challengeName: string): Prize {
  const prize = prizes.filter(
    (p: Prize) => p.challengeName === challengeName
  )[0];
  return prize;
}
