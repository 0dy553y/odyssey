import BaseAPI from './base';
import { ApiPromise, EmptyPayload } from '../types/api';
import {
  ChallengeData,
  ChallengeListData,
  ChallengePostData,
  ChallengePutData,
} from '../types/challenges';

class ChallengesAPI extends BaseAPI {
  public static getChallengesUrl(): string {
    return 'challenges';
  }

  public getChallengesList(): ApiPromise<ChallengeListData[]> {
    return this.get(ChallengesAPI.getChallengesUrl());
  }

  public getChallenge(challengeId: number): ApiPromise<ChallengeData> {
    return this.get(`${ChallengesAPI.getChallengesUrl()}/${challengeId}`);
  }

  public addChallenge(
    challengePostData: ChallengePostData
  ): ApiPromise<ChallengeData> {
    return this.post(`${ChallengesAPI.getChallengesUrl()}`, challengePostData);
  }

  public editChallenge(
    challengePutData: ChallengePutData
  ): ApiPromise<ChallengeData> {
    return this.put(
      `${ChallengesAPI.getChallengesUrl()}/${challengePutData.id}`,
      challengePutData
    );
  }

  public deleteChallenge(challengeId: number): ApiPromise<EmptyPayload> {
    return this.delete(`${ChallengesAPI.getChallengesUrl()}/${challengeId}`);
  }
}

export default ChallengesAPI;
