import { Express } from 'express'
import { userRoutes } from './user.routes'
import { dvdRoutes } from './dvd.routes'
import { cartRoutes } from './cart.routes'

export const appRoutes = (app: Express) => {

    app.use('/users', userRoutes())
    app.use('/dvds', dvdRoutes())
    app.use('/cart', cartRoutes())
}