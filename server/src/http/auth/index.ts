import {Request, Response, NextFunction} from 'express';
import {NotFound, Unauthorized} from 'http-errors'
import jwt, {JwtPayload} from 'jsonwebtoken';
import {IDecodedToken, IUser} from "../../types";
import {User} from "../../entity/User";

export const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            throw new Unauthorized('Auth token não recebido');
        }

        // @ts-ignore
        const jwtDecoded: IDecodedToken = jwt.verify(token, `${process.env.HASH_KEY}`);
        const currentUser: IUser | null = await User.findOneBy({
            id: jwtDecoded.id,
        });

        if (!currentUser) {
            throw new NotFound('not-found')
        }

        res.send({user: currentUser});
    } catch (err: any) {
        if (err.message == "jwt expired") {
            res.send({err: "Token expirado"})
        } else if (err.message == "not-found") {
            res.send({err: 'User não encontrado'})
        } else if (err.message) {
            res.send({err: err.message})
        } else {
            res.send({err: 'User não pode ser autenticado'})
        }
    }
}

