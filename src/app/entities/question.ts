export interface Question {
  question_id: number;
  question: string;
  type_question: string;
  incorrect_answers: string[];
  correct_answers: string[];
  points: number;
  time_limit_sec: number;
}
