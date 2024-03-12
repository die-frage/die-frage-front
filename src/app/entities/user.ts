export class User {
    id: number;
    firstName: string;
    lastName: string;
    patronymic: string;
    email: string;
    password: string[];

    constructor(id: number, firstName: string, lastName: string, patronymic: string, email: string, password: string[]) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.patronymic = patronymic;
        this.email = email;
        this.password = password;
    }
}
