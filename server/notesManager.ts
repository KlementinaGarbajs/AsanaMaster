import {Request, Response} from 'express';
import connection from "../database/connection";

export const notesManager = (req: Request, res: Response) => {
        const params = req.params;

        switch (params.api) {
            case 'all':
                getNotes(req, res);
                break;
            case 'new':
                saveNewNote(req, res);
                break;
            default:
                res.send('Api ' + params.api + ' does not exist!');
                break;
        }
}

const getNotes = async (req: Request, res: Response) => {
    try {
        connection.query('SELECT * FROM notes', function (err: any, results: any, fields: any) {
            const note = results
            res.json(note || {})
        });

    } catch (e) {
        console.error({method: 'getNotes', details: e})
        res.status(400).send(e);
    }
}

const saveNewNote = async (req: Request, res: Response) => {
    const data = req.body;
    console.log("bleble", data);
    var post = {name: data.name, description: data.description, date: data.date, rate: data.rate};

    connection.query("INSERT INTO notes SET ?", post, function(err: any, rows: any, fields: any) {
        if (!err)
            console.log('The solution is: ', rows);
        else
            console.log('Error while performing Query.', err);
    });
}
