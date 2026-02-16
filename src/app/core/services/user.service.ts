import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = `${environment.apiUrl}/auth/users`;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  getUsers(role?: string): Observable<any[]> {
    let params = new HttpParams();
    if (role && role !== 'ALL') {
      params = params.set('role', role);
    }

    return this.http.get<any[]>(this.apiUrl, {
      headers: this.authService.getAuthHeaders(),
      params: params,
    });
  }

  createUser(dto: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/auth/registerUser`, dto, {
      headers: this.authService.getAuthHeaders(),
    });
  }

  getUserById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`, {
      headers: this.authService.getAuthHeaders(),
    });
  }

  updateUser(id: number, dto: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, dto, {
      headers: this.authService.getAuthHeaders(),
    });
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, {
      headers: this.authService.getAuthHeaders(),
    });
  }
}
