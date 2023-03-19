export class Snap  {
    name:string;
    file:Blob;
    url:string;
    path:string;
    webPath:string;

    constructor(name:string,file:Blob,url:string,path:string,webPath:string){
        this.name = name;
        this.file = file;
        this.url = url;
        this.path = path;
        this.webPath = webPath;
    }
}