import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Hospital } from 'src/app/models/hospital.model';
import { HospitalService } from 'src/app/services/hospital.service';
import { ModalImageService } from 'src/app/services/modal-image.service';
import { SearchesService } from 'src/app/services/searches.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styles: [
  ]
})
export class HospitalsComponent implements OnInit, OnDestroy {

  public hospitals: Hospital[] = [];
  public loading: boolean = true;
  public imgSubs: Subscription;

  constructor(private hospitalService: HospitalService, private modalImgService: ModalImageService,
    private searchService: SearchesService) { }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.loadHospitals();
    this.imgSubs = this.modalImgService.newImg.pipe(delay(100)).subscribe(img => {
      this.loadHospitals();
    })
  }

  async loadHospitals() {
    this.loading = true;
    this.hospitalService.loadHospitals().subscribe(hospitals => {
      this.loading = false
      this.hospitals = hospitals
    });
  }

  updateHospital(hospital: Hospital) {
    this.hospitalService.updateHospitals(hospital._id, hospital.name).subscribe(res => {
      Swal.fire('Actualizado', hospital.name, 'success');
    });
  }

  deleteHospital(hospital: Hospital) {
    return Swal.fire({
      title: 'Eliminar hospital?',
      text: `Esta seguro de eliminar el hospital ${hospital.name}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'si'
    }).then((result) => {
      if (result.isConfirmed) {
        this.hospitalService.deleteHospitals(hospital._id).subscribe(res =>
        {
          if (res.ok) {
            Swal.fire(res.msg, hospital.name, 'success');
            this.loadHospitals();
          } else {
            Swal.fire('ocurrio un error', 'error');
            console.log(res);
          }
        });
      }
    })
  }

  async openSweetAlert() {
    const {value = ''}  = await Swal.fire<string>({
      title: 'Crear nuevo hospital',
      input: 'text',
      inputLabel: 'Nombre del hospital',
      inputPlaceholder: 'Ingrese un nombre',
      showCancelButton: true
    })

      if (value.trim.length > 0) {
        this.hospitalService.createHospitals(value).subscribe(res => {
          if (res.ok) {
            Swal.fire('Hospital creado correctamente', res.hospital.name, 'success');
            this.loadHospitals();
          } else {
            Swal.fire('Ha ocurrido un error', 'error');
            console.log(res);
          }
        })
      } else {
        Swal.fire('Por favor ingrese un nombre','', 'info');
      }
  }
  
  openModal(hospital: Hospital) {
    this.modalImgService.openModal('hospitals', hospital._id, hospital.img);
  }

  search(term: string) {
    if (term) {
      this.searchService.search('hospitales', term).subscribe((res: any) => {
        this.hospitals = res.hospitals
        //this.isTermEmpty = false;
      });
    } else {
      //this.isTermEmpty = true;
      this.loadHospitals()
    }
  }
}
