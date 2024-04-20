import { Component } from '@angular/core';
import { StrategicPlanService } from '../../core/services/stratigic-plan/strategic-plan.service';

import { StratigicPlan } from '../../core/models/stratigic-plan';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-strategic-plans',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './strategic-plans.component.html',
  styleUrl: './strategic-plans.component.scss'
})
export class StrategicPlansComponent {
  plans: any = []
  constructor(private statigyPlanService: StrategicPlanService) { }
  ngOnInit() {
    this.statigyPlanService.getstratigic_plans().subscribe({
      next: (data) => {
        this.plans = data
        console.log(this.plans)
      },
      error: (error) => {
        console.log(error)
      }
    })
  }
}
