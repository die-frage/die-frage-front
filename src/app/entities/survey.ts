import {PointSystem} from "./point-system";
import {Question} from "./question";
import {Status} from "./status";
import {User} from "./user";

export interface Survey {
  survey_id: number;
  title: string;
  max_students: number;
  code: string;
  link: string;
  qrCode: string;
  date_begin: string;
  date_end: string;
  type: string;
  user: User;
  status: Status;
  point_system: PointSystem[];
  questions: Question[];
}
