import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from '../services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public registerForm: FormGroup;
  returnUrl: string;
  public loading = false;
  public submitted = false;
  public isLogin = true;

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private authService: AuthService) {
    // redirect to home if already logged in
    if (this.authService.loggedInUser) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required, Validators.email],
      password: ['', Validators.required]
    });
    this.registerForm = this.formBuilder.group({
      nameFirst: ['', Validators.required],
      nameLast: ['', Validators.required],
      email: ['', Validators.required, Validators.email],
      password: ['', Validators.required],
      passwordConfirm: ['', Validators.required]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
  }

  toggleRegister() {
    this.isLogin = !this.isLogin;
  }

  logIn() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authService.login(this.loginForm.controls.email.value, this.loginForm.controls.password.value).subscribe(user => {
      this.router.navigate([this.returnUrl]);
    }, error => {
      this.loading = false;
    });
  }

  register() {

  }
}
