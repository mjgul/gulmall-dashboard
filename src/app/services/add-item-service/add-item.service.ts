import { Injectable } from '@angular/core';
import { CategoriesService, Color, Icategory, IchildSubCat, IsubCategory,Size,TypeSizeService } from 'api-package';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddItemService {
  public allCategories: Observable<Icategory[]>;
  public allSubCategories: Observable<IsubCategory[]>;
  public childSubCategories:Observable<IchildSubCat[]>;
  public itemAvailableSize:Observable<Size[]>;
  public itemAvailableColor:Observable<Color[]>;
  
  constructor(private category:CategoriesService, private typeSize:TypeSizeService) { 
    this.getAllCategories();
  }

  // RETURNS THE LIST OF CATEGORY
  private getAllCategories = async():Promise<Observable<Icategory[]>> => {
     this.allCategories = (await this.category.getAllCategories());
     return this.allCategories;
    }

    public getCategories = ():Observable<Icategory[]> => {
      return this.allCategories;
    }
    // RETURNS THE LIST OF SUB-CATEGORY.
  getSubCategoryByCategoryId = async (categoryId:string):Promise<Observable<IsubCategory[]>> => {
    return  (await this.category.getSubCategoryByCategoryId(categoryId));
  }

  // RETURN LIST OF CHILDREN.
  getChildOfSubCat = async (subCategoryId:string):Promise<Observable<IchildSubCat[]>> => {
    return  (await this.category.getChildBySubCategoryId(subCategoryId));
    
  }

  getAvailableSize = async(child_cat_id:string,type:string) => {
    return (await this.typeSize.getAvailableSize(child_cat_id,type));
  }

}
