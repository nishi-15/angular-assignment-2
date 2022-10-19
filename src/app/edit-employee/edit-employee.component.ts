import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data/data.service';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {
  employee: any;
  form: FormGroup = new FormGroup({});

  constructor(private dataService: DataService, private router:Router, private route:ActivatedRoute, private fb: FormBuilder) {
    /** This will create formControlGroup for list of elements and assign validators */
    this.form = fb.group({
      employeeId: [''],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      contactNumber: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]]
    })
  }

  /** Fetched employee detail using getAllEmployees(id) method
   * and employeeId from snapshot from the employee-list in ngOnInit() */
  ngOnInit(): void {
    var empId=this.route.snapshot.params["id"];
    this.employee=this.dataService.getEmployee(parseInt(empId));
  }

  /** This will return formControl's states */
  public get formData(){
    return this.form.controls;
  }

  /** This will call updateEmployee() method to update employee detail to employee-list till page reloads or refreshes
   * After updating employee to list, it will redirect to employeeList page
   */
  public updateEmployee() : void {
    this.dataService.updateEmployee(this.employee);
    this.router.navigate(["employeeList"]);
  }

  /** If clicked, This will return to employeeList page */
  public cancel() : void {
    this.router.navigate(["employeeList"]);
  }
}
