import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiResponse } from "../models/apiResponse";
import { Producto } from "../models/producto";

@Injectable({
    providedIn: 'root'
})

export class ProductoService{
    private apiUrl = 'http://localhost:8080/api/productos';

    constructor(private http:HttpClient){}

    getAll(): Observable<ApiResponse<Producto[]>>{
        return this.http.get<ApiResponse<Producto[]>>(this.apiUrl);
    }

    getActivos(): Observable<ApiResponse<Producto[]>> {
        return this.http.get<ApiResponse<Producto[]>>(`${this.apiUrl}/activos`);
    }

    create(data: Producto):Observable<ApiResponse<Producto>> {
        return this.http.post<ApiResponse<Producto>>(this.apiUrl, data);
    }

    update(id: number, producto: Producto): Observable<ApiResponse<Producto>> {
        return this.http.put<ApiResponse<Producto>>(
              `${this.apiUrl}/${id}`, 
              producto
        );
    }

    delete(id: number): Observable<ApiResponse<any>>{
        return this.http.delete<ApiResponse<any>>(`${this.apiUrl}/${id}`);
    }
}