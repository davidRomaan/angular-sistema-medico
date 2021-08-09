import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs/operators';
import { Hospital } from 'src/app/models/hospital.model';
import { Medic } from 'src/app/models/medic.model';
import { HospitalService } from 'src/app/services/hospital.service';
import { MedicService } from 'src/app/services/medic.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medic',
  templateUrl: './medic.component.html',
  styles: [
  ]
})
export class MedicComponent implements OnInit {

  public medicForm: FormGroup;
  public hospitals: Hospital[] = []
  public selectedHospital: Hospital;
  public selectedMedic: Medic;

  constructor(private fb: FormBuilder, private hospitalService: HospitalService,
    private medicService: MedicService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(({ id }) => this.loadMedic(id));

    this.medicForm = this.fb.group({
      name: ['', Validators.required],
      hospital: ['', Validators.required]
    })
    this.loadHospitals();

    //otra forma de hacer change a en este caso el select de los hospitales
    this.medicForm.get('hospital').valueChanges.subscribe(hospitalId => {
      this.selectedHospital = this.hospitals.find(h => hospitalId === h._id);
    })
  }

  loadMedic(id: string) {
    if (id === 'nuevo') {
      return;
    }

    if (id.trim().length === 24) {
      this.medicService.getMedicById(id).pipe(delay(150)).subscribe(res => {
        const { name, hospital: { _id } } = res.medic;
        this.medicForm.setValue({ name, hospital: _id });
        this.selectedMedic = res.medic;
      }, error => {
        console.log(error);
      });
    }else{
      Swal.fire('No es un identificador valido para un medico', '', 'info');
    }

  }

  loadHospitals() {
    this.hospitalService.loadHospitals().subscribe((hospitals: Hospital[]) => {
       this.hospitals = hospitals
    })
  }

  showHospital(event) {
    console.log(event);
  }
  saveMedic() {
    try {
      if (this.selectedMedic) {
      //actualizar medico
        const data = {
          ...this.medicForm.value,
          _id: this.selectedMedic._id
        }
        this.medicService.updateMedic(data).subscribe(res => {
          Swal.fire('Medico actualizado con exito', '', 'success');
        })
      } else {
      //crear nuevo
        this.medicService.createMedic(this.medicForm.value).subscribe((res:any) => {
          Swal.fire('Medico creado con exito', '', 'success');
          this.router.navigateByUrl(`/medic/${res.newMedic._id}`);
        })    
      }
    } catch (error) {
      Swal.fire('Ha ocurrido un error', 'error');
      console.log(error);
    }
  }
}
