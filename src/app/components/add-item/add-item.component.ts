import { Component, OnInit } from '@angular/core';
import { CategoriesService, Cloth, Icategory, IchildSubCat, IsubCategory,Item,TypeSizeService } from 'api-package';
import { IsizeType } from 'api-package/lib/interfaces/sizeType';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss'],
})
export class AddItemComponent implements OnInit {
  public isGenderBased:boolean = false;
  public childCategoryId:string = "";
  public typeId:string = "";
  public allCategories: Observable<Icategory[]> | undefined;
  public allSubCategories: Observable<IsubCategory[]> | undefined;
  public childSubCategories:Observable<IchildSubCat[]> | undefined;
  public itemAvailableSize:any|undefined;
  public itemAvailableColor:any|undefined;
  public sizeType:Observable<IsizeType[]>|undefined;
  private myFashion:Cloth = new Cloth();

  constructor(private category:CategoriesService, private typeSize:TypeSizeService) { }

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
    let catId:string = event.detail.value.id;
    let name = event.detail.value.name;
    this.isGenderBased = event.detail.value.genderBased;
    this.getSubCategory(catId);
    this.getSizeType();
    let category:Icategory = {id:catId,name:name.en,icon:event.detail.value.icon};
    this.myFashion.setCategory(category);
    console.log("ITEM ", this.myFashion)
  }
  /**
   * ON SELECTING CATEGORY THIS FUNCTION GETS CALLED
   * USING ID- MONGODB ID AND SETTING IT FOR CALLING SUB-CATEGORY.
   */
  onSelectSubCat(event:any):void{
    let subCategory = event.detail.value;
    let subCatId:string = event.detail.value.id;
    let subCat:IsubCategory = { id:subCatId,catId:this.myFashion.getCategory().getId(),name:subCategory.name.en,icon:event.detail.value.icon};
    this.myFashion.setSubCategory(subCat);
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
    let item:IchildSubCat = { id:this.childCategoryId,subCatId:this.myFashion.getSubCategory().getId(),name:itemName.en,isGenderBased: false,icon:event.detail.value.icon}
    this.myFashion.setSubCatChild(item);
    console.log("**ITEM ", this.myFashion)
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
