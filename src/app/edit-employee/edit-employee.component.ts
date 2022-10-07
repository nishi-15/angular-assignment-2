import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data/data.service';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {
  employee: any;

  constructor(private dataService: DataService, private router:Router, private route:ActivatedRoute) {}

  ngOnInit(): void {
    var empId=this.route.snapshot.params["id"];
    this.employee=this.dataService.getEmployee(parseInt(empId));
    console.log(this.employee);
  }

  updateEmployee()
  {
    this.dataService.updateEmployee(this.employee);
    this.router.navigate(["employeeList"]);
  }
  cancel()
  {
    this.router.navigate(["employeeList"]);
  }

  formGroup = new FormGroup({
    firstName: new FormControl(),
    lastName: new FormControl(),
    email: new FormControl(),
    contactNumber: new FormControl()
  })
}
