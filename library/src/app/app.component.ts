import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../app/pages/models'
import { AuthenticationServiceService } from '../app/pages/services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  currentUser!: User;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationServiceService
) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
}

logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
}

}
