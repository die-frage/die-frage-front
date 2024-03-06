export class SignUpInfo {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  patronymic : string;

  constructor(email: string, password: string, firstName: string, lastName: string, patronymic : string) {
    this.email = email;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
    this.patronymic = patronymic;
  }
}
