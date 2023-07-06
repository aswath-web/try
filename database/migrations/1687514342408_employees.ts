import BaseSchema from '@ioc:Adonis/Lucid/Schema'
//import Department from 'App/Models/Department'

export default class extends BaseSchema {
  protected tableName = 'employees'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('emp_id')
      table.string('emp_name')
      table.integer('dept_id').references('dept_id').inTable('departments')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
