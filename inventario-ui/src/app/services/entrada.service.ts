import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Entrada } from '../models/entrada';

@Injectable({
  providedIn: 'root'
})
export class EntradaService {

  private apiUrl = 'http://localhost:8080/api/entradas';

  constructor(private http: HttpClient) {}

  guardar(data: Entrada) {
    return this.http.post(this.apiUrl, data, { responseType: 'text' as 'json' });
  }

  listar() {
    return this.http.get<Entrada[]>(this.apiUrl);
  }

  eliminar(id: number) {
    return this.http.delete(this.apiUrl + '/' + id, { responseType: 'text' });
  }
}