import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { Employee } from '../../models/employee';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }
  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${environment.apiUrl}/employee`)
  }
  addEmployee(data: any) {
    return this.http.post<Employee[]>(`${environment.apiUrl}/employee/add`, data,
      {
        headers: {
          Accept: '*/*',
          // 'Content-Type': 'multipart/form-data',
        }
      }
    )

  }
}
