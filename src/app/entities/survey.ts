import {PointSystem} from "./point-system";
import {Question} from "./question";
import {Status} from "./status";

export class Survey {
  survey_id: number;
  title: string;
  max_students: number;
  code: string;
  link: string;
  qrCode: string;
  date_begin: string;
  date_end: string;
  type: string;
  status: Status;
  point_system: PointSystem[];
  questions: Question[];
}
