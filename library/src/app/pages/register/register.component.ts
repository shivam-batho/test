import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthenticationServiceService } from '../services/authentication.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  signupForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;


  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationServiceService,
    private toastr: ToastrService
  //   private alertService: AlertService
) { 
  if (this.authenticationService.currentUserValue) { 
    this.router.navigate(['/']);
}
}

ngOnInit() {
  this.signupForm = this.formBuilder.group({
    first_name: ['', Validators.required],
    last_name: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
    password2: ['', Validators.required]
  });

  // get return url from route parameters or default to '/'
  this.returnUrl = '/login';
}
get f() { return this.signupForm.controls; }

onSubmit() {
  this.submitted = true;
  console.log(this.f['email'].value);
  // stop here if form is invalid
  if (this.signupForm.invalid) {
      return;
  }

  this.loading = true;
  this.authenticationService.signUp(this.f['first_name'].value , this.f['last_name'].value , this.f['email'].value , this.f['password'].value , this.f['password2'].value
  
  )
      .pipe(first())
      .subscribe(
          data => {
            this.toastr.success('Register Successfully!');
              this.router.navigate([this.returnUrl]);
          },
          error => {
              // this.alertService.error(error);
              this.loading = false;
          });
}


}
