import { Component, OnInit } from '@angular/core';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { ModalImageService } from 'src/app/services/modal-image.service';
import { SwalService } from 'src/app/services/swal.service';

@Component({
  selector: 'app-modal-image',
  templateUrl: './modal-image.component.html',
  styles: [
  ]
})
export class ModalImageComponent implements OnInit {

  public hideModal: boolean = false;
  public imageToUpload: File
  public imgTemp: any = null; 

  constructor(public modalImgService: ModalImageService, private fileUploadService: FileUploadService,
    private swalService: SwalService) { }

  ngOnInit(): void {
  }

  closeModal() {
    this.imgTemp = null
    this.modalImgService.closeModal();
  }

  changeImage(file: any) {
    this.imageToUpload = file.target.files[0];
    if (!file.target.files[0]) {
      return this.imgTemp = null;
    }
    const fileSelected = file.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(fileSelected);

    reader.onloadend = () => {
      this.imgTemp = reader.result;
    }
  }

  async updateImage() {
    const id = this.modalImgService.id;
    const type = this.modalImgService.type;

    const res = await this.fileUploadService.updateImage(this.imageToUpload, type, id);
    if (!res.ok) {
      return this.swalService.getMessage('error', res.msg);
    }
    this.swalService.getMessage('success', 'Imagen actualizada');
    this.modalImgService.newImg.emit(res.fileName);
    this.closeModal();
  }
}
