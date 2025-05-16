import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FolderPage } from './folder.page';
import { AddItemComponent } from '../components/add-item/add-item.component';
import { ItemListComponent } from '../components/item-list/item-list.component';
import { AddCategoriesComponent } from '../components/add-categories/add-categories.component';
import { OrdersComponent } from '../components/orders/orders.component';
import { UsersComponent } from '../components/users/users.component';
import { EmployeeComponent } from '../components/employee/employee.component';

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
       },
       {
        path:'add-categories',
        component:AddCategoriesComponent
       },
       {
        path:'orders',
        component:OrdersComponent
       },
       {
        path:'users',
        component:UsersComponent
       },
       {
        path:'employee',
        component:EmployeeComponent
       }
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FolderPageRoutingModule {}
