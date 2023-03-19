export class AddItem {

    private item_id?:string;
    private price?:number;
    private quantity?:number;
    private available_color?:string[] = [];
    private available_size?:string[] = [];
    private size_chart?:string;
    private gender?:string;
    private category?:string;
    private sub_category?:string;
    private currency?:string;
    private name?:string;
    private status:string = "pending";

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
    }

    public setSubCategory(subCatId:string){
        this.sub_category = subCatId;
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


}