import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, DestroyRef, ElementRef, Inject, OnInit, PLATFORM_ID, ViewChild, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TreeModule } from 'primeng/tree';
import { AccordionModule } from 'primeng/accordion';
import { DropdownModule } from 'primeng/dropdown';
import { ExectivePlanService } from '../../core/services/executive-plan/exective-plan.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { EmployeeService } from '../../core/services/employee/employee.service';
import { StrategicPlanService } from '../../core/services/stratigic-plan/strategic-plan.service';
import { ActivityService } from '../../core/services/activity/activity.service';
import { AdministrationService } from '../../core/services/administration/administration.service';
import { BeneficiaryCategoryService } from '../../core/services/beneficiary_category/beneficiary-category.service';
import { StratigicPlan } from '../../core/models/stratigic-plan';
import { Activity } from '../../core/models/activity';
import { BeneficiaryCategory } from '../../core/models/beneficiary-category';
import { Employee } from '../../core/models/employee';
import { Administration } from '../../core/models/administration';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CalendarModule } from 'primeng/calendar';
import { initFlowbite } from 'flowbite';
import { ActivatedRoute, Router } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { json } from 'express';
// import { DatepickerModule } from 'ng2-datepicker';

// import Datepicker from '@themesberg/tailwind-datepicker/Datepicker';

declare var Datepicker: any;
// import Datepicker from 'flowbite-datepicker/Datepicker';
// import { error } from 'console';
@Component({
  selector: 'app-add-executive-plan',
  standalone: true,
  imports: [
    TreeModule,
    FormsModule,
    CommonModule,
    AccordionModule,
    DropdownModule,
    CalendarModule,
    ReactiveFormsModule,

  ],
  providers: [],
  templateUrl: './add-executive-plan.component.html',
  styleUrl: './add-executive-plan.component.scss'
})
export class AddExecutivePlanComponent implements OnInit {
  date2!: Date
  startDate: any
  strategicPlan: any
  activites?: Activity
  employees: any
  beneficiaryCats: BeneficiaryCategory[] = []
  administrations: any[] = []
  strategicPlanForm: FormGroup;
  plans: any
  planIdParam: any
  datePickerConfig = {
    format: 'DD'
  };

  @ViewChild('datepickerId') datepickerEl!: ElementRef;
  @ViewChild('datepickerInput') datepickerInput!: ElementRef;
  destroyRef = inject(DestroyRef);
  constructor(
    private exectivePlanService: ExectivePlanService,
    private employeeService: EmployeeService,
    private strategicPlanService: StrategicPlanService,
    private activityService: ActivityService,
    private administrationService: AdministrationService,
    private beneficiaryCateService: BeneficiaryCategoryService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private primengConfig: PrimeNGConfig,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.strategicPlanForm = this.fb.group({
      executive_plans: this.fb.array([this.fb.group({
        name: [''],
        plan_name: [''],
        main_goal: [''],
        Requirements: [''],
        expected_impact: [''],
        cost: [],
        description: [''],
        activity_id: [null, Validators.required],
        beneficiary_id: [null, Validators.required],
        repetition: [false],
        automated_reports: [false],
        follow_up: [false],
        out_of_plan: [false],
        Strategic_plan_id: [],
        goal_id: [],
        missions: this.fb.array([this.fb.group({
          name: [''],
          start_date: [new Date().toDateString()],
          end_date: [new Date().toDateString()],
          number_value: [''],
          evaluation_method: [''],
          procedure: [''],
          procedure_date: [new Date().toDateString()],
          description: [''],
          employee_id: [],
          administration_id: [],

        })])
      })])
    });
  }
  get executivePlans(): FormArray {
    return this.strategicPlanForm.get('executive_plans') as FormArray;
  }
  missions(executivePlanIndex: any): FormArray {
    return this.executivePlans.at(executivePlanIndex).get('missions') as FormArray;
  }
  addExecutivePlan() {
    this.executivePlans.push(this.fb.group({
      name: [''],
      plan_name: [''],
      main_goal: [''],
      Requirements: [''],
      expected_impact: [''],
      cost: [0],
      description: [''],
      activity_id: [null, Validators.required],
      beneficiary_id: [null, Validators.required],
      repetition: [false],
      automated_reports: [false],
      follow_up: [false],
      out_of_plan: [false],
      Strategic_plan_id: [],
      goal_id: [],
      missions: this.fb.array([this.fb.group({
        name: [''],
        start_date: [new Date().toDateString()],
        end_date: [new Date().toDateString()],
        number_value: [''],
        evaluation_method: [''],
        procedure: [''],
        procedure_date: [new Date().toDateString()],
        description: [''],
        employee_id: [null],
        administration_id: [],
      })])
    }));
  }
  addMission(executivePlanIndex: number) {
    const missions = this.executivePlans.at(executivePlanIndex).get('missions') as FormArray;
    missions.push(
      this.fb.group({
        name: [''],
        start_date: [''],
        end_date: [''],
        number_value: [''],
        evaluation_method: [''],
        procedure: [''],
        procedure_date: [''],
        description: [''],
        employee_id: [],
        administration_id: [],
      })
    );
  }
  ngOnInit() {
    this.getActivities()
    this.getAdministrations()
    this.getBeneficieryCats()
    this.getEmployees()
    // this.getStraticigPlan()
    this.primengConfig.ripple = true;
    if (isPlatformBrowser(this.platformId)) {
      initFlowbite()

    }
    this.route.params.subscribe((params) => {
      console.log(params)
      if (params) {
        this.planIdParam = params['id'];
        const id = params['id']
        console.log(' id:', this.planIdParam, id);

        this.strategicPlanService.getstratigic_planByID(this.planIdParam).subscribe({
          next: (data) => {
            this.strategicPlan = data
            console.log(this.strategicPlan)
          },
          error: (error) => {
            console.log(error)
          }
        })


      }
    })
  }

