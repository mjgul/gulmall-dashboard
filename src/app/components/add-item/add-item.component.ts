import { Component, OnInit } from '@angular/core';
import { CategoriesService, Icategory, IchildSubCat, IsubCategory,UtilService } from 'api-package';
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
  public itemAvailableSize:Observable<any>|undefined;
  public sizeType:Observable<IsizeType[]>|undefined;

  constructor(private category:CategoriesService, private typeSize:UtilService) { }

  ngOnInit() {
    this.getCategories();
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
    let id:string = event.detail.value.id;
    console.log("Event",event)
    // GETTING SUB CATEGORIES OF ITEM.
    this.isGenderBased = event.detail.value.genderBased;
    this.getSubCategory(id);
    this.getSizeType();
  }
  /**
   * ON SELECTING CATEGORY THIS FUNCTION GETS CALLED
   * USING ID- MONGODB ID AND SETTING IT FOR CALLING SUB-CATEGORY.
   */
  onSelectSubCat(event:any):void{
    let value:string = event.detail.value;
    this.getSubCatChild(value);
  }

  getSizeBasedOnType = async (child_cat_id:string,type:string) => {
    this.itemAvailableSize = (await this.typeSize.getAvailableSize(child_cat_id,type));
  }
  getSizeType = async () => {
    this.sizeType = (await this.typeSize.getTypes());
  }

  onSelectChildSubCat=(event:any)=>{
    this.childCategoryId = event.detail.value.id;
  }

  onSelectGenderType=(event:any)=>{
    this.typeId = event.detail.value.name.en;
    this.getSizeBasedOnType(this.childCategoryId,this.typeId);
  }

}
