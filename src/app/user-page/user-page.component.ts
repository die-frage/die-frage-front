import { Component } from '@angular/core';
import {User} from "../entities/user";
import {TokenStorageService} from "../auth/token-storage.service";
import {UserService} from "../services/user.service";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../auth/auth.service";

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent {
  info: any;
  user: User | undefined;
  updateForm: FormGroup;
  fromBackError: boolean = false;

  constructor(private token: TokenStorageService,
              private formBuilder: FormBuilder,
              private authService: AuthService,
              private userService: UserService,
              private tokenStorage: TokenStorageService,
              private router: Router) {

    const fullnameOld = (this.user?.lastName + " " + this.user?.firstName + " " + this.user?.patronymic).replace(/^\s+/g, '');
    this.updateForm = this.formBuilder.group({
      fullname: [fullnameOld, Validators.required],
      email: [this.user?.email, [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  async ngOnInit() {
    this.info = {
      username: this.token.getUserName(),
      token: this.token.getToken()
    };
    this.user = await this.getUserByEmail(this.info.username);

    const fullnameOld = (this.user?.lastName + " " + this.user?.firstName + " " + this.user?.patronymic).replace(/^\s+/g, '');
    this.updateForm = this.formBuilder.group({
      fullname: [fullnameOld, Validators.required],
      email: [this.user?.email, [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    try {
      const urlEmail = email.replace(/@/g, '%40');
      return await this.userService.getUserByEmail(urlEmail).toPromise();
    } catch (error) {
      console.log('Error fetching user:', error);
      return undefined;
    }
  }

  get formControls() {
    return this.updateForm.controls;
  }

  onSubmit() {
    if (this.user == undefined) return;

    if (this.updateForm.value.password !== this.updateForm.value.confirmPassword) {
      this.updateForm.controls['confirmPassword'].setErrors({'passwordMismatch': true});
      return;
    }

    if (this.updateForm.invalid) {
      return;
    }

    const fullName: string = this.updateForm.get('fullname')?.value;
    const fio: string[] = fullName.split(' ');
    let lastName: string | null = ' ';
    let firstName: string | null = ' ';
    let patronomic: string | null = ' ';

    if (fio.length > 0 && fio[0] !== null) {
      lastName = fio[0];
    }
    if (fio.length > 1 && fio[1] !== null) {
      firstName = fio[1];
    }
    if (fio.length > 2 && fio[2] !== null) {
      patronomic = fio[2];
    }

    const data = {
      firstName: firstName,
      lastName: lastName,
      patronymic: patronomic,
      email: this.updateForm.get('email')?.value,
      password: this.updateForm.get('password')?.value,
    }

    this.userService.updateProfessor(this.user.id, data).subscribe(
      (updatedUser: User) => {
        // Обновление объекта пользователя данными из ответа сервера
        this.user = updatedUser;
        this.tokenStorage.signOut();

        // Формирование объекта signUpInfo для аутентификации
        const signInInfo = {
          email: updatedUser.email,
          password: data.password // Предполагается, что в data содержится обновленный пароль
        };

        // Вызов метода authService.signUp для проведения аутентификации
        this.authService.signIn(signInInfo).subscribe(
          (authData: any) => {
            // В случае успешной аутентификации сохраняем токен и email, затем перенаправляем на нужный маршрут
            this.tokenStorage.saveToken(authData.token);
            this.tokenStorage.saveEmail(signInInfo.email);
            this.router.navigate(['']);
          },
          (authError: any) => {
            // Обработка ошибок аутентификации
            if (authError.status === 409) {
              this.fromBackError = true;
            }
          }
        );
      },
      (updateError: any) => {
        console.log(updateError);
        if (updateError.status === 409) {
          this.fromBackError = true;
        }
      }
    );

  }

  onEmailInputClicked() {
    this.fromBackError = false;
  }
}
