import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
// import {MultiPickerModule} from 'ion-multi-picker';
import { IndexPage } from './index.page';

const routes: Routes = [
  {
    path: '',
    component: IndexPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    // MultiPickerModule,
    RouterModule.forChild(routes)
  ],
  declarations: [IndexPage]
})
export class IndexPageModule {}
