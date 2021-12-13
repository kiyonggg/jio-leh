import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  userForm: FormGroup;
  formValid: boolean;
  loading: boolean;
  formSubmitted: boolean;

  constructor(
    private alertController: AlertController,
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.userForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(128)]),
      cfmPassword: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(128)]),
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      // profileImgSrc: new FormControl(''),
    });
    this.formValid = false;
  }

  checkFormValid() {
    if (this.userForm.value.password !== this.userForm.value.cfmPassword) {
      this.formValid = false;
      return;
    }
    this.formValid = true;
    const controls = this.userForm.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        this.formValid = false;
        return;
      }
    }
  }

  get errorControl() {
    return this.userForm.controls;
  }

  cfmPasswordOnChange() {
    return this.userForm.value.password === this.userForm.value.cfmPassword ? false : true;
  }

  async presentAlert(isError, header, message) {
    const alert = await (!isError ? this.alertController.create({
      header,
      message,
      buttons: [
        {
          text: 'OK',
          role: 'OK',
          handler: () => {
            this.router.navigate(['/login']);
          }
        }
      ]
    }) : this.alertController.create({
      header,
      message,
      buttons: [{
        text: 'Dismiss',
        role: 'cancel'
      }]
    }));
    this.loading = false;
    await alert.present();
  }

  createUser() {
    this.loading = true;
    this.formSubmitted = true;
    this.authService.signUp(this.email.value, this.password.value, this.firstName.value, this.lastName.value).then(res => {
      this.presentAlert(false, 'Success', 'Account has been created successfully created! Please login');
    }, error => {
      this.presentAlert(true, 'Hmm..something went wrong', 'Unable to create account');
    })
  }

  get email() {
    return this.userForm.get('email');
  }

  get password() {
    return this.userForm.get('password');
  }

  get cfmPassword() {
    return this.userForm.get('cfmPassword');
  }

  get firstName() {
    return this.userForm.get('firstName');
  }

  get lastName() {
    return this.userForm.get('lastName');
  }

}
