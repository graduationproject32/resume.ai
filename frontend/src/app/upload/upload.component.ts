import { HttpClient, HttpHeaders, HttpEventType } from '@angular/common/http';
import { Component } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import {
  NgxFileDropEntry,
  FileSystemFileEntry,
  FileSystemDirectoryEntry,
} from 'ngx-file-drop';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class UploadComponent {
  constructor(private http: HttpClient) {}
  public navType = 'darkNav';
  public files: NgxFileDropEntry[] = [];

  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    for (const droppedFile of files) {
      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          // Here you can access the real file
          console.log(droppedFile.relativePath, file);

          // You could upload it like this:
          const formData = new FormData();
          formData.append('file', file, droppedFile.relativePath);

          // Headers
          const headers = new HttpHeaders({});

          this.http
            .post(
              'http://127.0.0.1:5000/resumeanalysis/UploadResume',
              formData,
              {
                headers: headers,
                responseType: 'blob',
                reportProgress: true,
                observe: 'events',
              }
            )
            .subscribe((data) => {
              console.log(data);
            });
        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }

  public fileOver(event: any) {
    console.log(event);
  }

  public fileLeave(event: any) {
    console.log(event);
  }
  public upload() {
    const files = this.files;
    console.log('test');
  }
}
