import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CreateRequestModalComponent } from './create-request-modal/create-request-modal.component';
import { RequestService } from '../services/request.service';

@Component({
  selector: 'app-my-requests',
  templateUrl: './my-requests.page.html',
  styleUrls: ['./my-requests.page.scss'],
})
export class MyRequestsPage implements OnInit {

  segmentValue: string;
  requestsLoaded: Promise<boolean>;

  constructor(
    private modalController: ModalController,
    private requestService: RequestService,
  ) { }

  ngOnInit() {
    this.segmentValue = 'ongoing';
    this.requestService.getAllRequests().then(requests => {
      this.requestsLoaded = Promise.resolve(true);
    });
  }

  addRequest() {
    this.modalController.create({
      component: CreateRequestModalComponent,
    }).then(x => x.present());
  }

}
