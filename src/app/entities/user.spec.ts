import { User } from './user';

describe('User', () => {
    it('should create an instance of User', () => {
        const user = new User(1, 'John', 'Doe', 'Smith', 'john.doe@example.com', 'password123');
        expect(user).toBeTruthy();
        expect(user.id).toBe(1);
        expect(user.first_name).toBe('John');
        expect(user.last_name).toBe('Doe');
        expect(user.patronymic).toBe('Smith');
        expect(user.email).toBe('john.doe@example.com');
        expect(user.password).toBe('password123');
    });

    it('should correctly assign properties', () => {
        const user = new User(2, 'Jane', 'Doe', 'Johnson', 'jane.doe@example.com', 'password456');
        expect(user.id).toBe(2);
        expect(user.first_name).toBe('Jane');
        expect(user.last_name).toBe('Doe');
        expect(user.patronymic).toBe('Johnson');
        expect(user.email).toBe('jane.doe@example.com');
        expect(user.password).toBe('password456');
    });
});
