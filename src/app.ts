import * as dotenv from 'dotenv';
if (isDev()) dotenv.config();

import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as path from 'path';
import { Api } from './api/api';

if (isDev()) {
    console.log('Starting server in dev mode.');
}
else {
    console.log('Starting server in prod mode.');
}

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', process.env.FRONT_END_ORIGIN);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
});
// Liveness
//POST Status = up upon routing to api/status
const api = new Api(); // create new api
app.use('/api', api.getRouter()); // use current api on route /api

// upon a get request to the route /api/status, return the status of the server = "up"
app.get( "/api/status", ( req: any, res ) => {
    res.json({status: "up"});
 });

// Create Account
app.post( "/api/auth/createAccount", ( req: any, res ) => {
    // if all fields have been entered
    if (fullName != null && email !=null && password != null)
        req.json({status_code: "201", creation_status: "Creation Sucessful"});
    
    // if either fields have not been entered
    if (fullName != null || email !=null || password != null)
        req.json({status_code: "400", creation_status: "Creation Unsucessful"});

    // if email is already in use
    if (femail.isAlreadyStoredInDatabase() == true)
        req.json({status_code: "500", creation_status: "Creation Unsucessful"});
});






if (isDev()) {
    app.use(express.static(path.resolve(__dirname, '../frontend')));
    app.get('/*', (req, res) => 
        res.sendFile(path.resolve(__dirname, '../frontend/index.html'))
    );
}
else {
    app.use(express.static('frontend'));
    app.get('/*', (req, res) => res.sendFile('index.html'));
}

app.listen(process.env.PORT || 8080, () => {
    console.log(`Server started, listening on port ${process.env.PORT || 8080}.`);
});

function isDev() {
    return process.env.NODE_ENV === 'development';
}