import { Prize } from 'types/prize';

// Please help name, I have no creativity.
export const prizes: Prize[] = [
  {
    prizeName: 'Talaria',
    prizePath: 'shoe.vox',
  },
  {
    prizeName: 'Red Talaria',
    prizePath: 'shoe_5k.vox',
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
    prizeName: 'Mindful Orb',
    prizePath: 'blue_orb.vox',
  },
  {
    prizeName: 'Golden Gauntlet',
    prizePath: 'gauntlet.vox',
  },
  {
    prizeName: 'Antique Disc',
    prizePath: 'music_disc.vox',
  },
  {
    prizeName: "Sun's Flower",
    prizePath: 'sunflower.vox',
  },
  {
    prizeName: 'Rainbow Umbrella',
    prizePath: 'umbrella.vox',
  },
  {
    prizeName: 'Peach',
    prizePath: 'peach.vox',
  },
  {
    prizeName: 'Squid Ink',
    prizePath: 'ink_bottle.vox',
  },
  {
    prizeName: 'Alarmed Clock',
    prizePath: 'alarmed_clock.vox',
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
