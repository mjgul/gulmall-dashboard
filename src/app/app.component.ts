import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Dashboard', url: 'items-list', icon: 'home' },
    { title: 'Add Item', url: 'add-item', icon: 'mail' },
    { title: 'Add Categories', url: 'add-categories', icon: 'mail' },
    { title: 'Orders', url: 'orders', icon: 'mail' },
    { title: 'Users', url: 'users', icon: 'person' },
    { title: 'Employee', url: 'employee', icon: 'person' }
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor() {}
}
