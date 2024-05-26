import {Question} from "./question";
import {Status} from "./status";
import {User} from "./user";

export class Survey {
    id: number;
    title: string;
    description: string;
    max_students: number;
    is_interactive: boolean;
    code: string;
    link: string;
    qr_code: string;
    date_begin: string;
    date_end: string;
    anonymous: boolean;
    user: User;
    status: Status;
    questions: Question[];

    constructor(
        survey_id: number, title: string, description: string, max_students: number, code: string,
        link: string, qr_code: string, date_begin: string, date_end: string, is_interactive: boolean,
        anonymous: boolean, user: User, status: Status,
        questions: Question[]) {
        this.id = survey_id;
        this.title = title;
        this.description = description;
        this.max_students = max_students;
        this.is_interactive = is_interactive;
        this.code = code;
        this.link = link;
        this.qr_code = qr_code;
        this.date_begin = date_begin;
        this.date_end = date_end;
        this.anonymous = anonymous;
        this.user = user;
        this.status = status;
        this.questions = questions;
    }
}
