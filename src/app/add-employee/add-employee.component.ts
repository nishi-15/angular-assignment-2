import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../data/data.service';
import { Employee } from '../data/employee';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  employeeDetails: Employee = {
    employeeId: 0,
    firstName: '',
    lastName: '',
    email: '',
    contactNumber: 0
  }

  lastEmployeeId:any;

  constructor(private dataService: DataService, private router:Router) { }

  ngOnInit(): void {
    let allEmployeeData = this.dataService.getAllEmployees();
    this.lastEmployeeId = allEmployeeData[allEmployeeData.length-1];
  }

  saveEmployee() {
    console.log('In onSubmit method:', this.employeeDetails);

    this.employeeDetails.employeeId = this.lastEmployeeId.employeeId + 1;
    this.dataService.addNewEmployee(this.employeeDetails);
    this.router.navigate(['employeeList']);
  }

  cancel(){
    this.router.navigate(['employeeList']);
  }

  //Created form controls for all the fields
  formGroup = new FormGroup({
    firstName: new FormControl(),
    lastName: new FormControl(),
    email: new FormControl(),
    contactNumber: new FormControl()
  })

}
