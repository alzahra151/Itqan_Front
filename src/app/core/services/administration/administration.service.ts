import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Administration } from '../../models/administration';
import { environment } from '../../../../environments/environment';
import { Department } from '../../models/department';

@Injectable({
  providedIn: 'root'
})
export class AdministrationService {

  constructor(private http: HttpClient) { }
  addAdministration(data: Administration) {
    return this.http.post(`${environment.apiUrl}/administration/add_administration`, data)

  }
  getAdministrations(): Observable<Administration[]> {
    return this.http.get<Administration[]>(`${environment.apiUrl}/administration`)
  }
  addDepartment(data: Department) {
    return this.http.post(`${environment.apiUrl}/department/add_department`, data)
  }
  getDeparments() {
    return this.http.get(`${environment.apiUrl}/department`)

  }
}
