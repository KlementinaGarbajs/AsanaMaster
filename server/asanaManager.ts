import {Request, Response} from 'express';
import connection from "../database/connection";

export const asanaManager = (req: Request, res: Response) => {
        const params = req.params;

        switch (params.api) {
            case 'all':
                getAsanas(req, res);
                break;
            default:
                res.send('Api ' + params.api + ' does not exist!');
                break;
        }
}

const getAsanas = async(req: Request, res: Response) => {
    try {
        console.log('getAsanas start');

        const asanas = connection.query('SELECT * FROM asanas', function (err: any, results: any, fields: any) {
            console.log("results");
            console.log(fields);
        });
         res.status(200).json({ asanas });

    } catch (e) {
        console.error({method: 'getAsanas', details: e})
        res.status(400).send(e);
    }
}
