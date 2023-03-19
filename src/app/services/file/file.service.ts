// Copyright 2010 Google LLC
/**
 * (Type docs)
 *
 * @author Muhammad Junaid Gul <muhammad.gul.mi@outlook.com>
 */

import { Injectable } from '@angular/core';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { Platform } from '@ionic/angular';
@Injectable({
  providedIn: 'root',
})
export class FileService {
  constructor(private platform: Platform) {}

  /**
   * @param object
   * @param name
   */
  readFile = async (path: { path: string }, name: string) => {
    return new Promise((res, rej) => {
      Filesystem.requestPermissions()
        .then(async (permission) => {
          if (permission.publicStorage == 'granted') {
            const contents = await Filesystem.readFile(path);
            let data = `data:image/jpeg;base64,${contents.data}`;
            const resp = await fetch(data);
            const blob = await resp.blob();
            res(blob);
          }
        })
        .catch((err) => {
          return err;
        });
    });
  };

  async readAsFile(photo: any) {
    let files: File[] = [];
    // Fetch the photo, read as a blob, then convert to base64 format
    for (let index = 0; index < photo.length; index++) {
      const response = await fetch(photo[index].webPath);
      const blob = await response.blob();
      let file_Name =photo[index].webPath.substring(photo[index].webPath.lastIndexOf('/') + 1) +
        '.' +
        photo[index].format;
      const file = new File([blob], file_Name, { type: 'image/jpeg' });
      files.push(file);
    }

    return files;
  }

 
  // DELETE ALL IMAGE FROM CACHE.
  async clearCache() {
    const fileEntries = await Filesystem.readdir({
      directory: Directory.Cache,
      path: 'CACHED-IMG',
    });
    fileEntries.files.map(async (f) => {
      await Filesystem.deleteFile({
        directory: Directory.Cache,
        path: `CACHED-IMG/${f}`,
      });
    });
  }

  // CREATES A CACHE FOLDER.
  async createCacheFolder(folderName: string) {
    await Filesystem.mkdir({
      directory: Directory.Cache,
      path: folderName,
    });
  }
}
