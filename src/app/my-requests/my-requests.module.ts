import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyRequestsPageRoutingModule } from './my-requests-routing.module';

import { MyRequestsPage } from './my-requests.page';
import { CreateRequestModalComponent } from './create-request-modal/create-request-modal.component';
import { RequestCardComponent } from '../request-card/request-card.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyRequestsPageRoutingModule
  ],
  declarations: [MyRequestsPage, CreateRequestModalComponent, RequestCardComponent]
})
export class MyRequestsPageModule {}
