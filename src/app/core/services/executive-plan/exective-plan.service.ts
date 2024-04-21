import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ExectivePlan } from '../../models/exective-plan';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExectivePlanService {

  constructor(private http: HttpClient) { }
  addExectivePlan(data: ExectivePlan, stratigyPlanId: any) {
    return this.http.post(`${environment.apiUrl}/executive_plan/add/${stratigyPlanId}`, data)
  }
  getPlanById(id: any) {
    return this.http.get(`${environment.apiUrl}/executive_plan/${id}`,)
  }
}
