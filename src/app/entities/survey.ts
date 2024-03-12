import {PointSystem} from "./point-system";
import {Question} from "./question";
import {Status} from "./status";
import {User} from "./user";

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
  user: User;
  status: Status;
  point_system: PointSystem[];
  questions: Question[];

  constructor(
    survey_id: number, title: string, max_students: number, code: string,
    link: string, qrCode: string, date_begin: string, date_end: string,
    type: string, user: User, status: Status, point_system: PointSystem[],
    questions: Question[]) {
    this.survey_id = survey_id;
    this.title = title;
    this.max_students = max_students;
    this.code = code;
    this.link = link;
    this.qrCode = qrCode;
    this.date_begin = date_begin;
    this.date_end = date_end;
    this.type = type;
    this.user = user;
    this.status = status;
    this.point_system = point_system;
    this.questions = questions;
  }
}
