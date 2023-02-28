export class AddItem {
    private item_id!:string;
    private price!:number;
    private available_color!:string[];
    private gender!:string;
    private category!:string;
    private sub_category!:string;
    private size!: {
        available_size:string[],
        size_chart:string;
    };
    private name!:{
        en:"",
        ar:""
    }
    private status:string = "pending";
}