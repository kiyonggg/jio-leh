import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-create-request-modal',
  templateUrl: './create-request-modal.component.html',
  styleUrls: ['./create-request-modal.component.scss'],
})
export class CreateRequestModalComponent implements OnInit {

  requestForm: FormGroup;
  formValid: boolean;
  formSubmitted: boolean;
  loading: boolean;

  imagePath: any;
  file: any;
  imgURL: any;
  previewPic: boolean;

  constructor(
    private modalController: ModalController,
    private alertController: AlertController,
    private toastController: ToastController,
    private requestService: RequestService,
  ) { }

  ngOnInit() {
    this.requestForm = new FormGroup({
      itemName: new FormControl('', [Validators.required]),
      quantity: new FormControl(1, [Validators.required, Validators.min(1)]),
      deliveryFee: new FormControl(0.2, [Validators.required, Validators.min(0.2)]),
      location: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
    });
  }

  checkFormValid() {
    this.formValid = true;
    const controls = this.requestForm.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        this.formValid = false;
        return;
      }
    }
  }

  preview(files) {
    if (files.length === 0) {
      return;
    }

    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      return this.alertController.create({
        cssClass: '',
        header: 'Only images are supported!',
        buttons: [
          {
            text: 'Dismiss',
            role: 'cancel',
          }
        ]
      }).then(x => x.present());
    }

    const reader = new FileReader();
    this.imagePath = files;
    this.file = files[0];
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    };
    this.previewPic = true;
  }

  removeImage() {
    this.imgURL = undefined;
    this.imagePath = undefined;
    this.file = undefined;
  }

  createRequest() {
    this.formSubmitted = true;
    this.loading = true;
    if (this.formValid && this.imgURL) {
      let newItemRequest = {
        itemName: this.itemName.value,
        quantity: this.quantity.value,
        deliveryFee: this.deliveryFee.value,
        location: this.location.value,
        description: this.description.value,
      }
      this.requestService.createRequest(newItemRequest, this.file).then(res => {
        this.loading = false;
        this.presentToast('Your request has been created!');
        this.closeModal();
      }, error => {
        this.loading = false;
        this.presentAlert('There is an error, try again later.' + error);
      })
    } else {
      this.loading = false;
    }
  }

  presentToast(msg: string) {
    this.toastController.create({
      message: msg,
      duration: 2000,
    }).then(x => x.present());
  }

  presentAlert(msg: string) {
    this.alertController.create({
      message: msg,
      buttons: [{
        text: 'Dismiss',
        role: 'Cancel'
      }]
    }).then(x => x.present());
  }

  clearForm() {
    this.requestForm.reset();
    this.loading = false;
    this.formSubmitted = false;
  }

  closeModal() {
    this.clearForm();
    this.modalController.dismiss();
  }

  get errorControl() {
    return this.requestForm.controls;
  }

  get itemName() {
    return this.requestForm.get('itemName');
  }

  get quantity() {
    return this.requestForm.get('quantity');
  }

  get deliveryFee() {
    return this.requestForm.get('deliveryFee');
  }

  get location() {
    return this.requestForm.get('location');
  }

  get description() {
    return this.requestForm.get('description');
  }
}
