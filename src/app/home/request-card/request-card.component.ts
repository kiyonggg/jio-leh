import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ItemRequestStatusEnum } from 'src/app/models/enums/ItemRequestStatusEnum';
// import { IonAccordionGroup } from '@ionic/angular';
import { ItemRequest } from 'src/app/models/itemRequest';
import { User } from 'src/app/models/user';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-request-card',
  templateUrl: './request-card.component.html',
  styleUrls: ['./request-card.component.scss'],
})
export class RequestCardComponent implements OnInit {

  @Input() request: ItemRequest;
  // @ViewChild(IonAccordionGroup, { static: true }) accordionGroup: IonAccordionGroup;
  userRequested: User;
  detailsLoaded: Promise<boolean>;

  constructor(
    private requestService: RequestService,
    private alertController: AlertController,
  ) { }

  ngOnInit() {
    this.requestService.getUserByUserId(this.request.userRequested).then(user => {
      this.userRequested = <User>user;
      this.detailsLoaded = Promise.resolve(true);
    });
  }

  acceptConfirmation() {
    this.alertController.create({
      message: 'Do you want to accept this request?',
      buttons: [
        {
          text: 'No',
          role: 'dismiss'
        },
        {
          text: 'Yes',
          handler: () => {
            this.acceptRequest();
          }
        }
      ]
    }).then(x => x.present());
  }

  acceptRequest() {
    this.requestService.acceptRequest(this.request.id)
  }

}
