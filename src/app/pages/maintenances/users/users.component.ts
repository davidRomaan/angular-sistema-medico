import Swal from 'sweetalert2'
import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';

import { ModalImageService } from 'src/app/services/modal-image.service';
import { SearchesService } from 'src/app/services/searches.service';
import { SwalService } from 'src/app/services/swal.service';
import { UserService } from 'src/app/services/user.service';
import { delay } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: [
  ]
})
export class UsersComponent implements OnInit, OnDestroy {

  public from: number = 0;
  public totalUsers: number = 0;
  public users: User[] = [];
  public loading: boolean = true;
  public isTermEmpty: boolean = true;
  public imgSubs: Subscription;

  constructor(private userService: UserService, private searchService: SearchesService,
    private swalService: SwalService, private modalImgService: ModalImageService) { }
  
  
  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.loadUsers();
    this.imgSubs = this.modalImgService.newImg.pipe(delay(100)).subscribe(img => {
      console.log(img);
      this.loadUsers();
    })
  }
  loadUsers() {
    this.userService.loadUsers(this.from).subscribe((res: any) => {
      this.totalUsers = res.total
      this.users = res.users
      this.loading = false
    });
  }

  changePage(value) {
    this.from += value;

    if (this.from < 0) {
      this.from = 0;
    } else if (this.from > this.totalUsers) {
      this.from -= value;
    }
    this.loadUsers();
  }

  search(term: string) {
    if (term) {
      this.searchService.search('usuarios', term).subscribe((res: any) => {
        this.users = res.users
        this.isTermEmpty = false;
      });
    } else {
      this.isTermEmpty = true;
      this.loadUsers()
    }
  }

  deleteUser(user: User) {

    if (user.uid === this.userService.uid) {
      return Swal.fire('Error', 'No se puede eliminar a si mismo', 'error');
    } else {
      return Swal.fire({
        title: 'Eliminar usuario?',
        text: `Esta seguro de eliminar a ${user.name}?`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'si'
      }).then((result) => {
        if (result.isConfirmed) {
          this.userService.deleteUser(user).subscribe((res: any) => {
            if (res.ok) {
              Swal.fire(
                'Deshabilitado!',
                'El usuario ha sido deshabilitado.',
                'success'
              )
              this.loadUsers();
            }
          })
        }
      })
    }
  }
  changeRole(user: User) {
    this.userService.updateRole(user).subscribe((res: any) =>{
      if (res.ok) {
        this.swalService.getMessage('success', 'Rol actualizado');
        }
    });
  }

  openModal(user: User) {
    this.modalImgService.openModal('users', user.uid, user.img);
  }
}
