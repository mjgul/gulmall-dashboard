import { Injectable } from '@angular/core';
import { CategoriesService, Icategory, IchildSubCat, IsubCategory,TypeSizeService } from 'api-package';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddItemService {
  private allCategories: Observable<Icategory[]> | undefined;
  private allSubCategories: Observable<IsubCategory[]> | undefined;
  private childSubCategories:Observable<IchildSubCat[]> | undefined;
  private itemAvailableSize:Observable<any>|undefined;
  
  constructor(private category:CategoriesService, private typeSize:TypeSizeService) { }

  // RETURNS THE LIST OF CATEGORY
  getAllCategories = async():Promise<Observable<Icategory[]>> => {
    this.allCategories =  (await this.category.getAllCategories());
    return this.allCategories;
    }

    // RETURNS THE LIST OF SUB-CATEGORY.
  getSubCategoryByCategoryId = async (categoryId:string):Promise<Observable<IsubCategory[]>> => {
    this.allSubCategories = (await this.category.getSubCategoryByCategoryId(categoryId));
    return this.allSubCategories;
  }

  // RETURN LIST OF CHILDREN.
  getChildOfSubCat = async (subCategoryId:string):Promise<Observable<IchildSubCat[]>> => {
    this.childSubCategories = (await this.category.getChildBySubCategoryId(subCategoryId));
    return this.childSubCategories;
  }

  getAvailableSize = async(child_cat_id:string,type:string) => {
    this.itemAvailableSize = (await this.typeSize.getAvailableSize(child_cat_id,type));
  }

}
