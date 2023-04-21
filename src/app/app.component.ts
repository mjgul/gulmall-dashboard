import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Items', url: 'items-list', icon: 'mail' },
    { title: 'Add Item', url: 'add-item', icon: 'mail' },
    { title: 'Outbox', url: 'Outbox', icon: 'paper-plane' },
    { title: 'Favorites', url: 'Favorites', icon: 'heart' },
    { title: 'Archived', url: 'Archived', icon: 'archive' },
    { title: 'Trash', url: 'Trash', icon: 'trash' },
    { title: 'Spam', url: 'Spam', icon: 'warning' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor() {}
}
