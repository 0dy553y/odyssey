import { Prize } from 'types/prize';

// Please help name, I have no creativity.
export const prizes: Prize[] = [
  // {
  //   prizeName: 'Talaria',
  //   prizePath: 'shoe.vox',
  //   challengeName: 'Walking',
  // },
  {
    prizeName: 'Journal',
    prizePath: 'journal.vox',
    challengeName: 'Gratitude Journaling',
  },
  {
    prizeName: 'Moon Cheese',
    prizePath: 'moon_cheese.vox',
    challengeName: 'Healthy Eating',
  },
  {
    prizeName: 'Brick Phone',
    prizePath: 'brick_phone.vox',
    challengeName: 'Social Media Detox',
  },
  {
    prizeName: 'CS3216',
    prizePath: '3216.vox',
    challengeName: 'CS3216',
  },
  {
    prizeName: 'LEGO',
    prizePath: 'lego.vox',
    challengeName: 'LEGO',
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
  if (prize) {
    return prize;
  } else {
    return {
      challengeName: challengeName,
      prizePath: 'trophy',
      prizeName: `${challengeName} Trophy`,
    };
  }
}
