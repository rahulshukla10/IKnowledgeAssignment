import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators,FormGroup,FormControl ,NgForm} from '@angular/forms';
import { Observable } from 'rxjs';
import { EmployeeService } from '../employee.service';
import { Employee } from '../employee';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  isShow = false;
  dataSaved = false;
  employeeForm: any;
  allEmployees: Observable<Employee[]>;
  employeeIdUpdate = null;
  massage = null;

  constructor(private formbulider: FormBuilder, private employeeService:EmployeeService) { }

  ngOnInit() {
    this.employeeForm = this.formbulider.group({
      EmpName: ['', [Validators.required]],
      DOB: ['', [Validators.required]],
      Designation: ['', [Validators.required]],
      Skills: ['', [Validators.required]]
    });
    this.loadAllEmployees();
    ;

  }
  loadAllEmployees() {
    this.allEmployees = this.employeeService.getAllEmployee();
  }
  onFormSubmit() {
    this.dataSaved = false;
    const employee = this.employeeForm.value;
    this.CreateEmployee(employee);
    this.employeeForm.reset();
  }
  loadEmployeeToEdit(employeeId: string) {
    this.employeeService.getEmployeeById(employeeId).subscribe(employee=> {
      this.massage = null;
      this.dataSaved = false;
      this.employeeIdUpdate = employee.empId;
      this.employeeForm.controls['EmpName'].setValue(employee.empname);
      this.employeeForm.controls['DOB'].setValue(employee.DOB);
      this.employeeForm.controls['Designation'].setValue(employee.Designation);
      this.employeeForm.controls['Skills'].setValue(employee.skills);
      this.isShow = true;

    });

  }
  CreateEmployee(employee: Employee) {
    if (this.employeeIdUpdate == null) {
      this.employeeService.createEmployee(employee).subscribe(
        () => {
          this.dataSaved = true;
          this.massage = 'Record saved Successfully';
          this.loadAllEmployees();
          this.employeeIdUpdate = null;
          this.employeeForm.reset();
        }
      );
    } else {
      employee.empId = this.employeeIdUpdate;
      this.employeeService.updateEmployee(employee).subscribe(() => {
        this.dataSaved = true;
        this.massage = 'Record Updated Successfully';
        this.loadAllEmployees();
        this.employeeIdUpdate = null;
        this.employeeForm.reset();
        this.isShow = false;
      });
    }
  }
  deleteEmployee(employeeId: string) {
    if (confirm("Are you sure you want to delete this ?")) {
    this.employeeService.deleteEmployeeById(employeeId).subscribe(() => {
      this.dataSaved = true;
      this.massage = 'Record Deleted Succefully';
      this.loadAllEmployees();
      this.employeeIdUpdate = null;
      this.employeeForm.reset();

    });
  }
}
  resetForm() {
    this.employeeForm.reset();
    this.massage = null;
    this.dataSaved = false;

  }



}
