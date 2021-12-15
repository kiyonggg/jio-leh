import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string;
  password: string;
  loading: boolean;
  formSubmitted: boolean;
  loginError: boolean;

  constructor(
    private router: Router,
    private authService: AuthService,
  ) { }

  ngOnInit() {
  }

  login() {
    this.loading = true;
    if (this.validateCredentials()) {
      this.authService.signIn(this.email, this.password).then(user => {
        this.loading = false;
        this.clearForm();
        this.router.navigate(['/home']);
      }, error => {
        this.loading = false;
        this.loginError = true;
      })
    } else {
      this.loading = false;
    }
  }

  validateCredentials() {
    this.formSubmitted = true;
    if (!this.email ||
      !this.password ||
      this.email.length === 0 ||
      this.password.length === 0) {
      return false;
    } else {
      return true;
    }
  }

  clearForm() {
    this.email = undefined;
    this.password = undefined;
    this.formSubmitted = false;
    this.loginError = false;
  }

  registerAccount() {
    this.router.navigate(['/register']);
  }

}
