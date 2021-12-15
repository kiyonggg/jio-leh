import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { resolve } from 'dns';
import { ItemRequest } from '../models/itemRequest';
import { RequestService } from '../services/request.service';
import { CreateRequestModalComponent } from '../my-requests/create-request-modal/create-request-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  segmentValue: string;
  requestsLoaded: Promise<boolean>;

  constructor(
    private requestService: RequestService,
  ) { }

  ngOnInit() {
    this.segmentValue = 'all';
    this.requestService.getAllRequests().then(requests => {
      // this.requests = <ItemRequest[]>requests;
      this.requestsLoaded = Promise.resolve(true);
    });
  }

}
