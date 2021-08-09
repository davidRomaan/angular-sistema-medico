import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Medic } from 'src/app/models/medic.model';
import { MedicService } from 'src/app/services/medic.service';
import { ModalImageService } from 'src/app/services/modal-image.service';
import { SearchesService } from 'src/app/services/searches.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medics',
  templateUrl: './medics.component.html',
  styles: [
  ]
})
export class MedicsComponent implements OnInit, OnDestroy{

  public medics: Medic[] = [];
  public loading: boolean = true;
  public imgSubs: Subscription;

  constructor(private medicService: MedicService, private searchService: SearchesService, private modalImgService: ModalImageService) { }
  
  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.loadMedics();
    this.imgSubs = this.modalImgService.newImg.pipe(delay(200)).subscribe(img => {
      this.loadMedics();
    })
  }


  loadMedics() {
    this.loading = true
    this.medicService.loadMedics().subscribe(medics => {
      this.medics = medics
      this.loading = false
    });
  }

  search(term: string) {
    if (term) {
      this.searchService.search('medicos', term).subscribe((res: any) => {
        this.medics = res.medic
        //this.isTermEmpty = false;
      });
    } else {
      //this.isTermEmpty = true;
      this.loadMedics()
    }
  }
  deleteMedic(medic: Medic) {
    return Swal.fire({
      title: 'Eliminar medico',
      text: `Esta seguro de eliminar el medico ${medic.name}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'si'
    }).then((result) => {
      if (result.isConfirmed) {
        this.medicService.deleteMedic(medic._id).subscribe(res => {
          if (res.ok) {
            Swal.fire(res.msg, medic.name, 'success');
            this.loadMedics();
          }else {
            Swal.fire('ocurrio un error', 'error');
            console.log(res);
          }
        })   
      }
    })
  }
  openModal(medic: Medic) {
    this.modalImgService.openModal('medics', medic._id, medic.img);
  }
}
