export const challengeNameToPrizeMapping: Record<string, string> = {
  walking: 'shoe.vox',
  gratitude_journaling: 'journal.vox',
};

export function getChallengeNameKey(challengeName: string): string {
  return challengeName.toLowerCase().replace(/ /g, '_');
}

export function getPrizePath(challengeName: string): string {
  const key = getChallengeNameKey(challengeName);
  if (key in challengeNameToPrizeMapping) {
    return challengeNameToPrizeMapping[key];
  } else {
    // placeholder.
    return 'trophy';
  }
}
