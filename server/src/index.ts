import * as Express from 'express';
import api from './api';

const PORT = 3000;
const app = Express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use('/api', api);

app.listen(PORT, () => {
    console.log(`start server port ${PORT}!!`);
});
