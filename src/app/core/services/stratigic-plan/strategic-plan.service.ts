import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StratigicPlan } from '../../models/stratigic-plan';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StrategicPlanService {

  constructor(private http: HttpClient) { }
  getstratigic_planByID(id: number): Observable<StratigicPlan> {
    return this.http.get<StratigicPlan>(`${environment.apiUrl}/strategic_plan/${id}`)
  }
  addStratigic_plan(data: StratigicPlan) {
    return this.http.post(`${environment.apiUrl}/strategic_plan/add`, data)
  }
  getstratigic_plans(): Observable<StratigicPlan> {
    return this.http.get<StratigicPlan>(`${environment.apiUrl}/strategic_plan`)
  }
}
