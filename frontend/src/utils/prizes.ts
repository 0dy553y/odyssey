import { Prize } from 'types/prize';

// Please help name, I have no creativity.
export const prizes: Prize[] = [
  {
    prizeName: 'Talaria',
    prizePath: 'shoe.vox',
  },
  {
    prizeName: 'Journal',
    prizePath: 'journal.vox',
  },
  {
    prizeName: 'Moon Cheese',
    prizePath: 'moon_cheese.vox',
  },
  {
    prizeName: 'Brick Phone',
    prizePath: 'brick_phone.vox',
  },
  {
    prizeName: 'CS3216',
    prizePath: '3216.vox',
  },
  {
    prizeName: 'LEGO',
    prizePath: 'lego.vox',
  },
];

export function getPrizePath(prizeName: string | null): string {
  const prize = prizes.find((p: Prize) => p.prizeName === prizeName);
  if (prize) {
    return prize.prizePath;
  }

  // placeholder.
  return 'trophy';
}

export function getPrize(
  prizeName: string | null,
  challengeName: string
): Prize {
  const prize = prizes.find((p: Prize) => p.prizeName === prizeName);
  if (prize) {
    return prize;
  }

  return {
    prizeName: `${challengeName} Trophy`,
    prizePath: 'trophy',
  };
}
