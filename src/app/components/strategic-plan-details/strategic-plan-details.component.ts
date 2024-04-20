import { Component, inject } from '@angular/core';
import { StrategicPlanService } from '../../core/services/stratigic-plan/strategic-plan.service';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-strategic-plan-details',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './strategic-plan-details.component.html',
  styleUrl: './strategic-plan-details.component.scss'
})
export class StrategicPlanDetailsComponent {
  // private activatedRoute = inject(ActivatedRoute)
  planId: any
  plan: any
  constructor(private plansservices: StrategicPlanService, private route: ActivatedRoute) { }
  ngOnInit() {
    this.route.params.subscribe((params) => {
      if (params) {
        const classParam = params['id'];
        console.log('Class parameter:', classParam);
        this.plansservices.getstratigic_planByID(classParam).subscribe({
          next: (data) => {
            this.plan = data
          }, error: (error) => {
            console.log(error)
          }
        })
      }
    })
  }
}
