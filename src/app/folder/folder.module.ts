import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FolderPageRoutingModule } from './folder-routing.module';

import { FolderPage } from './folder.page';
import { AddItemComponent } from '../components/add-item/add-item.component';
import { AddImagesComponent } from '../components/add-images/add-images.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FolderPageRoutingModule,
  ],
  declarations: [FolderPage,AddItemComponent,AddImagesComponent]
})
export class FolderPageModule {}
