import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import {schema} from '@ioc:Adonis/Core/Validator'
import Department from 'App/Models/Department'


export default class DepartmentsController {
    public async insert({request}:HttpContextContract)
    {
        
        const insertSchema = schema.create({
            
            deptId: schema.number(),
            deptName: schema.string(),
        
        })
        const payload = await request.validate({schema: insertSchema})
        const employee = await Department.create({
            deptId:payload.deptId,
            deptName:payload.deptName,
            })
        return employee;
        
    }

    public async display({}:HttpContextContract)
    {
        const display = await Department.all()
        return display;
    }

    public async update({request,params}:HttpContextContract)
    {
        try{
        const updateSchema = schema.create({
            
            deptId: schema.number(),
            deptName: schema.string(),

        })
        const payload = await request.validate({schema: updateSchema})
        const employee = await Department.findOrFail(params.id)
            employee.deptId = payload.deptId,
            employee.deptName = payload.deptName,
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
        const employee = await Department.findBy('id',params.id)
        if(employee == null){
            return "No ID Found!!"
        }else{
        await employee.delete()
        return "Deleted Successfully"
        }
    }

}
