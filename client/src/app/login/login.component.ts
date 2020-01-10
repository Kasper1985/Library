import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService, EventService } from '../services';

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

  constructor(private route: ActivatedRoute,
              private router: Router,
              private authService: AuthService,
              private eventService: EventService) {
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
      return;
    }

    this.loading = true;
    this.authService.login(this.loginForm.controls.email.value, this.loginForm.controls.password.value).subscribe(user => {
      this.router.navigate([this.returnUrl]);
    }, error => {
      this.loading = false;
    });
  }

  register() { }
}
