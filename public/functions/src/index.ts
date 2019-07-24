import * as functions from 'firebase-functions';
import * as Express from 'express';
const basicAuth = require('basic-auth-connect');

const app = Express();

app.all('/*', basicAuth((user: string, password: string) => (
    user === 'test' && password === 'test'
)));

app.use('/api-doc', Express.static(__dirname + '/static/api-doc/'));

app.use((req, res) => {
    res.sendFile(__dirname + '/static/404.html');
});

exports.app = functions.https.onRequest(app);