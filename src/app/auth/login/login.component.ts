import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2'
import { UserService } from 'src/app/services/user.service';

declare var gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ]
})
export class LoginComponent implements OnInit{

  public auth2: any;

  public formSubmitted = false;
  private regExpEmail = /^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/
  public invalidPassword = false;

  public loginForm = this.fb.group({
    email: [localStorage.getItem('email')|| '', [Validators.required, Validators.pattern(this.regExpEmail)]],
    password: ['', Validators.required],
    remember: [false]
  })


  constructor(private router: Router, private  userService: UserService, private fb: FormBuilder, private ngZone: NgZone) { }
 
  ngOnInit() {
    this.renderButton()
  }
 
  login() {
    if (this.loginForm.valid) {
      this.userService.login(this.loginForm.value).subscribe(resp => {
        if (this.loginForm.get('remember').value) {
          localStorage.setItem('email', this.loginForm.get('email').value);
        } else {
          localStorage.removeItem('email');
        }
        //navegar al dashboard
        this.router.navigateByUrl('/');
      }, (err) => {
        Swal.fire('Error', err.error.msg, 'error');
      });
    }
    //
  }

  getMessageError(field: string) {
    var message;
      if (this.loginForm.get(field).errors.required) {
        message = 'Debes ingresar un valor';
      } else if (this.loginForm.get(field).hasError('pattern')) {
        message = 'No es un email valido';
      }

    return message;
  }

  isValidField(field: string): boolean {
     return (this.loginForm.get(field).touched || this.loginForm.get(field).dirty) && !this.loginForm.get(field).valid
  }

  /**
   * metodo que renderiza el boton de inicio de sesion de google
   */
  renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark',
    });
    this.startApp();
  }

/**
 * metodo de google para iniciar sesion
 */
 async startApp() {
   await this.userService.googleInit();
   this.auth2 = this.userService.auth2;
   this.attachSignin(document.getElementById('my-signin2'));
  };

  /**
   * metodo de google para obtener el token
   * @param element 
   */
  attachSignin(element) {
    this.auth2.attachClickHandler(element, {},
        (googleUser) => {

          var id_token = googleUser.getAuthResponse().id_token;
          this.userService.loginGoogle(id_token).subscribe(res => {
              //navegar al dashboard
              this.ngZone.run(() => {
                this.router.navigateByUrl('/');
              })
          });
          
        }, (error) => {
          alert(JSON.stringify(error, undefined, 2));
        });
  }
}
