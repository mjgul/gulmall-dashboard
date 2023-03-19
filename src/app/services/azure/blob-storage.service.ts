import { Injectable } from '@angular/core';
import { BlobServiceClient,ContainerClient} from '@azure/storage-blob';
import { environment } from "src/environments/environment";
import { Snap } from 'src/app/classes/snap';
@Injectable({
  providedIn: 'root'
})
export class BlobStorageService {
  
  private accountName:string = environment.azureAccountName;
  private containerName:string="posts";
  constructor() { }

  public async listImages():Promise<string[]> {
    let result:string[]=[];
    let blobs = this.containerClient().listBlobsFlat();
    for await(const blob of blobs){
      result.push(blob.name);
    }
    return result;
  }

  public uploadImage = async(content:Snap[],postId:string)=>{
    
    let sas:string = environment.azureSasToken;
    
    for (let index = 0; index < content.length; index++) {
      const blockBlobClient = this.containerClient(sas).getBlockBlobClient(content[index].path);
      const blob = content[index];
      await blockBlobClient.uploadData(content[index].file,{blobHTTPHeaders:{blobContentType:blob.file.type}});
    }
   
    //console.log(`Upload block blob ${path} successfully ${uploadBlobResponse._response.status}`);
    //return uploadBlobResponse._response.status;
  }

  private containerClient=(sas?:string):ContainerClient=>{
    let token:string = "";
    if(sas){
      token = sas;
    }
  return new BlobServiceClient(`${this.accountName}/${token}`).getContainerClient(this.containerName);
  }
}
