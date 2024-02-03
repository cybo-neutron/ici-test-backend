// import mongoose from "mongoose";


// class AuthController {


//     public async register(name: string, email: string, password: string) {
//         const findUser = await prisma.user.findFirst({
//             where: {
//                 email: email,
//             }
//         });

//         if (findUser) {
//             throw new Error("User already exist!!");
//         }

//         const createUser = await prisma.user.create({
//             data: {
//                 name,
//                 email,
//                 password
//             }
//         });

//         if (createUser) {
//             return {
//                 message: 'User Created successfully!!'
//             }
//         }
//     }

//     public async login(email: string, password: string) {

//     }


// }

// export default AuthController;
