import { Component, OnInit } from '@angular/core';
import { CategoriesService, Cloth, Color, Icategory, IchildSubCat, IsubCategory,Item,Size,TypeSizeService } from 'api-package';
import { IsizeType } from 'api-package/lib/interfaces/sizeType';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ItemComponent } from '../item/item.component';
import { AddImagesComponent } from '../add-images/add-images.component';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss'],
  standalone:true,
  imports:[CommonModule,IonicModule,ItemComponent,AddImagesComponent]
})
export class AddItemComponent implements OnInit {
  public isGenderBased:boolean = false;
  public childCategoryId:string = "";
  public typeId:string = "";
  public allCategories: Observable<Icategory[]>;
  public allSubCategories: Observable<IsubCategory[]>;
  public childSubCategories:Observable<IchildSubCat[]>;
  public itemAvailableSize:Observable<any>;
  public itemAvailableColor:Observable<any>;
  public sizeType:Observable<IsizeType[]>|undefined;

  constructor(private category:CategoriesService, private typeSize:TypeSizeService) { }

  ngOnInit() {
    this.getCategories();
    this.getColorsList();
  }

  getCategories = async()=>  {
    this.allCategories = (await this.category.getAllCategories());
    this.allCategories.subscribe((res:Icategory[])=>{
      console.log("NAME",res[0].name)  
    })
  }

  getSubCategory = async (categoryId:string)=> {
    this.allSubCategories = (await this.category.getSubCategoryByCategoryId(categoryId));
  }

  getSubCatChild = async (subCatId:string) => {
    this.childSubCategories = (await this.category.getChildBySubCategoryId(subCatId));
  }

  /**
   * ON SELECTING CATEGORY THIS FUNCTION GETS CALLED
   * USING ID- MONGODB ID AND SETTING IT FOR CALLING SUB-CATEGORY.
   */
  onSelectCategory = (event:any):void => {
    let catId:string = event.detail.value.id;
    let name = event.detail.value.name;
    this.isGenderBased = event.detail.value.genderBased;
    this.getSubCategory(catId);
    this.getSizeType();
    
  }
  /**
   * ON SELECTING CATEGORY THIS FUNCTION GETS CALLED
   * USING ID- MONGODB ID AND SETTING IT FOR CALLING SUB-CATEGORY.
   */
  onSelectSubCat(event:any):void{
    let subCategory = event.detail.value;
    let subCatId:string = event.detail.value.id;
    
    
    this.getSubCatChild(subCatId);
  }

  getSizeBasedOnType = async (child_cat_id:string,type:string) => {
    this.itemAvailableSize =  (await this.typeSize.getAvailableSize(child_cat_id,type));
    this.itemAvailableSize.subscribe((res:any)=>{
      console.log("Available Size: ", res.data[0].size)
      this.itemAvailableSize = res.data[0].size;
    })
  }

  getSizeType = async () => {
    this.sizeType = (await this.typeSize.getTypes());
    this.sizeType.subscribe((res:any)=>{
      console.log("Size: ", res)
    })
  }

  onSelectChildSubCat=(event:any)=>{
    this.childCategoryId = event.detail.value.id;
    let itemName = event.detail.value.name;
    console.log("ITEM NAME: ", itemName)
   
    
    
  }

  onSelectGenderType=(event:any)=>{
    this.typeId = event.detail.value.name.en;
    this.getSizeBasedOnType(this.childCategoryId,this.typeId);
  }

  getColorsList = async () => {
    this.itemAvailableColor = (await this.typeSize.getAllColors());
    this.itemAvailableColor.subscribe((res:any)=>{
      this.itemAvailableColor = res.data;
      console.log("Item Available Color List: ", this.itemAvailableColor)
    })
   
  }

}
