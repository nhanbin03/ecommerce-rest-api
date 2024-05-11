const authRoute = require('./authRoute');
const productRoute = require('./productRoute');
const cartRoute = require('./cartRoute');
const orderRoute = require('./orderRoute');

module.exports = {
    loader: (app) => {
        app.use('/', authRoute);
        app.use('/products', productRoute);
        app.use('/carts', cartRoute);
        app.use('/orders', orderRoute);
    }
}