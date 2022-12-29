import {
  HttpClient,
  HttpHeaders,
  HttpEventType,
  HttpHeaderResponse,
} from '@angular/common/http';
import { Component } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import {
  NgxFileDropEntry,
  FileSystemFileEntry,
  FileSystemDirectoryEntry,
} from 'ngx-file-drop';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

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
  loading = false;
  success = false;
  error = false;
  faSpinner = faSpinner;
  faCircleCheck = faCircleCheck;
  faExclamationTriangle = faExclamationTriangle;
  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    const dropZone = <HTMLElement>document.querySelector('.dropzone');
    dropZone.classList.remove('dropzone-hover');
    const uploadBtn = <HTMLElement>document.querySelector('.upload-submit');
    uploadBtn.classList.add('dragged');
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
    if (this.files.length === 0) {
      console.log('No files selected');
      return;
    }
    this.loading = true;
    const files = this.files;
    for (const droppedFile of files) {
      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          console.log(droppedFile.relativePath, file);
          const formData = new FormData();
          formData.append('file', file, droppedFile.relativePath);
          const headers = new HttpHeaders({});
          headers.append('Access-Control-Allow-Origin', '*');
          headers.append('Access-Control-Allow-Credentials', 'true');
          this.http
            .post(
              'http://127.0.0.1:5000/resumeanalysis/UploadResume',
              formData,
              {
                headers: headers,
                observe: 'response',
              }
            )
            .subscribe((event: any) => {
              if (event.status === 200) {
                console.log(event.status);
                this.loading = false;
                this.success = true;
              } else {
                this.loading = false;
                this.error = true;
              }
            });
        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }
}
