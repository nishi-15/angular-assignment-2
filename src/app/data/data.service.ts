import { Injectable } from '@angular/core';
import { Employee } from './employee';
import { allEmployees } from './employeeList';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  /** getAllEmployees() method is used to get list of all employees */
  public getAllEmployees() : Employee[] {
    return allEmployees;
  }

  /** addNewEmployee(employee:Employee) method is used to add new employee to employee-list
   * It will push employee to employee-list and remains in the list till page reloads or refreshes
   */
  public addNewEmployee(employee:Employee) : void {
    allEmployees.push(employee);
  }

  /** getEmployee(id:number) method is used to get employee details for the given id */
  public getEmployee(id:number) : Employee|undefined {
    return allEmployees.find(employee => employee.employeeId === id);
  }

  /** updateEmployee(employee:Employee) method is used to update existing employee to employee-list
   * It will update employee from employee-list and remains updated in the list till page reloads or refreshes
   */
  public updateEmployee(employee:Employee) : void {
    let updateEmployee:any = allEmployees.find( emp => emp.employeeId === employee.employeeId);
    updateEmployee.firstname = employee.firstName;
    updateEmployee.lastname = employee.lastName;
    updateEmployee.email = employee.email;
    updateEmployee.contactNumber = employee.contactNumber;
  }

  /** deleteEmployee(employee:Employee) method is used to delete existing employee from employee-list
   * It will delete employee from employee-list and remains deleted from the list till page reloads or refreshes
   */
  public deleteEmployee(employee:Employee) : void {
    const index: number = allEmployees.indexOf(employee);
    if (index !== -1) {
      allEmployees.splice(index, 1);
    }
  }

}
