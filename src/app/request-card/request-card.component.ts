import { Component, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { ItemRequestStatusEnum } from 'src/app/models/enums/ItemRequestStatusEnum';
// import { IonAccordionGroup } from '@ionic/angular';
import { ItemRequest } from 'src/app/models/itemRequest';
import { User } from 'src/app/models/user';
import { RequestService } from 'src/app/services/request.service';
import { ImageModalComponent } from '../image-modal/image-modal.component';

@Component({
  selector: 'app-request-card',
  templateUrl: './request-card.component.html',
  styleUrls: ['./request-card.component.scss'],
})
export class RequestCardComponent implements OnInit {

  @Input() request: ItemRequest;
  @ViewChild('details') cardContent: any;
  expanded = false;

  userRequested: User;
  userAccepted: User;
  currentUser: User;
  detailsLoaded: Promise<boolean>;

  constructor(
    private requestService: RequestService,
    private alertController: AlertController,
    private toastController: ToastController,
    private modalController: ModalController,
    public renderer: Renderer2,
  ) { }

  ngOnInit() {
    this.requestService.getUserByUserId(this.request.userRequested).then(user => {
      this.userRequested = <User>user;
      if (this.request.userAccepted) {
        this.requestService.getUserByUserId(this.request.userAccepted).then(user => {
          this.userAccepted = <User>user;
          this.detailsLoaded = Promise.resolve(true);
        })
      } else {
        this.detailsLoaded = Promise.resolve(true);
      }
    });
    this.currentUser = JSON.parse(sessionStorage.currentUser);
  }

  toggleAccordion() {
    this.expanded = !this.expanded;
    if (this.expanded) {
      this.renderer.setStyle(this.cardContent.el, 'max-height', '100px');
      this.renderer.setStyle(this.cardContent.el, 'padding', '5px 16px');
    } else {
      this.renderer.setStyle(this.cardContent.el, 'max-height', '0px');
      this.renderer.setStyle(this.cardContent.el, 'padding', '0px 16px');
    }
  }

  viewImage() {
    this.modalController.create({
      component: ImageModalComponent,
      componentProps: {
        imgUrl: this.request.image
      }
    }).then(x => x.present());
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
    this.requestService.acceptRequest(this.request.id).then(res => {
      this.presentToast('You have accepted the request');
    });
  }

  cancelConfirmation() {
    this.alertController.create({
      message: 'Do you want to cancel this request?',
      buttons: [
        {
          text: 'No',
          role: 'dismiss'
        },
        {
          text: 'Yes',
          handler: () => {
            this.cancelRequest();
          }
        }
      ]
    }).then(x => x.present());
  }

  cancelRequest() {
    this.requestService.cancelRequest(this.request.id).then(res => {
      this.presentToast('You have cancelled the request');
    })
  }

  deleteConfirmation() {
    this.alertController.create({
      message: 'Do you want to delete this request?',
      buttons: [
        {
          text: 'No',
          role: 'dismiss'
        },
        {
          text: 'Yes',
          handler: () => {
            this.deleteRequest();
          }
        }
      ]
    }).then(x => x.present());
  }

  deleteRequest() {
    this.requestService.deleteRequest(this.request.id).then(res => {
      this.presentToast('Your request has been deleted');
    })
  }

  deliveredConfirmation() {
    this.alertController.create({
      message: 'Do you want to mark as delivered?',
      buttons: [
        {
          text: 'No',
          role: 'dismiss'
        },
        {
          text: 'Yes',
          handler: () => {
            this.markRequestAsDelivered();
          }
        }
      ]
    }).then(x => x.present());
  }

  markRequestAsDelivered() {
    this.requestService.markRequestAsDelivered(this.request.id).then(res => {
      this.presentToast('Your have marked the request as delivered.');
    })
  }

  presentToast(msg: string) {
    this.toastController.create({
      message: msg,
      duration: 2000,
    }).then(x => x.present());
  }

  /**
   * BOOLEAN CONDITIONS
   */

  //can accept if
  //1. Status is still pending
  //2. User requested is not the current user
  canAccept() {
    return this.currentUser.uid !== this.userRequested.uid &&
      this.request.status === ItemRequestStatusEnum.PENDING
  }

  //can cancel if 
  //1. Status is accepted
  //2. User accepted is the current user
  canCancel() {
    return this.currentUser.uid === this.request.userAccepted &&
      this.request.status === ItemRequestStatusEnum.ACCEPTED
  }

  //can modify (edit/delete) if
  //1. User requested is current user
  //2. Status is still pending
  canModify() {
    return this.currentUser.uid === this.userRequested.uid &&
      this.request.status === ItemRequestStatusEnum.PENDING
  }

  //can mark as delivered if 
  //1. status is accepted
  //2. user accepted is current user
  canMarkAsDelivered() {
    return this.currentUser.uid === this.request.userAccepted &&
      this.request.status === ItemRequestStatusEnum.ACCEPTED
  }

  isCurrentUserPending() {
    return this.currentUser.uid === this.request.userRequested &&
      this.request.status !== ItemRequestStatusEnum.DELIVERED
  }

}
