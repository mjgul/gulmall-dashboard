import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss'],
})
export class AddItemComponent implements OnInit {
  
  constructor() { }

  ngOnInit() {}

  getSubCategory =()=> {}
  getCategories =()=>  {}
  getSubCatChild =()=> {}

}
