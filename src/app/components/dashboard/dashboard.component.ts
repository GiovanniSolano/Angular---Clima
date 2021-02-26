import { Component, OnInit } from '@angular/core';
import { ClimaService } from '../../services/clima.service';

import { Clima } from "../../models/clima.model";
import { delay } from "rxjs/operators";

import Swal from 'sweetalert2'
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  urlImagen = 'https://www.revistaenfoque.cl/wp-content/uploads/2019/06/clima-icono.png';
  clima: Clima;
  ciudad = '';
  loading = false;
  mostrarCard = false;
  gradosLetras: string;


  formularioClima: FormGroup;

  constructor(private _climaService: ClimaService) { }

  ngOnInit(): void {

    this.formularioClima = new FormGroup({
      ciudad: new FormControl('', Validators.required),
      grados: new FormControl('metric', Validators.required)
    });

  }

  obtenerClima() {

    const datosClima = {
      ciudad: this.formularioClima.value.ciudad,
      grados: this.formularioClima.value.grados
    };        

    this.mostrarCard = false;
    this.loading = true;
    this._climaService.obtenerClimaCiudad(datosClima)
    .pipe(delay(2000))
    .subscribe(clima => {
      this.loading = false;
      this.mostrarCard = true;

        this.clima = clima;
        this.obtenerLetraGrados(datosClima.grados);
        

      }, error => {

        this.loading = false;

        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        });
        
        Toast.fire({
          icon: 'error',
          title: 'Esa ciudad no existe :('
        });

      });
    
  }

  obtenerLetraGrados(tipoGrados: string) {

    switch (tipoGrados) {
      case 'metric':

      this.gradosLetras = '°C';
        
        break;

      case'imperial':


      this.gradosLetras = '°F';

      break;
    
      default:

      this.gradosLetras = 'K';
        break;
    }

  }


  get GradosValidos() {

    return this.formularioClima.get('grados').invalid && this.formularioClima.get('grados').touched;

  }
  get ciudadValida() {

    return this.formularioClima.get('ciudad').invalid && this.formularioClima.get('ciudad').touched;

  }

}
