import { Directive, Input, NgZone } from '@angular/core';

@Directive({
  selector: '[upload-picture]'
})
export class UploadPicture {

  @Input() type:string;
  @Input() id;

  constructor() {
    console.log('type' + this.type);
   }

}
