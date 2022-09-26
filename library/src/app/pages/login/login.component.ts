import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationServiceService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
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
    this.router = router;
    //   // redirect to home if already logged in
      if (this.authenticationService.currentUserValue) { 
          this.router.navigate(['/dashboard']);
      }
  }

  ngOnInit() {
      this.loginForm = this.formBuilder.group({
          email: ['', Validators.required],
          password: ['', Validators.required]
      });

      // get return url from route parameters or default to '/'
      this.returnUrl =  '/dashboard';
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
      this.submitted = true;
      if (this.loginForm.invalid) {
          return;
      }

      this.loading = true;
      this.authenticationService.login(this.f['email'].value , this.f['password'].value)
          .pipe(first())
          .subscribe(
              data => {
                if(data['access']){
                   
                    this.toastr.success('Login Successfully!');
     
                        this.router.navigate(['/dashboard']);
    
                }
                
                
              },
              error => {
                  // this.alertService.error(error);
                  this.loading = false;
              });
  }

}
