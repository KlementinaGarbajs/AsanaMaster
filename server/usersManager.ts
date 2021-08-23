import {Request, Response} from 'express';
import connection from "../database/connection";

export const usersManager = (req: Request, res: Response) => {
        const params = req.params;

        switch (params.api) {
            case 'all':
                getUsers(req, res);
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
