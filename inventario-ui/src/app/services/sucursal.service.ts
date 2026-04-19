import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Sucursal } from '../models/sucursal';
import { ApiResponse } from '../models/apiResponse';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SucursalService {
  private apiUrl = `${environment.apiUrl}/api/sucursales`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<ApiResponse<Sucursal[]>> {
    return this.http.get<ApiResponse<Sucursal[]>>(this.apiUrl);
  }

  getActivos(): Observable<ApiResponse<Sucursal[]>> {
    return this.http.get<ApiResponse<Sucursal[]>>(`${this.apiUrl}/activos`);
  }

  create(data: Sucursal): Observable<ApiResponse<Sucursal>> {
    return this.http.post<ApiResponse<Sucursal>>(this.apiUrl, data);
  }

  update(id: number, sucursal: Sucursal): Observable<ApiResponse<Sucursal>> {
    return this.http.put<ApiResponse<Sucursal>>(`${this.apiUrl}/${id}`, sucursal);
  }

  delete(id: number): Observable<ApiResponse<any>> {
    return this.http.delete<ApiResponse<any>>(`${this.apiUrl}/${id}`);
  }
}
