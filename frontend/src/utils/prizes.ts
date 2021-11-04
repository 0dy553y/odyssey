import { Prize } from 'types/prize';

// Please help name, I have no creativity.
export const prizes: Prize[] = [
  {
    prizeName: 'Talaria',
    prizePath: 'shoe',
    prizeDescription: 'Winged shoes - perfect for walking',
  },
  {
    prizeName: 'Red Talaria',
    prizePath: 'shoe_5k',
    prizeDescription: 'Red shoes make you fly',
  },
  {
    prizeName: 'Journal',
    prizePath: 'journal',
    prizeDescription: 'Dear Diary',
  },
  {
    prizeName: 'Moon Cheese',
    prizePath: 'moon_cheese',
    prizeDescription: 'Who moved my cheese?',
  },
  {
    prizeName: 'Mindful Orb',
    prizePath: 'blue_orb',
    prizeDescription: 'Ormmmmmmm',
  },
  {
    prizeName: 'Golden Gauntlet',
    prizePath: 'gauntlet',
    prizeDescription: 'Helps you do pull ups',
  },
  {
    prizeName: 'Antique Disc',
    prizePath: 'music_disc',
    prizeDescription: 'Wonder what it stores?',
  },
  {
    prizeName: "Sun's Flower",
    prizePath: 'sunflower',
    prizeDescription: "There's a zombie on my lawn",
  },
  {
    prizeName: 'Rainbow Umbrella',
    prizePath: 'umbrella',
    prizeDescription: 'Protects you from rainy days',
  },
  {
    prizeName: 'Peach',
    prizePath: 'peach',
    prizeDescription: '👀',
  },
  {
    prizeName: 'Squid Ink',
    prizePath: 'ink_bottle',
    prizeDescription: 'Let your words flow',
  },
  {
    prizeName: 'Alarmed Clock',
    prizePath: 'alarmed_clock',
    prizeDescription: 'Brrrr brrrr',
  },
  {
    prizeName: 'Brick Phone',
    prizePath: 'brick_phone',
    prizeDescription: 'Before social media was a thing',
  },
  {
    prizeName: 'CS3216',
    prizePath: '3216',
    prizeDescription: 'Changing the world, one app at a time',
  },
  {
    prizeName: 'LEGO',
    prizePath: 'lego',
    prizeDescription: 'Building blocks of imagination',
  },
];

export function getPrizePath(prizeName: string | null): string {
  const prize = prizes.find((p: Prize) => p.prizeName === prizeName);
  if (prize) {
    return `prizes/${prize.prizePath}.vox`;
  }

  // placeholder.
  return 'prizes/trophy';
}

export function getPrize(
  prizeName: string | null,
  challengeName: string
): Prize {
  const prize = prizes.find((p: Prize) => p.prizeName === prizeName);
  if (prize) {
    return {
      ...prize,
      prizePath: `prizes/${prize.prizePath}.vox`,
    };
  }

  return {
    prizeName: `${challengeName} Trophy`,
    prizePath: 'prizes/trophy',
    prizeDescription: 'Not your ordinary trophy',
  };
}
