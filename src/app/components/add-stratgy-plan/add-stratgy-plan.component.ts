import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { StrategicPlanService } from '../../core/services/stratigic-plan/strategic-plan.service';
@Component({
  selector: 'app-add-stratgy-plan',
  standalone: true,
  imports: [
    CalendarModule,
    FormsModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule
  ],
  templateUrl: './add-stratgy-plan.component.html',
  styleUrl: './add-stratgy-plan.component.scss'
})
export class AddStratgyPlanComponent {
  startDate: Date | undefined;
  endDate: Date | undefined
  strategicPlanForm: FormGroup;
  abbreviations: any[] = []
  constructor(private fb: FormBuilder, private stratigicPlanService: StrategicPlanService) {
    this.strategicPlanForm = this.fb.group({
      name: ['', Validators.required],
      start_date: ['', Validators.required],
      end_date: ['', Validators.required],
      introduction: [''],
      goals: this.fb.array([this.fb.group({
        name: [''],
        description: [''],
        abbreviation: ['']
      })]),
      sub_goals: this.fb.array([this.fb.group({
        name: [''],
        description: [''],
        goal_abbreviation: ['']
      }
      )])
    });
  }

  ngOnInit(): void {
    this.goals.valueChanges.subscribe(changes => {
      console.log('Goals array changed:', this.abbreviations);
      this.abbreviations = this.goals.value
      //  this.abbreviations=this.goals
      console.log('Goals array changed:', this.abbreviations);
    });
  }

  get goals() {
    return this.strategicPlanForm.get('goals') as FormArray;
  }

  get sub_goals() {
    return this.strategicPlanForm.get('sub_goals') as FormArray;
  }

  addGoal() {
    this.goals.push(this.fb.group({
      name: [''],
      description: [''],
      abbreviation: ['']
    }
    ));
  }

  addSubGoal() {
    this.sub_goals.push(this.fb.group({
      name: [''],
      description: [''],
      goal_abbreviation: ['']
    }));
  }

  addStratigicPlan() {
    // Handle form submission
    if (this.strategicPlanForm.valid) {
      this.stratigicPlanService.addStratigic_plan(this.strategicPlanForm.value).subscribe({
        next: (data) => {
          this.strategicPlanForm.reset()
        },
        error: (error) => {
          console.log(error)
          // this.message = error.error.message
          // console.log(this.message)
        }
      })
    } else {

    }
  }
}
