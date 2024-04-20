import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { AdministrationService } from '../../core/services/administration/administration.service';
import { Administration } from '../../core/models/administration';
import { HttpClientModule } from '@angular/common/http';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { isPlatformBrowser } from '@angular/common';
import { initFlowbite } from 'flowbite';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-administrations',
  standalone: true,
  imports: [
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [AdministrationService],
  templateUrl: './administrations.component.html',
  styleUrl: './administrations.component.scss'
})
export class AdministrationsComponent implements OnInit {
  administrations!: any
  administrationForm: FormGroup
  departmentsForm: FormGroup
  constructor(private administrationService: AdministrationService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private primengConfig: PrimeNGConfig,
    private fb: FormBuilder) {
    this.administrationForm = this.fb.group({
      name: ['', Validators.required]
    })
    this.departmentsForm = this.fb.group({
      name: [, Validators.required],
      code: [],
      transfer_number: [],
      administration_id: [, Validators.required]
    })
  }
  getAdministration() {
    this.administrationService.getAdministrations().subscribe({
      next: (data: any) => {
        this.administrations = data
        console.log(this.administrations)
      },
      error: (error) => {
        console.log(error)
      }
    })
  }
  addAdministration() {
    this.administrationService.addAdministration(this.administrationForm.value).subscribe({
      next: (data: any) => {
        console.log(data)
        this.getAdministration()
        this.administrationForm.reset()
      },
      error: (error) => {
        console.log(error)
      }
    })
  }
  addDeparment(administrationID: any) {
    this.departmentsForm.get('administration_id')?.patchValue(administrationID)
    this.administrationService.addDepartment(this.departmentsForm.value).subscribe({
      next: (data: any) => {
        console.log(data)
        this.getAdministration()
        this.departmentsForm.reset()
      },
      error: (error) => {
        console.log(error)
      }
    })
  }
  ngOnInit() {
    this.getAdministration()
    this.primengConfig.ripple = true;
    if (isPlatformBrowser(this.platformId)) {
      initFlowbite()
    }
  }
}
