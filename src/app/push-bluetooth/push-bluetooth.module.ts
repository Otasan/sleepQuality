import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PushBluetoothPage } from './push-bluetooth.page';

const routes: Routes = [
  {
    path: '',
    component: PushBluetoothPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PushBluetoothPage]
})
export class PushBluetoothPageModule {}
