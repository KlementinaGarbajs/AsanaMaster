import {Request, Response} from 'express';
import connection from "../database/connection";

export const registrationManager = (req: Request, res: Response) => {
    const params = req.params;
    
    switch (params.api) {
        case 'register':
            saveNewUser(req, res);
            break;
        case 'setUser':
            setUser(req, res);
            break;
        case 'getID':
            getID(req, res);
            break;
        default:
            res.send('Api ' + params.api + ' does not exist!');
            break;
    }
}

const saveNewUser = async (req: Request, res: Response) => {
    const data = req.body;
    var post = {name: data.name, email: data.email, password: data.password, first_login: data.first_login};

    connection.query("INSERT INTO users SET ?", post, function(err: any, rows: any) {
        if (!err)
            console.log('The solution is: ', rows);
        else
            console.log('Error while performing Query.', err);
    });
}

const setUser = async (req: Request, res: Response) => {
    const data = req.body;
    var post = {id: data.id};

    connection.query("UPDATE `currentUser` SET `id` = ?", post.id, function(err: any, rows: any) {
        if (!err)
            console.log('The solution is: ', rows);
        else
            console.log('Error while performing Query.', err);
    });
}

const getID = async (req: Request, res: Response) => {
    try {
        connection.query('SELECT * FROM currentUser', function (err: any, results: any) {
            const user = results
            res.json(user);
        });

    } catch (e) {
        console.error({method: 'getID', details: e})
        res.status(400).send(e);
    }
}