import { Prize } from 'types/prize';

// Please help name, I have no creativity.
export const prizes: Prize[] = [
  {
    prizeName: 'Talaria',
    prizePath: 'shoe.vox',
    prizeDescription: 'Winged shoes to give you that extra spring in your step',
  },
  {
    prizeName: 'Journal',
    prizePath: 'journal.vox',
    prizeDescription: 'Dear Diary',
  },
  {
    prizeName: 'Moon Cheese',
    prizePath: 'moon_cheese.vox',
    prizeDescription: 'Who moved my cheese?',
  },
  {
    prizeName: 'Brick Phone',
    prizePath: 'brick_phone.vox',
    prizeDescription: 'Before social media was a thing',
  },
  {
    prizeName: 'CS3216',
    prizePath: '3216.vox',
    prizeDescription: 'Changing the world, one app at a time',
  },
  {
    prizeName: 'LEGO',
    prizePath: 'lego.vox',
    prizeDescription: 'Building blocks of imagination',
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
    prizeDescription: 'Not your ordinary trophy',
  };
}
