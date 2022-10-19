import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../data/data.service';
import { Employee } from '../data/employee';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  employeeDetails: Employee = { employeeId: 0, firstName: '', lastName: '', email: '', contactNumber: 0 }
  form: FormGroup = new FormGroup({});
  lastEmployeeId:any;

  constructor(private dataService: DataService, private router:Router, private fb: FormBuilder) {
    /** This will create formControlGroup for list of elements and assign validators */
    this.form = fb.group({
      employeeId: [''],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      contactNumber: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]]
    })
  }

  /** Fetched list of employees using getAllEmployees() method
   * and last employeeId number from the employee-list in ngOnInit() */
  ngOnInit(): void {
    let allEmployeeData = this.dataService.getAllEmployees();
    this.lastEmployeeId = allEmployeeData[allEmployeeData.length-1];
  }

  /** This will return formControl's states */
  public get formData() {
    return this.form.controls;
  }

  /** This will call addNewEmployee() method to add new employee to employee-list till page reloads or refreshes
   * After adding employee to list, it will redirect to employeeList page
   */
  public saveEmployee() : void {
    this.employeeDetails.employeeId = this.lastEmployeeId.employeeId + 1;
    this.dataService.addNewEmployee(this.employeeDetails);
    this.router.navigate(['employeeList']);
  }

  /** If clicked, This will return to employeeList page */
  public cancel() : void {
    this.router.navigate(['employeeList']);
  }
}
