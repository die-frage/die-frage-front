import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
    selector: 'app-header-authorised',
    templateUrl: './header-authorised.component.html',
    styleUrls: ['./header-authorised.component.css']
})
export class HeaderAuthorisedComponent {

    constructor(private router: Router) {
    }

    toUserPage() {
        this.router.navigate(['/user']);
    }

    toHomePage() {
        this.router.navigate(['']);
    }

}
