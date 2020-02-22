import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService, EventService, UserService } from '../services';

import { IUser } from '../models';

import { emailValidator, pwdMinSmallLettersValidator, pwdMinCapLettersValidator, pwdMinSymbolsValidator, pwdMinNumbersValidator,
  fieldMatchValidator } from './../validators';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  returnUrl: string;

  public loginForm: FormGroup;
  public registerForm: FormGroup;
  public loading = false;
  public submitted = false;
  public isLogin = true;
  public showValidationErrors = false;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private authService: AuthService,
              private eventService: EventService,
              private userService: UserService) {
    if (this.authService.loggedInUser) { // redirect to home if already logged in
      this.router.navigate(['/']);
    }

    // define forms
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, emailValidator]),
      password: new FormControl('', [Validators.required])
    });
    this.registerForm = new FormGroup({
      nameFirst: new FormControl('', [Validators.required]),
      nameLast: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, emailValidator]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        pwdMinSmallLettersValidator(1),
        pwdMinCapLettersValidator(1),
        pwdMinSymbolsValidator(1),
        pwdMinNumbersValidator(1)
      ]),
      passwordConfirm: new FormControl('', [Validators.required, fieldMatchValidator('password')])
    });
  }

  ngOnInit() {
    this.eventService.pageOpen.emit('');

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
  }

  logIn() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      this.showValidationErrors = true;
      this.eventService.alert.emit({type: 'error', message: 'Invalid input'});
      return;
    }

    this.loading = true;
    this.authService.login(this.loginForm.controls.email.value, this.loginForm.controls.password.value)
                    .subscribe(
                      () => { this.router.navigate([this.returnUrl]); },
                      error => { this.loading = false; this.eventService.alert.emit({ type: 'error', message: 'Login failed' }); });
  }

  register() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      this.showValidationErrors = true;
      this.eventService.alert.emit({type: 'error', message: 'Invalid input'});
      return;
    }

    const user: IUser = {
      nameFirst: this.registerForm.controls.nameFirst.value,
      nameLast: this.registerForm.controls.nameLast.value,
      email: this.registerForm.controls.email.value,
      password: this.registerForm.controls.password.value
    };

    this.loading = true;
    this.userService.registerUser(user)
                    .subscribe(
                      () => { this.loading = false; this.isLogin = true; },
                      error => { this.loading = false; this.eventService.alert.emit({ type: 'error', message: 'Registration failed' }); });
  }
}
