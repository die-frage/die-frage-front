import {CanActivate, Router} from '@angular/router';
import {TokenStorageService} from "../auth/token-storage.service";
import {Injectable} from "@angular/core";


@Injectable({
  providedIn: 'root'
})
export class authGuard implements CanActivate {

  constructor(private router: Router, private tokenStorageService: TokenStorageService) {}

  canActivate(): boolean {
    if (this.tokenStorageService.getToken()) {
      return true; // Если токен есть, разрешаем доступ
    } else {
      this.router.navigate(['/sign-in']); // Если токен отсутствует, перенаправляем на страницу входа
      return false;
    }
  }
}
