import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Employee } from '../data/employee';
import { DataService } from '../data/data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-employee',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  @Input()
  employee!: Employee;

  @Output() updateEmployeeList: EventEmitter<boolean> = new EventEmitter<boolean>();

  allEmployeeDetails: Employee[] | any;

  constructor(private dataService: DataService,private route:ActivatedRoute, private router: Router) { }

  /** Fetched list of employees using getAllEmployees() method in ngOnInit() */
  ngOnInit(): void {
    this.allEmployeeDetails = this.dataService.getAllEmployees();
  }

  /** deleteEmployee(employee:Employee) method is used to delete employee from the list after user confirmation
   * then redirects to employeeList page.
   */
  public deleteEmployee(employee:Employee) : void {
    var confirmation = confirm("Are you sure want to delete this employee?");
    if (confirmation) {
      this.dataService.deleteEmployee(employee);
      this.updateEmployeeList.emit(true);
    }
    this.router.navigate(["employeeList"]);
  }
}
