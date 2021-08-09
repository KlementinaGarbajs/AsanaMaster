import {Request, Response} from 'express';
import connection from "../database/connection";

export const imagesManager = (req: Request, res: Response) => {
    const params = req.params;

    switch (params.api) {
        case 'all':
            getImages(req, res);
            break;
        case 'upload':
            saveImage(req, res);
            break;
        default:
            res.send('Api ' + params.api + ' does not exist!');
            break;
    }
}

const saveImage = async (req: Request, res: Response) => {
    const data = req.body;
    var post = {url: data.url, user_id: data.user_id};

    connection.query("INSERT INTO images SET ?", post, function(err: any, rows: any) {
        if (!err){
            console.log("kuku");
            console.log('The solution is: ', rows);
        } else {
            console.log("lulu");
            console.log('Error while performing Query.', err);
        }
    });
}

const getImages = async (req: Request, res: Response) => {
    try {
        connection.query('SELECT * FROM images WHERE user_id = 6', function (err: any, results: any) {
            const image = results
            res.json(image || {})
        });

    } catch (e) {
        console.error({method: 'getImages', details: e})
        res.status(400).send(e);
    }
}
