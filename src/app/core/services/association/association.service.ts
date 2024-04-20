import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Association } from '../../models/association';

@Injectable({
  providedIn: 'root'
})
export class AssociationService {

  constructor(private http: HttpClient) { }
  addAssociation(data: any) {
    return this.http.post(`${environment.apiUrl}/association/add_association`, data, {
      headers: {
        Accept: '*/*',
        // 'Content-Type': 'multipart/form-data',
      }
    }
    )
  }
  getAssociation(id: any) {
    return this.http.get(`${environment.apiUrl}/association/${id}`
    )
  }
}
