const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const { PORT } = require('./config');
const cookieParser = require('cookie-parser');

const authRouter = require('./routes/authRoute');
const productRouter = require('./routes/productRoute');
const cartRouter = require('./routes/cartRoute');
const orderRouter = require('./routes/orderRoute');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true,
}));
app.use(cookieParser());

app.use('/', authRouter);
app.use('/products', productRouter);
app.use('/carts', cartRouter);
app.use('/orders', orderRouter);

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}.`);
});