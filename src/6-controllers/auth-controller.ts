import express, { Request, Response, NextFunction } from "express";
import verifyLoggedIn from "../3-middleware/verify-logged-in";
import CredentialsModel from "../4-models/credentials-model";
import UserModel from "../4-models/user-model";
import authLogic from "../5-logic/auth-logic";

// Create router object to be exported at the end of the file.
const router = express.Router();

// POST route handler used for registering a new account with username and password using authLogic.register() function.
router.post("/auth/register", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const user = new UserModel(request.body); // Create an instance of UserModel passing request body as argument
        const token = await authLogic.register(user); // Invoke register() method on authLogic passing the user instance as an argument which returns an Auth Token
        response.status(201).json(token); // Send status code 201 indicating that resource was created successfully along with token returned by register() method          

    }
    catch (err: any) { // Catch possible errors thrown during execution
        next(err);
    }
});

// POST route handler used for login an existing user with username and password using authLogic.login() function.
router.post("/auth/login", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const credentials = new CredentialsModel(request.body); //Take credentials from the request body (username & password)
        const token = await authLogic.login(credentials);//Passes credentials into the login method of authLogic,and returns an authentication token if login was successful
        response.json(token);//Sending back token within response object
    }
    catch (err: any) {// Catch possible errors thrown during execution
        next(err);
    }
});

router.get("/users/:id", [verifyLoggedIn], async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id = +request.params.id;// Get user id from the URL path parameter 
        const user = await authLogic.getOneUser(id);//Brings the user corresponding to the user id
        response.json(user);//Sending back user within response object
    }
    catch (err: any) {// Catch possible errors thrown during execution
        next(err);
    }
});


export default router;
