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
            case 'delete':
                deleteNote(req, res);
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
    var post = {name: data.name, description: data.description};

    connection.query("INSERT INTO notes SET ?", post, function(err: any, rows: any, fields: any) {
        if (!err)
            console.log('The solution is: ', rows);
        else
            console.log('Error while performing Query.', err);
    });
}

const deleteNote = async (req: Request, res: Response) => {
    let query = "DELETE FROM notes WHERE id = ?";
    const data = req.body;
    var post = {id: data.id};
      
    connection.query(query, post.id, (err: any, rows: { affectedRows: string; }) => {
        if(err) throw err;
  
        console.log('Number of rows deleted = ' + rows.affectedRows);
    });
}
