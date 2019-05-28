import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PagePage } from "./page/page.page";


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
      ],
    declarations: [
        PagePage,
    ],
    providers: [
    ],
    exports: [
        PagePage,
    ]
})
export class SharedModule {}
