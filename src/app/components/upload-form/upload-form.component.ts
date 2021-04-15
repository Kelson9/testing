import { Component, OnInit } from '@angular/core';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { FileUpload } from 'src/app/models/file-upload.model';
import { NgxPayunitComponent } from 'ngx-payunit';

@Component({
  selector: 'app-upload-form',
  templateUrl: './upload-form.component.html',
  styleUrls: ['./upload-form.component.css']
})
export class UploadFormComponent implements OnInit {
  selectedFiles: FileList;
  currentFileUpload: FileUpload;
  percentage: number;
  private payunit: NgxPayunitComponent;

  constructor(private uploadService: FileUploadService) { 
    this.payunit = new NgxPayunitComponent();

  }

  paid=false;
  ngOnInit(): void {
    this.initConfig();

  }
  private initConfig(): void {
    let config = {
      apiUsername: 'payunit_sand_b5i2yOEf3',
      apiPassword: '322c059c-c8d6-4f5a-9d84-5ec89c96dd33',
      x_api_key: '044100e5e139f639c7d65d0c18c49f70aebc4bcb',
      mode: 'live', 
    };

    let data = {
      return_url: "http://localhost:4200",
      notify_url: '',
      description: 'Online payment with supremum',
      purchaseRef: '',
      total_amount: '500',
      name: "Kelson",
      currency: 'XAF',
    };

    this.payunit.config(config);
    this.payunit.payload(data);
 }

  makePayment() {
   this.paid=false;
    this.payunit.pay();
    console.log(this.payunit.payload)
    this.paid=true;
  
  }

  selectFile(event): void {
    this.selectedFiles = event.target.files;
  }

  upload(): void {
    const file = this.selectedFiles.item(0);
    this.selectedFiles = undefined;

    this.currentFileUpload = new FileUpload(file);
    this.uploadService.pushFileToStorage(this.currentFileUpload).subscribe(
      percentage => {
        this.percentage = Math.round(percentage);
      },
      error => {
        console.log(error);
      }
    );
  }
}
 