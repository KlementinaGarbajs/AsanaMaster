import {Errback, NextFunction, Request, Response} from 'express';
import {asanaManager} from './asanaManager';
import {notesManager} from './notesManager';

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
var cors = require('cors')

const port = process.env.PORT || 8080;

app.listen(port);

console.log(`Server listening on ${port}`);

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => res.status(301).redirect('/api'));
app.get('/api', (req: Request, res: Response) =>res.status(200).send({
    message: 'Welcome to Express Api',
}),);

app.all('/asanas/:api', asanaManager);
app.all('/notes/:api', notesManager);

// Throw error when user enters wrong Endpoints
app.use((req: Request, res: Response) => res.status(404).send({error: 'Oops! Endpoint not found, Please Check that you are entering the right thing!',}));
app.use((err: Errback, req: Request, res: Response, next: NextFunction) => {res.status(500).send({
    error: 'Invalid Request! Please Check that you are entering the right thing!',
});});
