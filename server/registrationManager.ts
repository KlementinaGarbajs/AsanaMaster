import {Request, Response} from 'express';
import connection from "../database/connection";

export const registrationManager = (req: Request, res: Response) => {
        saveNewUser(req, res);
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
