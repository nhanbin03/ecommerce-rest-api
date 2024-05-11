const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const { PORT } = require('./config');
const cookieParser = require('cookie-parser');

const router = require('./routes');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true,
}));
app.use(cookieParser());

router.loader(app);

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}.`);
});