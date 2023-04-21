import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FolderPage } from './folder.page';
import { AddItemComponent } from '../components/add-item/add-item.component';
import { ItemListComponent } from '../components/item-list/item-list.component';

const routes: Routes = [
  {
    path: '',
    component: FolderPage,
    children:[
      {
        path:'add-item',
        component:AddItemComponent
       },
       {
        path:'items-list',
        component:ItemListComponent
       }
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FolderPageRoutingModule {}
