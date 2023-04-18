import { Icategory, Image } from "api-package";

export class AddItem {

    private item_id?:string = null;
    private price?:number = null;
    private quantity?:number = null;
    private available_color?:string[] = [];
    private available_size?:string[] = [];
    private size_chart?:string = null;
    private gender?:string = null;
    private category?:string=null;
    private sub_category?:string=null;
    private currency?:string=null;
    private name?:string=null;
    //private status:string = "pending";
    private images:Image[] = [];

    public constructor(){
        
        console.log("ADDING ITEM")
    }

/**
 * GET SUB CAT CHILD ID AND SET IT.
 * @param sub_cat_child_id 
 */
    public setItemId(sub_cat_child_id:string){
        this.item_id = sub_cat_child_id;
    }

    /**
     * SET THE PRICE.
     * @param price 
     */
    public setPrice(price:number){
        this.price = price;
    }
/**
 * PUSH THE SELECTED COLOR TO ARRAY.
 * @param colorId 
 */
    public setAvailableColor(colorId:string){
        this.available_color?.push(colorId);
    }

    /**
     * SET THE GENDER
     * @param gender 
     */
    public setGender(gender:string){
        this.gender = gender;
    }

    public setCategory(categoryId:string){
        this.category = categoryId;
        this.setSubCategory(null);
    }

    public setSubCategory(subCatId:string){
        this.sub_category = subCatId;
        this.setItemId(null);
    }

    public setAvailableSize(sizeId:string){
        this.available_size?.push(sizeId);
    }

    public setSizeChartId(chartId:string){
        this.size_chart = chartId;
    }

    public setCurrency(currency:string){
        this.currency=currency;
    }

    public setQuantity(quantity:number) {
        this.quantity = quantity;
    }

    public setName(name:string){
       this.name = name
    }

    public setImages(images:Image[]){
        this.images = images;
    }


}