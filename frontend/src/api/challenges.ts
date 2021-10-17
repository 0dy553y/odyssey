import { ApiPromise, EmptyPayload } from '../types/api';
import {
  ChallengeData,
  ChallengeListData,
  ChallengePostData,
  ChallengePutData,
  Schedule,
} from '../types/challenges';
import BaseAPI from './base';

class ChallengesAPI extends BaseAPI {
  public static getChallengesUrl(): string {
    return 'challenges';
  }

  public getChallengeList(): ApiPromise<ChallengeListData[]> {
    return this.get(ChallengesAPI.getChallengesUrl());
  }

  public getChallenge(challengeId: number): ApiPromise<ChallengeData> {
    return this.get(`${ChallengesAPI.getChallengesUrl()}/${challengeId}`);
  }

  public getChallengeTasks(challengeId: number): ApiPromise<ChallengeData> {
    return this.get(`${ChallengesAPI.getChallengesUrl()}/${challengeId}`);
  }

  public joinChallenge(
    challengeId: number,
    recurringDays: Schedule
  ): ApiPromise<ChallengeData> {
    return this.post(
      `${ChallengesAPI.getChallengesUrl()}/${challengeId}/join`,
      { schedule: recurringDays }
    );
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
