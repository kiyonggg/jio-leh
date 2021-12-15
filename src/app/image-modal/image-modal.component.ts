import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.component.html',
  styleUrls: ['./image-modal.component.scss'],
})
export class ImageModalComponent implements OnInit {

  @Input() imgUrl: string;

  constructor(
    private modalController: ModalController,
  ) { }

  ngOnInit() {}

  closeImage() {
    this.modalController.dismiss();
  }

}
