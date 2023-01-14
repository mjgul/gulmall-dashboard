import { Injectable } from '@angular/core';
import { CategoriesService, Icategory, IchildSubCat, IsubCategory } from 'api-package';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddItemService {
  allCategories: Observable<Icategory[]> | undefined;
  allSubCategories: Observable<IsubCategory[]> | undefined;
  childSubCategories:Observable<IchildSubCat[]> | undefined;
  itemAvailableSize:Observable<any>|undefined;
  
  constructor(private category:CategoriesService) { }

  // RETURNS THE LIST OF CATEGORY
  getAllCategories = async() => {
    this.allCategories =  (await this.category.getAllCategories());
    }

    // RETURNS THE LIST OF SUB-CATEGORY.
  getSubCategoryByCategoryId = async (categoryId:string) => {
    this.allSubCategories = (await this.category.getSubCategoryByCategoryId(categoryId));
  }

  // RETURN LIST OF CHILDREN.
  getChildOfSubCat = async (subCategoryId:string) => {
    this.childSubCategories = (await this.category.getChildBySubCategoryId(subCategoryId));
    this.childSubCategories?.subscribe((res:any)=>{
      console.log("CHILD", res)
    })
  }

  getAvailableSize = async(child_cat_id:string,type:string) => {
    this.itemAvailableSize = (await this.category.getAvailableSize(child_cat_id,type));
    this.itemAvailableSize?.subscribe((res:any)=>{
      console.log("RES available size: ",res);;
    })
  }

}
