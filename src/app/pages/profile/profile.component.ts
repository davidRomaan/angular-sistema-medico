import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { SwalService } from 'src/app/services/swal.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [
  ]
})
export class ProfileComponent implements OnInit {

  public user: User;
  public profileForm: FormGroup;
  private regExpEmail = /^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/
  public imageToUpload: File
  public imgTemp: any = null; 

  constructor(private fb: FormBuilder, private userService: UserService, private swalService: SwalService, private fileUploadService: FileUploadService) {
    this.user = userService.user;
  }

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      name: [this.user.name, Validators.required],
      email: [this.user.email, [Validators.required, Validators.pattern(this.regExpEmail)]],
    })
    }

  updateProfile() {
    this.userService.updateProfileUser(this.profileForm.value).subscribe((res: any) => {
      this.user.name = res.user.name
      this.user.email = res.user.email
      this.swalService.getMessage('success', 'Actualización exitosa');
      
    }, (err) => {
      this.swalService.getMessageError(err.error.msg);
      })
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
    const res = await this.fileUploadService.updateImage(this.imageToUpload, 'users', this.user.uid)
    if (!res.ok) {
      return this.swalService.getMessage('error', res.msg);
    }
    this.user.img = res.fileName;
    this.swalService.getMessage('success', 'Imagen actualizada');
  }
}
