

// Copyright 2010 Google LLC
/**
 * (Type docs)
 *
 * @author Muhammad Junaid Gul <muhammad.gul.mi@outlook.com>
 */

 import { Injectable } from '@angular/core';
 import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
 @Injectable({
   providedIn: 'root'
 })
 export class FileSystemService {
  
   constructor() { }
 
 
 /**
  * @param object
  * @param name
  */
    readFile = async (path:{path:string}, name:string) => {
      return new Promise((res,rej)=>{
       Filesystem.requestPermissions().then( async (permission)=>{
         console.log("Permission: ", permission);
         if(permission.publicStorage == 'granted') {
          const contents = await Filesystem.readFile(path);
         
          let data = `data:image/jpeg;base64,${contents.data}`;
          const resp = await fetch(data);
          const blob = await resp.blob();
        
       const file = new File([blob], name,{ type: "image/png" })
       res(file);
 
         } else {
           //rej (false);
         }
       })
       
       .catch(err=>{
         return(err);
       })
 
      });
   };
 
   /**
  * Take base64 and convert it into file.
  * @param dataurl base64 
  * @param filename string
  * @returns File
  */
    base64toFile(dataurl:any, filename:string) {
     console.log('url:', dataurl.dataUrl);
     var arr = dataurl.dataUrl.split(','),
         mime = arr[0].match(/:(.*?);/)[1],
         bstr = atob(arr[1]), 
         n = bstr.length, 
         u8arr = new Uint8Array(n);
         
     while(n--){
         u8arr[n] = bstr.charCodeAt(n);
     }
 
     let image =  new File([u8arr], filename, {type:mime});
     return image;
 }
  
 }