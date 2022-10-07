import { Injectable } from '@angular/core';
import { Employee } from './employee';
import { allEmployees } from './employeeList';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  getAllEmployees(): Employee[] {
    return allEmployees;
  }

  addNewEmployee(employee:Employee)
  {
    allEmployees.push(employee);
  }

  getEmployee(id:number):Employee|undefined{
    return allEmployees.find(employee=>employee.employeeId===id);
  }

  updateEmployee(employee:Employee)
  {
    var updateEmployee:any = allEmployees.find(emp=>emp.employeeId===employee.employeeId);
    updateEmployee.firstname=employee.firstName;
    updateEmployee.lastname=employee.lastName;
    updateEmployee.email=employee.email;
    updateEmployee.contactNumber=employee.contactNumber;
  }

  deleteEmployee(employee:Employee)
  {
    const index: number = allEmployees.indexOf(employee);
    if (index !== -1) {
      allEmployees.splice(index, 1);
    }
    console.log(allEmployees);
  }

}
