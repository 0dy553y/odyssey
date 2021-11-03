import { Prize } from 'types/prize';

// Please help name, I have no creativity.
export const prizes: Prize[] = [
  {
    prizeName: 'Talaria',
    prizePath: 'shoe.vox',
    prizeDescription: 'Winged shoes - perfect for walking',
  },
  {
    prizeName: 'Red Talaria',
    prizePath: 'shoe_5k.vox',
    prizeDescription: 'Red shoes make you fly',
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
    prizeName: 'Mindful Orb',
    prizePath: 'blue_orb.vox',
    prizeDescription: 'Ormmmmmmm',
  },
  {
    prizeName: 'Golden Gauntlet',
    prizePath: 'gauntlet.vox',
    prizeDescription: 'Helps you do pull ups',
  },
  {
    prizeName: 'Antique Disc',
    prizePath: 'music_disc.vox',
    prizeDescription: 'Wonder what it stores?',
  },
  {
    prizeName: "Sun's Flower",
    prizePath: 'sunflower.vox',
    prizeDescription: "There's a zombie on my lawn",
  },
  {
    prizeName: 'Rainbow Umbrella',
    prizePath: 'umbrella.vox',
    prizeDescription: 'Protects you from rainy days',
  },
  {
    prizeName: 'Peach',
    prizePath: 'peach.vox',
    prizeDescription: '👀',
  },
  {
    prizeName: 'Squid Ink',
    prizePath: 'ink_bottle.vox',
    prizeDescription: 'Let your words flow',
  },
  {
    prizeName: 'Alarmed Clock',
    prizePath: 'alarmed_clock.vox',
    prizeDescription: 'Brrrr brrrr',
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
