import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ItemRequest } from '../models/itemRequest';
import { RequestService } from '../services/request.service';
import { CreateRequestModalComponent } from './create-request-modal/create-request-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  requests: ItemRequest[];

  constructor(
    private modalController: ModalController,
    private requestService: RequestService,
  ) { }

  ngOnInit() {
    this.requestService.getAllPendingRequests().then(requests => {
      console.log(requests)
      this.requests = <ItemRequest[]>requests;
    });
  }

  addRequest() {
    this.modalController.create({
      component: CreateRequestModalComponent,
    }).then(x => x.present());
  }

}
