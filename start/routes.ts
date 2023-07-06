import Route from '@ioc:Adonis/Core/Route'
Route.get('displayEmployee','EmployeesController.display')
Route.group(() =>
{
Route.post('insertEmployee','EmployeesController.insert')
Route.patch('updateEmployee/:id','EmployeesController.update')
Route.get('deleteEmployee/:id','EmployeesController.delete')
Route.get('joinEmployee','EmployeesController.join')
Route.get('joinallEmployee','EmployeesController.joinall')
Route.post('insertDepartment','DepartmentsController.insert')
Route.get('displayDepartment','DepartmentsController.display')
Route.patch('updateDepartment/:id','DepartmentsController.update')
Route.get('deleteDepartment/:id','DepartmentsController.delete')
}).middleware('task')