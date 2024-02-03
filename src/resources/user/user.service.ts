import { Error, ObjectId, Schema } from "mongoose";
import { UserModel, UserSchema } from "./user.model";
import HTTPException from "@app/utils/exceptions/http.exception";
import { TokenPayload, TokenService } from "@app/services/token_service";

class UserService {

    private user;
    private tokenService;

    constructor() {
        this.user = UserModel;
        this.tokenService = new TokenService();
    }

    public async register(name: string, email: string, password: string) {
        try {
            const findUser = await this.user.findOne({
                where: {
                    email: email
                }
            });

            if (findUser) {
                throw new HTTPException(400, "User already exist");
            }

            //Create new user
            const createdUser = await this.user.create({
                name,
                email,
                password
            });


            //create token
            const payload: TokenPayload = {
                email: createdUser.email,
                password: createdUser.password,
                user_id: createdUser._id as unknown as ObjectId
            }

            const accessToken = this.tokenService.createToken(payload);

            return { accessToken };

        } catch (err: any) {
            if (err.message)
                throw new Error(err.message);
            else
                throw new HTTPException(err.status, "Some error occured")
        }
    }


    public async login(email: string, password: string) {

        try {

            const user = await this.user.findOne({
                email
            });

            if (!user) {
                throw new HTTPException(400, "Wrong Credentials");
            }

            if (await user.isValidPassword(password)) {

                const payload: TokenPayload = {
                    email: user.email,
                    password: user.password,
                    user_id: user._id as unknown as ObjectId
                }

                const accessToken = this.tokenService.createToken(payload);

                return { token: accessToken }
            } else {
                throw new HTTPException(400, "Wrong Credentials");
            }

        } catch (err: any) {
            throw new HTTPException(err.status, err.message);
        }

    }
}

export default UserService;