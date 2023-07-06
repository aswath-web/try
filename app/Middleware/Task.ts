import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class Task {
  public async handle({request,response}: HttpContextContract, next: () => Promise<void>) {

    const appKey = request.header('app-key')
    if (appKey !== 'JrgjAHv7d1SPL3glwxVc0TJmUTkXA9We') {
      return response.status(401).json({ error: 'Invalid app key' });
    }

    // code for middleware goes here. ABOVE THE NEXT CALL
    await next()
  }
}

