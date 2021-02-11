import express from 'express'
import routes from './functions/routes'
interface IApp {
  server: express.Express
  middleware: () => void
  router: () => void
}

class App implements IApp {
  server: express.Express

  constructor () {
    this.server = express()
    this.middleware()
    this.router()
  }

  middleware (): void {
    this.server.use(express.json())
  }

  router (): void {
    this.server.use(routes)
  }
}

export default new App().server
