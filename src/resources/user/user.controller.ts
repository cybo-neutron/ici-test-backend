import { NextFunction, Request, Response, Router } from 'express';
// import { registerUser } from './user.service';
import { Controller } from '@app/utils/interfacees/controller.interface';
import UserService from './user.service';
import HTTPException from '@app/utils/exceptions/http.exception';

class UserController implements Controller {
    public path = '/auth';
    public router = Router();
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
        this.initializeRoutes();
    }

    public initializeRoutes() {
        this.router.post(`${this.path}/register`,/* validationMiddleware(validate.register), */this.register);

        this.router.post(`${this.path}/login`, /*validationMiddleware(validate.login), */this.login);


        //test
        this.router.get(`${this.path}`, (req, res) => {
            res.send("hello")
        })

    }

    private register = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { name, email, password } = req.body;
            const response = await this.userService.register(name, email, password);
            res.status(201).json(response);
        } catch (err: any) {
            next(new HTTPException(400, err.message));
        }
    }

    private login = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        console.log("login")
        try {
            const { email, password } = req.body;
            const response = await this.userService.login(email, password);
            res.status(201).json(response);
        } catch (err: any) {
            next(new HTTPException(400, err.message));
        }
    }
}

export default UserController;