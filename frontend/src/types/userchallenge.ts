import { Schedule } from './challenges';
import { UserTaskListData } from './usertasks';

export interface UserChallengeData {
  enrolledDate: Date;
  percentCompleted: number;
  userTasks: UserTaskListData[];
  schedule: Schedule;
}
