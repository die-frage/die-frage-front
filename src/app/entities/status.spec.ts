import { Status } from './status';

describe('Status', () => {
    let status: Status;

    beforeEach(() => {
        status = new Status(1, 'CREATED_STATUS');
    });

    it('should create an instance', () => {
        expect(status).toBeTruthy();
    });

    it('should have the correct id', () => {
        expect(status.id).toBe(1);
    });

    it('should have the correct name', () => {
        expect(status.name).toBe('CREATED_STATUS');
    });

    it('should update the name correctly', () => {
        status.name = 'UPDATED_STATUS';
        expect(status.name).toBe('UPDATED_STATUS');
    });

    it('should update the id correctly', () => {
        status.id = 2;
        expect(status.id).toBe(2);
    });
});
