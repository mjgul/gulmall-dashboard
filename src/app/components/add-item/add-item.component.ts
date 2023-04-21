import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CategoriesService, ChildSubCategory, Color, Icategory, IchildSubCat, IsubCategory,Size,SubCategory,TypeSizeService } from 'api-package';
import { IsizeType } from 'api-package/lib/interfaces/sizeType';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ItemComponent } from '../item/item.component';
import { AddImagesComponent } from '../add-images/add-images.component';
import { AddItemService } from 'src/app/services/add-item.service';
import { Category } from 'api-package';
@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss'],
  standalone:true,
  changeDetection:ChangeDetectionStrategy.OnPush,
  imports:[CommonModule,IonicModule,ItemComponent,AddImagesComponent]
})
export class AddItemComponent implements OnInit {
  public isGenderBased:boolean = false;
  public childCategoryId:string = "";
  public typeId:string = "";
  public allCategories: Observable<Icategory[]>;
  public allSubCategories: Observable<IsubCategory[]>;
  public childSubCategories:Observable<IchildSubCat[]>;
  public itemAvailableSize:Observable<Size[]>;
  public itemAvailableColor:Observable<Color[]>;
  public gender:Observable<IsizeType[]>|undefined;

  constructor(private category:CategoriesService, private typeSize:TypeSizeService, public addItemService:AddItemService) { }

  ngOnInit() {
    this.getCategories();
    this.getColorsList();
  }

  getCategories = async()=>  {
    this.allCategories = (await this.category.getAllCategories());
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
    let _category = event.detail.value;
    let cat:Icategory={id:_category.id,name:_category.name,icon:_category.icon};
    let category:Category = new Category(cat);
    this.isGenderBased = event.detail.value.genderBased;
    console.log("Category:", event.detail)
    this.getSubCategory(category.getId());
    this.getSizeType();
    this.addItemService.setItemCategory(category);
  }
  /**
   * ON SELECTING CATEGORY THIS FUNCTION GETS CALLED
   * USING ID- MONGODB ID AND SETTING IT FOR CALLING SUB-CATEGORY.
   */
  onSelectSubCat(event:any):void{
    let _category = event.detail.value;
    let cat:IsubCategory={id:_category.id,name:_category.name,icon:_category.icon,catId:_category.cat_id};
    let category:SubCategory = new SubCategory(cat);
    let subCatId:string = event.detail.value.id;
    this.getSubCatChild(subCatId);
    this.addItemService.setItemSubCategoryId(category);
  }

  onSelectChildSubCat=(event)=>{
    let _category = event.detail.value;
    let cat:IchildSubCat={id:_category.id,name:_category.name,icon:_category.icon,subCatId:_category.sub_category_id,isGenderBased:_category.gneder_flag};
    let category:ChildSubCategory = new ChildSubCategory(cat);
    this.childCategoryId = event.detail.value.id;
    this.addItemService.setItemChild(category);
  }

  getSizeBasedOnType = async (child_cat_id:string,type:string) => {
    this.itemAvailableSize =  (await this.typeSize.getAvailableSize(child_cat_id,type));
    this.itemAvailableSize.subscribe((res:any)=>{
      console.log("Available Size: ", res.data[0].size)
      this.itemAvailableSize = res.data[0].size;
    })
  }

  getSizeType = async () => {
    this.gender = (await this.typeSize.getTypes());
  }

  

  onSelectGenderType=(event:any)=>{
    this.typeId = event.detail.value.name.en;
    this.getSizeBasedOnType(this.childCategoryId,this.typeId);
    this.addItemService.setItemGender(event.detail.value.id);
  }

  getColorsList = async () => {
    this.itemAvailableColor = (await this.typeSize.getAllColors());
  }

  onSelectSizeType=(event:any)=>{
    this.addItemService.setItemAvailableSize(event.detail.value.id);
  }

  onSelectColorType=(event:any)=>{
    console.log("COLOR: ", event.detail.value);
    this.addItemService.setItemAvailableColor(event.detail.value)
  }

  addTitle=(ev:any)=>{
    this.addItemService.setItemTitle(ev.detail.value);
  }

  addQuantity=(ev:any)=>{
    this.addItemService.setItemQuantity(ev.detail.value);
  }

  addPrice=(ev:any)=>{
    this.addItemService.setItemPrice(ev.detail.value);
  }

  onSelectCurrency=(ev:any)=>{
    console.log('currency',ev.detail.value)
    let currency = ev.detail.value
    this.addItemService.setItemCurrency(currency);
    this.addItemService.printItemObject()
    this.addItemService.setImagePath();
  }

  save(){
    this.addItemService.uploadImages();
  }
}
