import {Request, Response} from 'express';
import connection from "../database/connection";

export const usersManager = (req: Request, res: Response) => {
        const params = req.params;
        switch (params.api) {
            case 'all':
                getUsers(req, res);
                break;
            case 'password':
                setPassword(req, res);
                break;
            default:
                res.send('Api ' + params.api + ' does not exist!');
                break;
        }
}

const getUsers = async (req: Request, res: Response) => {
    try {
        connection.query('SELECT * FROM users', function (err: any, results: any, fields: any) {
            const user = results
            res.json(user || {})
        });

    } catch (e) {
        console.error({method: 'getUsers', details: e})
        res.status(400).send(e);
    }
}

const setPassword = async (req: Request, res: Response) => {
    let query = 'UPDATE users SET password = "newPassword" WHERE email = ?';
    const data = req.body;
    var post = {email: data.email};
    
    connection.query(query, post.email, function(err: any, rows: any, fields: any) {
        if (!err)
            console.log('The solution is: ', rows);
        else
            console.log('Error while performing Query.', err);
    });
}