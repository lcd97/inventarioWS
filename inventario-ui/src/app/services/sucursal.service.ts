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

  create(data: Sucursal): Observable<ApiResponse<Sucursal>> {
  return this.http.post<ApiResponse<Sucursal>>(this.apiUrl, data);
}

  update(id: number, sucursal: Sucursal): Observable<ApiResponse<Sucursal>> {
    return this.http.put<ApiResponse<Sucursal>>(
      `${this.apiUrl}/${id}`, 
      sucursal
    );
  }

  delete(id: number): Observable<ApiResponse<any>> {
    return this.http.delete<ApiResponse<any>>(`${this.apiUrl}/${id}`);
  }
}