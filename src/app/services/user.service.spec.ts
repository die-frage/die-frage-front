import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user.service';
import { User } from '../entities/user';

describe('UserService', () => {
    let service: UserService;
    let httpMock: HttpTestingController;
    const baseUrl = 'http://localhost:8787/api/professor';

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [UserService]
        });
        service = TestBed.inject(UserService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    const exampleUser = new User(1, 'John', 'Doe', 'Middle', 'john.doe@example.com', 'password123');

    it('should retrieve user by email', () => {
        const email = 'john.doe@example.com';
        service.getUserByEmail(email).subscribe(user => {
            expect(user).toEqual(exampleUser);
        });

        const req = httpMock.expectOne(`${baseUrl}/by_email/${email}`);
        expect(req.request.method).toBe('GET');
        req.flush(exampleUser);
    });

    it('should update professor credentials', () => {
        const professorId = 1;
        const updatedData = {
            firstName: 'John',
            lastName: 'Doe',
            patronymic: 'Middle',
            email: 'john.doe@example.com',
            password: 'newpassword123'
        };

        service.updateProfessor(professorId, updatedData).subscribe(user => {
            expect(user).toEqual(exampleUser);
        });

        const { firstName, lastName, patronymic, email, password } = updatedData;
        const queryParams = `?firstName=${firstName}&lastName=${lastName}&patronymic=${patronymic}&email=${email}&password=${password}`;
        const req = httpMock.expectOne(`${baseUrl}/credentials/${professorId}${queryParams}`);
        expect(req.request.method).toBe('PUT');
        req.flush(exampleUser);
    });
});
