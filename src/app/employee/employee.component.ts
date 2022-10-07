import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Employee } from '../data/employee';
import { FormControl, FormGroup, NgModel } from '@angular/forms';
import { DataService } from '../data/data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  @Input()
  employee!: Employee;

  @Output() updateEmployeeList: EventEmitter<boolean> = new EventEmitter<boolean>();

  allEmployeeDetails: Employee[] | any;

  constructor(private dataService: DataService,private route:ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.allEmployeeDetails = this.dataService.getAllEmployees();
    console.log(this.allEmployeeDetails);
  }

  deleteEmployee(employee:Employee) {
    var confirmation = confirm("Are you sure want to delete this employee?");
    if (confirmation) {
      this.dataService.deleteEmployee(employee);
      this.updateEmployeeList.emit(true);
      this.router.navigate(["employeeList"]);
    }
    else{
      this.router.navigate(["employeeList"]);
    }
  }
}
