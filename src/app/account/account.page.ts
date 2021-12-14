import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  constructor(
    private alertController: AlertController,
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  logout() {
    this.alertController.create({
      message: "Do you want to log out?",
      buttons: [
        {
          text: 'No',
          role: 'dismiss'
        },
        {
          text: 'Yes',
          handler: () => {
            this.authService.signOut();
            this.router.navigate(['/login']);
          }
        }
      ]
    }).then(x => x.present());
  }

}
