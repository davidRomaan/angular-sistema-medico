import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [ './register.component.css' ]
})
export class RegisterComponent {

  public formSubmitted = false;
  private regExpEmail = /^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/
  public invalidPassword = false;

  public registerForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(4)]],
    email: ['', [Validators.required, Validators.pattern(this.regExpEmail)]],
    password: ['', Validators.required],
    password2: ['', Validators.required],
    terms: ['', [Validators.required, Validators.requiredTrue]]
  })
  
  constructor(private router: Router, private fb: FormBuilder, private userService: UserService) { }

  createUser() {
    this.formSubmitted = true;

    if (this.registerForm.valid) {
      if (this.validatePassword()) {
        this.invalidPassword = false

        //realizar el posteo
        this.userService.createUser(this.registerForm.value).subscribe(res => {
             //navegar al dashboard
             this.router.navigateByUrl('/');
        }, (err) => {
            Swal.fire('Error', err.error.msg, 'error');
        });
      } else {
        this.invalidPassword = true
      }
    } 
  }

  validatePassword():boolean {
    const pass1 = this.registerForm.get('password').value;
    const pass2 = this.registerForm.get('password2').value;

    if (pass1 === pass2) {
      return true;
    } else {
      return false
    }
  }

  validateTerms(): boolean{
    return !this.registerForm.get('terms').value && this.formSubmitted;
  }

  getMessageError(field: string) {
    var message;
      if (this.registerForm.get(field).errors.required) {
        message = 'Debes ingresar un valor';
      } else if (this.registerForm.get(field).hasError('pattern')) {
        message = 'No es un email valido';
      } else if (this.registerForm.get(field).hasError('minlength')) {
        const minLength = this.registerForm.get(field).errors?.minlength.requiredLength;
        message = `El nombre debe de contener minimo ${minLength} caracteres`;
      }

    return message;
  }

  isValidField(field: string): boolean {
     return (this.registerForm.get(field).touched || this.registerForm.get(field).dirty) && !this.registerForm.get(field).valid
  }
}
