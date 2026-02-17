import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { map, Observable } from 'rxjs';
import { Gasto, Page, TipoGasto } from '../models/gasto.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class GastoService {

  private apiUrlGasto = `${environment.apiUrl}/gastos`;
   private apiUrlTipoGasto = `${environment.apiUrl}/tipo-gasto`;
  constructor(private http: HttpClient, private auth: AuthService) {}

  // Gastos
  getGastos(params: any): Observable<Page<Gasto>> {
    let httpParams = new HttpParams();
    Object.keys(params).forEach(key => {
      if (params[key]) httpParams = httpParams.append(key, params[key]);
    });
    return this.http.get<Page<Gasto>>(`${this.apiUrlGasto}`, {headers: this.auth.getAuthHeaders(), params: httpParams });
  }

  crearGasto(gasto: Gasto): Observable<Gasto> {
    return this.http.post<Gasto>(`${this.apiUrlGasto}`, gasto, {headers: this.auth.getAuthHeaders()});
  }

  // Tipos de Gasto
  getTiposGasto(): Observable<TipoGasto[]> {
    return this.http.get<any>(`${this.apiUrlTipoGasto}`, {headers: this.auth.getAuthHeaders()}).pipe(
      map(res => res.content ? res.content : res) 
    );
  }

  crearTipoGasto(tipo: TipoGasto): Observable<TipoGasto> {
    return this.http.post<TipoGasto>(`${this.apiUrlTipoGasto}`, tipo, {headers: this.auth.getAuthHeaders()});
  }
}
