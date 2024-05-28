export class Question {
    question_id: number;
    question: string;
    type_question: string;
    incorrect_answers: string[];
    correct_answers: string[];
    points: number;
    time_limit_sec: number;

    constructor(question_id: number, question: string, type_question: string, incorrect_answers: string[], correct_answers: string[], points: number, time_limit_sec: number) {
        this.question_id = question_id;
        this.question = question;
        this.type_question = type_question;
        this.incorrect_answers = incorrect_answers;
        this.correct_answers = correct_answers;
        this.points = points;
        this.time_limit_sec = time_limit_sec;
    }
}
