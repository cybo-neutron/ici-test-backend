import HTTPException from '@app/utils/exceptions/http.exception';
import { Token } from '@app/utils/interfacees/token.interface';
import jwt from 'jsonwebtoken';
import { Schema } from 'mongoose';


export type TokenPayload = {
    email: string,
    password: string,
    user_id: Schema.Types.ObjectId
}


export class TokenService {

    secret: string;

    constructor() {
        this.secret = process.env.JWT_SECRET || 'secret';
    }

    createToken(payload: TokenPayload): string {
        const token = jwt.sign(payload, this.secret as jwt.Secret, { expiresIn: '1d' });
        return token;
    }

    verifyToken(token: string) {

        try {
            const decoded = jwt.verify(token, this.secret);
            return decoded as Token;
        } catch (error) {
            throw new HTTPException(400, "Invalid token");
        }
    }


}