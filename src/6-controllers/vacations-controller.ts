import express, { Request, Response, NextFunction } from "express";
import path from "path";
import verifyAdmin from "../3-middleware/verify-admin";
import VacationModel from "../4-models/vacation-model";
import vacationsLogic from "../5-logic/vacations-logic";

// Create router object to be exported at the end of the file.
const router = express.Router(); 

//Get all vacations
router.get("/vacations/:userId([0-9]+)", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const userId = +request.params.userId;
        const vacations = await vacationsLogic.getAllVacations(userId);
        response.json(vacations);
    }
    catch (err: any) {
        next(err); 
    }
});

// Get name and amount of followed vacations:
router.get("/followed-vacation", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const followedVacations = await vacationsLogic.getFollowNameAmount();
        response.json(followedVacations);
    }
    catch (err: any) {
        next(err); 
    }
});

//Add one vacation
router.post("/vacations", verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {
        // Take uploaded file, set it to the body:
        request.body.image = request.files?.image;

        const vacation = new VacationModel(request.body);
        
        const addedVacation = await vacationsLogic.addVacation(vacation);
        response.status(201).json(addedVacation);
    }
    catch (err: any) {
        next(err); 
    }
});

//Update vacation
router.put("/vacations/:id([0-9]+)", verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id = +request.params.id;
        request.body.id = id;
        // Take uploaded file, set it to the body:
        request.body.image = request.files?.image;
        const vacation = new VacationModel(request.body);
        const updatedVacation = await vacationsLogic.updateVacation(vacation);
        response.json(updatedVacation);
    }
    catch (err: any) {
        next(err); 
    }
});

//Delete vacation
router.delete("/vacations/:id([0-9]+)", verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id = +request.params.id;
        await vacationsLogic.deleteVacation(id);
        response.sendStatus(204);
    }
    catch (err: any) {
        next(err); 
    }
});

//Get one vacation
router.get("/one-vacation/:uuId", verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const vacationUuId = request.params.uuId;
        console.log(vacationUuId);
        
        const vacation = await vacationsLogic.getOneVacation(vacationUuId);
        response.json(vacation);    
    }
    catch (err: any) {
        next(err); 
    }
});

//Get vacation's image
router.get("/vacations/images/:imageName", async (request: Request, response: Response, next: NextFunction) => {
    try {
        // __dirname contains the full path to our current folder - controllers folder
        const imageName = request.params.imageName;
        const absolutePath = path.join(__dirname, "..", "1-assets", "images", imageName);
        response.sendFile(absolutePath);
    }
    catch (err: any) {
        next(err); 
    }
});

//Update follow vacation
router.put("/followed-vacation/:vacationId([0-9]+)/:userId([0-9]+)", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const vacationId = +request.params.vacationId; 
        const userId = +request.params.userId; 
        await vacationsLogic.followVacation(vacationId,userId);
    }
    catch (err: any) {
        next(err); 
    }
});

//Update un-follow vacation
router.put("/un-followed-vacation/:vacationId([0-9]+)/:userId([0-9]+)", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const vacationId = +request.params.vacationId; 
        const userId = +request.params.userId;         
        await vacationsLogic.unFollowVacation(vacationId,userId);
    }
    catch (err: any) {
        next(err); 
    }
});

export default router;