  getActivities() {
    this.activityService.getActivities().subscribe({
      next: (data) => {
        this.activites = data
        console.log(this.activites)
      },
      error: (error) => {
        console.log(error)
      }
    })
  }
  getBeneficieryCats() {
    this.beneficiaryCateService.getBeneficiary_categories().subscribe({
      next: (data) => {
        this.beneficiaryCats = data
        console.log(this.beneficiaryCats)
      },
      error: (error) => {
        console.log(error)
      }
    })
  }
  getEmployees() {
    this.employeeService.getEmployees().subscribe({
      next: (data) => {
        this.employees = data
      },
      error: (error) => {
        console.log(error)
      }
    })
  }
  getAdministrations() {
    this.administrationService.getAdministrations().subscribe({
      next: (data) => {
        this.administrations = data
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  get lastendix() {
    // console.log(this.executivePlans.length - 1)
    return this.executivePlans.length - 1
  }
  addExecutivePlans() {
    this.exectivePlanService.addExectivePlan(this.strategicPlanForm.value, JSON.parse(this.planIdParam)).subscribe({
      next: (data) => {
        console.log(data)
        this.strategicPlanForm.reset()
        this.router.navigate([`/executive_plans/${this.planIdParam}`])
      },
      error: (error) => {
        console.log(error)
      }
    })
  }
  onSelectChange(event: any) {
    console.log(event)
    this.strategicPlanForm.get('employee_id')?.patchValue(event.value)
  }
  onChange(event: any,) {
    // Get the new input value
    console.log(event.target.value)
    const newValue = (event.target as HTMLInputElement).value;
    // Perform actions based on the new value
    console.log(newValue);
  }
  handleDateSelection(selectedDate: any) {
    this.datepickerInput.nativeElement.value = selectedDate;
    console.log(this.datepickerInput.nativeElement.value)
    // this.datepickerEl.get
  }

  private initDatePickerElement(element: any): void {
    new Datepicker(element, this.datePickerConfig);
    element.addEventListener('changeDate', (e: any) => {
      const value = e.target.value;
      const formControlName = e.target.getAttribute('formControlNamePath');
      const formControl = this.strategicPlanForm.get(formControlName);
      formControl?.setValue(value);
      formControl?.markAsDirty();
    });
  }
}
