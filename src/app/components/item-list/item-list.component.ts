import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { MatInputModule } from '@angular/material/input';
import { AddItemService } from 'src/app/services/add-item-service/add-item.service';
import { Color, Icategory, IchildSubCat, IsubCategory, Size } from 'api-package';
import { IsizeType } from 'api-package/lib/interfaces/sizeType';
import { ItemComponent } from '../item/item.component';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss'],
  standalone:true,
  imports:[IonicModule,
    CommonModule,
    MatAutocompleteModule,
    MatSlideToggleModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    ItemComponent,
    MatFormFieldModule]
})
export class ItemListComponent implements OnInit {
  categoryControl = new FormControl('');
  subCategoryControl = new FormControl('');
  subCategoryChildControl = new FormControl('');
  categoryOptions: Icategory[] = [];
  subCategoryOptions: IsubCategory[] = [];
  subCategoryChildOptions: IchildSubCat[] = [];
  categories: Observable<Icategory[]>;
  subCategories: Observable<IsubCategory[]>;
  subCategoyChild: Observable<IchildSubCat[]>;
  public isGenderBased:boolean = false;
  public childCategoryId:string = "";
  public typeId:string = "";
  public allCategories: Observable<Icategory[]>;
  public allSubCategories: Observable<IsubCategory[]>;
  public childSubCategories:Observable<IchildSubCat[]>;
  public itemAvailableSize:Observable<Size[]>;
  public itemAvailableColor:Observable<Color[]>;
  public gender:Observable<IsizeType[]>|undefined;

  constructor(public addItemService:AddItemService){
    this.categories = this.categoryControl.valueChanges.pipe(
      startWith(''),
      map(category => (category ? this._filterCategories(category) : this.categoryOptions.slice())),
    );

    this.subCategories = this.subCategoryControl.valueChanges.pipe(
      startWith(''),
      map(subCat => (subCat ? this._filterSubCategories(subCat) : this.subCategoryOptions.slice())),
    );

    this.subCategoyChild = this.subCategoryChildControl.valueChanges.pipe(
      startWith(''),
      map(subCat => (subCat ? this._filterSubCategoriesChild(subCat) : this.subCategoryChildOptions.slice())),
    );
  }

  

  ngOnInit() {
    this.getCategories();
    
  }


   getCategories = async()=>  {
    this.allCategories = await (await this.addItemService.getCategories());
    this.allCategories.subscribe((res:Icategory[])=> this.categoryOptions = res);
  }

  getSubCategory = async (categoryId:string)=> {
    this.allSubCategories = (await this.addItemService.getSubCategoryByCategoryId(categoryId));
    this.allSubCategories.subscribe((res:IsubCategory[])=> {this.subCategoryOptions = res
    console.log("SUB CATEGORIES: ", this.subCategoryOptions)
    });
    
  }

  getSubCatChild = async (subCatId:string) => {
    this.childSubCategories = (await this.addItemService.getChildOfSubCat(subCatId));
    this.childSubCategories.subscribe((res:IchildSubCat[])=> {this.subCategoryChildOptions = res
      console.log("SUB CATEGORIES: ", this.subCategoryOptions)
      });
  }

  private _filterCategories(value: string): Icategory[] {
    console.log("VALUE", value);
    const filterValue = value.toLowerCase();
    return this.categoryOptions.filter(state => state.name.toLowerCase().includes(filterValue));
  }

  private _filterSubCategories(value: string): IsubCategory[] {
    console.log("VALUE SUB CATEGORY", value);
    const filterValue = value.toLowerCase();
    return this.subCategoryOptions.filter(state => state.name.toLowerCase().includes(filterValue));
  }

  private _filterSubCategoriesChild(value: string): IchildSubCat[] {
    console.log("VALUE SUB CATEGORY CHILD", value);
    const filterValue = value.toLowerCase();
    return this.subCategoryChildOptions.filter(state => state.name.toLowerCase().includes(filterValue));
  }

  selectedCategory=(category:any)=>{
    this.getSubCategory(category.id);
    console.log("SELECTED CATEGORY: ", category)
  }

  selectedSubCategory=(subCategory:any)=>{
    this.getSubCatChild(subCategory.id);
    console.log("SELECTED CATEGORY: ", subCategory)
  }
  
}
