import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CreateRequestModalComponent } from './create-request-modal/create-request-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(
    private modalController: ModalController,
  ) { }

  ngOnInit() {
  }

  addRequest() {
    this.modalController.create({
      component: CreateRequestModalComponent,
    }).then(x => x.present());
  }

}
