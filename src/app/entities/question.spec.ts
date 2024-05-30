import { Question } from './question';

describe('Question', () => {
    let question: Question;

    beforeEach(() => {
        question = new Question(
            1,
            'What is your favorite color?',
            'text',
            ['Red', 'Blue', 'Green'],
            ['Blue'],
            10,
            60
        );
    });

    it('should create an instance', () => {
        expect(question).toBeTruthy();
    });

    it('should have the correct question_id', () => {
        expect(question.question_id).toBe(1);
    });

    it('should have the correct question text', () => {
        expect(question.question).toBe('What is your favorite color?');
    });

    it('should have the correct type_question', () => {
        expect(question.type_question).toBe('text');
    });

    it('should have the correct incorrect_answers', () => {
        expect(question.incorrect_answers).toEqual(['Red', 'Blue', 'Green']);
    });

    it('should have the correct correct_answers', () => {
        expect(question.correct_answers).toEqual(['Blue']);
    });

    it('should have the correct points', () => {
        expect(question.points).toBe(10);
    });

    it('should have the correct time_limit_sec', () => {
        expect(question.time_limit_sec).toBe(60);
    });
});
