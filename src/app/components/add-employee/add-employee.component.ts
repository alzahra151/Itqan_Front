import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { EmployeeService } from '../../core/services/employee/employee.service';
import { error } from 'console';
import { AdministrationService } from '../../core/services/administration/administration.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [
    DropdownModule,
    TableModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.scss'
})
export class AddEmployeeComponent {
  products = [
    { code: 1, name: "test", category: "test", quantatity: 2 }
  ];
  selectedFile!: File
  photoSrc = ''
  employeeForm: FormGroup;
  employees: any
  departments: any
  value: string | undefined
  message: any
  constructor(private fb: FormBuilder,
    private employeeService: EmployeeService,
    private adminstrationService: AdministrationService
  ) {
    this.employeeForm = this.fb.group({
      name: ['', Validators.required],
      job_number: [, Validators.required],
      ID_number: [, Validators.required],
      address: [''],
      gender: ['', Validators.required],
      age: [, Validators.required],
      mobile: ['', Validators.required],
      image: [''],
      department_id: []
    });
  }

  ngOnInit(): void {
    this.getEmployess()
    this.getDeparments()
  }

  addEmployee() {
    const employeeData = new FormData();
    employeeData.append('name', this.employeeForm.get('name')?.value)
    employeeData.append('job_number', this.employeeForm.get('job_number')?.value)
    employeeData.append('mobile', this.employeeForm.get('mobile')?.value)
    employeeData.append('ID_number', this.employeeForm.get('ID_number')?.value)
    employeeData.append('address', this.employeeForm.get('address')?.value)
    employeeData.append('gender', this.employeeForm.get('gender')?.value)
    employeeData.append('department_id', this.employeeForm.get('department_id')?.value)

    employeeData.append('age', this.employeeForm.get('age')?.value)
    employeeData.append('image', this.selectedFile)
    this.employeeService.addEmployee(employeeData).subscribe({
      next: (data) => {
        console.log(data)
        this.getEmployess()
        this.employeeForm.reset()
      },
      error: (error) => {
        console.log(error)
        this.message = error.error.message
        console.log(this.message)
      }
    })
  }
  getDeparments() {
    this.adminstrationService.getDeparments().subscribe({
      next: (data) => {
        this.departments = data
        console.log(this.departments)
      },
      error: (error) => {
        console.log(error)
      }
    })
  }
  setFileData(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        this.photoSrc = reader.result as string;
      });
      reader.readAsDataURL(this.selectedFile);
      this.employeeForm.get('image')?.patchValue(this.selectedFile);
      console.log(this.employeeForm.get('image')?.value)
    }
  }
  getEmployess() {
    this.employeeService.getEmployees().subscribe({
      next: (data) => {
        console.log(data)
        this.employees = data
      },
      error: (error) => {
        console.log(error)
        this.message = error.error.message
        console.log(this.message)
      }
    })
  }
}
