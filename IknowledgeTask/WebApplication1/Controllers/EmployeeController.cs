using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    [RoutePrefix("Api/Employee")]
    public class EmployeeController : ApiController
    {
        IknowledgeCompanyEntities objEntity = new IknowledgeCompanyEntities();
        [HttpGet]
        [Route("AllEmployeeDetails")]
        public IQueryable<Employee> GetEmployee()
        {
            try
            {
                return objEntity.Employees;
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpGet]
        [Route("GetEmployeeDetailsById/{employeeId}")]
        public IHttpActionResult GetEmployeeById(string employeeId)
        {
            Employee objEmp = new Employee();
            int ID = Convert.ToInt32(employeeId);
            try
            {
                objEmp = objEntity.Employees.Find(ID);
                if (objEmp == null)
                {
                    return NotFound();
                }

            }
            catch (Exception  )
            {
                throw;
            }

            return Ok(objEmp);
        }

        [HttpPost]
        [Route("InsertEmployeeDetails")]
        public IHttpActionResult PostEmployee(Employee data)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                objEntity.Employees.Add(data);
                objEntity.SaveChanges();
            }
            catch (Exception)
            {
                throw;
            }

            return Ok(data);
        }

        [HttpPut]
        [Route("UpdateEmployeeDetails")]
        public IHttpActionResult PutEmployeeMaster(Employee employee)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                Employee objEmp = new Employee();
                objEmp = objEntity.Employees.Find(employee.empId);
                if (objEmp != null)
                {
                    objEmp.empname = employee.empname;
                    objEmp.DOB = employee.DOB;
                    objEmp.Designation = employee.Designation;
                    objEmp.skills = employee.skills;
                   

                }
                int i = this.objEntity.SaveChanges();

            }
            catch (Exception)
            {
                throw;
            }
            return Ok(employee);
        }
        [HttpDelete]
        [Route("DeleteEmployeeDetails")]
        public IHttpActionResult DeleteEmployeeDelete(int id)
        {
            //int empId = Convert.ToInt32(id);  
            Employee employee = objEntity.Employees.Find(id);
            if (employee == null)
            {
                return NotFound();
            }

            objEntity.Employees.Remove(employee);
            objEntity.SaveChanges();

            return Ok(employee);
        }


    }
}
    