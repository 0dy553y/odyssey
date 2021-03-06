import {
  CompletedUserChallengeListData,
  UserChallengeListData,
} from 'types/userchallenge';

export const getChallengePercentageComplete = (
  challengeId: number,
  completedChallenges: CompletedUserChallengeListData[],
  ongoingChallenges: UserChallengeListData[]
): number | null => {
  if (
    completedChallenges.find(
      (challenge) => challenge.challengeId === challengeId
    ) !== undefined
  ) {
    return 100;
  }
  const ongoing = ongoingChallenges.find(
    (challenge) => challenge.challengeId === challengeId
  );

  if (!ongoing) {
    return null;
  }

  return ongoing.percentCompleted;
};
