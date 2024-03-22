import {CanActivate, Router} from '@angular/router';
import {TokenStorageService} from "../auth/token-storage.service";
import {Injectable} from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class authGuard implements CanActivate {

    constructor(private router: Router, private tokenStorageService: TokenStorageService) {
    }

    canActivate(): boolean {
        if (this.tokenStorageService.getToken()) {
            return true;
        } else {
            this.router.navigate(['/sign-in']);
            return false;
        }
    }
}
