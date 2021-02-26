import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Clima } from '../models/clima.model';

@Injectable({
  providedIn: 'root'
})
export class ClimaService {


  API_KEY = '3fa43dd417da5f096d3c59d8273362c8';

  URL = 'https://api.openweathermap.org/data/2.5/weather';

  constructor(private http: HttpClient) { }


  obtenerClimaCiudad({ciudad, grados}): Observable<Clima> {

    const URL_COMPLETA = `${this.URL}?units=${grados}&q=${ciudad}&appid=${this.API_KEY}`;

    return this.http.get<Clima>(URL_COMPLETA);

  }
 
}
