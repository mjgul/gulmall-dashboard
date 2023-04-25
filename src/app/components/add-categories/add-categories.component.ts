import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-add-categories',
  templateUrl: './add-categories.component.html',
  styleUrls: ['./add-categories.component.scss'],
  standalone:true,
  imports:[IonicModule,CommonModule]
})
export class AddCategoriesComponent implements OnInit {

  constructor() { }

  ngOnInit() {}

}
