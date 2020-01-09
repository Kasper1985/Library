import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, AbstractControl, ValidatorFn } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService, EventService } from '../services';

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

  constructor(private route: ActivatedRoute,
              private router: Router,
              private authService: AuthService,
              private eventService: EventService) {
    // redirect to home if already logged in
    if (this.authService.loggedInUser) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.eventService.pageOpen.emit('');
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });

    this.registerForm = new FormGroup({
      nameFirst: new FormControl('', [Validators.required]),
      nameLast: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [ Validators.required,
        Validators.minLength(8),
        Validators.pattern(/[a-z]/g),
        Validators.pattern(/[A-Z]/g),
        Validators.pattern(/[ [!@#$%^&*()_+-=[]{};':"|,.<>\/?]/g)
      ]),
      passwordConfirm: new FormControl('', [Validators.required, this.equalsToValidator('password')])
    });

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

  private equalsToValidator(controlName: string): ValidatorFn {
    return (control: AbstractControl): {[ key: string ]: any } | null => {
      const value = control.parent.get(controlName).value;
      return value !== control.value ? { 'notEqual': { value: control.value, target: value }} : null;
    };
  }
}
