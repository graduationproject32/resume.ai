import { HttpClient, HttpHeaders, HttpEventType } from '@angular/common/http';
import { Component } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import {
  NgxFileDropEntry,
  FileSystemFileEntry,
  FileSystemDirectoryEntry,
} from 'ngx-file-drop';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

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
  faSpinner = faSpinner;

  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    const dropZone = <HTMLElement>document.querySelector('.dropzone');
    dropZone.classList.remove('dropzone-hover');
  }

  public fileOver(event: any) {
    const dropZone = <HTMLElement>document.querySelector('.dropzone');
    dropZone.classList.add('dropzone-hover');
  }

  public fileLeave(event: any) {
    const dropZone = <HTMLElement>document.querySelector('.dropzone');
    dropZone.classList.remove('dropzone-hover');
  }
  public upload() {
    const files = this.files;
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
          headers.append('Access-Control-Allow-Origin', '*');
          headers.append('Access-Control-Allow-Credentials', 'true');
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
            .subscribe((event) => {
              console.log(event);
            });
        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
    console.log('test');
  }
}
