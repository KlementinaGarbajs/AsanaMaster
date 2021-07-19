import {Request, Response} from 'express';
import connection from "../database/connection";

export const asanaManager = (req: Request, res: Response) => {
        const params = req.params;

        switch (params.api) {
            case 'all':
                getAsanas(req, res);
                break;
            case 'ratings':
                getRatings(req, res);
                break;
            case 'ratingsSaveSplits':
                saveRatingSplits(req, res);
                break;
            case 'ratingsSaveInversions':
                saveRatingInversions(req, res);
                break;
            case 'ratingsSaveBends':
                saveRatingBends(req, res);
                break;
            default:
                res.send('Api ' + params.api + ' does not exist!');
                break;
        }
}

const getAsanas = async (req: Request, res: Response) => {
    try {
        connection.query('SELECT * FROM asanas', function (err: any, results: any, fields: any) {
            const asana = results
            res.json(asana || {})
        });

    } catch (e) {
        console.error({method: 'getAsanas', details: e})
        res.status(400).send(e);
    }
}

const getRatings = async (req: Request, res: Response) => {
    try {
        connection.query('SELECT * FROM goals', function (err: any, results: any, fields: any) {
            const rating = results
            res.json(rating || {})
        });

    } catch (e) {
        console.error({method: 'getRatings', details: e})
        res.status(400).send(e);
    }
}

const saveRatingSplits = async (req: Request, res: Response) => {
    const data = req.body;
    var post = {rating: data.rating};
    let query = 'UPDATE goals SET rating = ? WHERE name = "splits"';

    connection.query(query, post.rating, function(err: any, rows: any, fields: any) {
        if (!err)
            console.log('The solution is: ', rows);
        else
            console.log('Error while performing Query.', err);
    });
}

const saveRatingInversions = async (req: Request, res: Response) => {
    const data = req.body;
    var post = {rating: data.rating};
    let query = 'UPDATE goals SET rating = ? WHERE name = "inversions"';

    connection.query(query, post.rating, function(err: any, rows: any, fields: any) {
        if (!err)
            console.log('The solution is: ', rows);
        else
            console.log('Error while performing Query.', err);
    });
}

const saveRatingBends = async (req: Request, res: Response) => {
    const data = req.body;
    var post = {rating: data.rating};
    let query = 'UPDATE goals SET rating = ? WHERE name = "backbends"';

    connection.query(query, post.rating, function(err: any, rows: any, fields: any) {
        if (!err)
            console.log('The solution is: ', rows);
        else
            console.log('Error while performing Query.', err);
    });
}