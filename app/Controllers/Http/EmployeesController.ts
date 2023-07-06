import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Employee from 'App/Models/Employee'
import Database from '@ioc:Adonis/Lucid/Database'

import {schema} from '@ioc:Adonis/Core/Validator'

export default class EmployeesController {

    public async insert({request}:HttpContextContract)
    {
        
        const insertSchema = schema.create({
            
            empId: schema.number(),
            empName: schema.string(),
            deptId: schema.number(),
        })
        const payload = await request.validate({schema: insertSchema})
        const employee = await Employee.create({
            empId:payload.empId,
            empName:payload.empName,
            deptId:payload.deptId})
        return employee;
        
    }

    public async display({}:HttpContextContract)
    {
        const display = await Employee.all()
        return display;
    }

    public async update({request,params}:HttpContextContract)
    {
        try{
        const updateSchema = schema.create({
            
            empId: schema.number(),
            empName: schema.string(),
            deptId: schema.number(),

        })
        const payload = await request.validate({schema: updateSchema})
        const employee = await Employee.findOrFail(params.id)
        employee.empId = payload.empId,
        employee.empName = payload.empName,
        employee.deptId = payload.deptId
        await employee.save()
        return "Updated successfully"
    }
    catch(err)
    {
        return " Updation Failed"
    }
    }
 
    public async delete({params}:HttpContextContract)
    {
        const employee = await Employee.findBy('id',params.id)
        if(employee == null){
            return "No ID Found!!"
        }else{
        await employee.delete()
        return "Deleted Successfully"
        }
    }

    public async join(){
        const users = await Database.from('employees')
                                    .join('departments', 'employees.dept_id','=', 'departments.dept_id')
                                    .select('employees.emp_id','employees.emp_name','employees.dept_id','departments.dept_name')
                                    .orderBy('dept_id', 'asc')
                                    .exec();

        return users
    }

    public async joinall(){
        const Database = Employee.query()
        .join('departments','employees.dept_id','=','departments.dept_id')
        const result = (await Database).map((obj)=>
        {
            return{
                emp_id: obj.$attributes.id,
                emp_name: obj.$attributes.emp_name,
                dept_id: obj.$attributes.dept_id,
                dept_name: obj.$extras.dept_name
            }
        })

        return result
    }

}
