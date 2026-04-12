import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Sucursal } from '../models/sucursal';
import { ApiResponse } from '../models/apiResponse';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class SucursalService {

  private apiUrl = 'http://localhost:8080/api/sucursales';

  constructor(private http: HttpClient) {}

  getAll(): Observable<ApiResponse<Sucursal[]>> {
  return this.http.get<ApiResponse<Sucursal[]>>(this.apiUrl);
}

  create(data: Sucursal) {
    return this.http.post<Sucursal>(this.apiUrl, data);
  }

  update(id: number, sucursal: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/sucursales/${id}`, sucursal);
  }

  delete(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}