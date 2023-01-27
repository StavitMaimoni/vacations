import Joi from "joi";
import { UploadedFile } from "express-fileupload";

class VacationModel {

    public id: number;
    public uuId: string;
    public destination: string;
    public description: string;
    public price: number;
    public checkIn: string;
    public checkOut: string;
    public image: UploadedFile; // The file uploaded by the frontend.
    public imageName: string; // The name of the image.
    public isFollow: number;
    public followersCount: number;


    public constructor(vacation: VacationModel) { // Copy Constructor
        this.id = vacation.id;
        this.uuId = vacation.uuId;
        this.destination = vacation.destination;
        this.description = vacation.description;
        this.checkIn = vacation.checkIn;
        this.checkOut = vacation.checkOut;
        this.price = vacation.price;
        this.image = vacation.image;
        this.imageName = vacation.imageName;
        this.isFollow = vacation.isFollow;
        this.followersCount = vacation.followersCount;
    }

    // Creating a validation schema object once for any VacationModel: 
    public static validationSchema = Joi.object({
        id: Joi.number().optional().positive().integer(),
        uuId: Joi.string().optional(),
        destination: Joi.string().required().min(2).max(100),
        description: Joi.string().required().min(40).max(60),
        price: Joi.number().required().min(0),
        image: Joi.object().optional(),
        imageName: Joi.string().optional(),
        checkIn: Joi.string().required(),
        checkOut: Joi.string().required(),
        isFollow: Joi.number().optional(),
        followersCount: Joi.number().optional()
    });

    // Validate current object (return undefined if no error, or message if there is an error): 
    public validate(): string {
        // const result = VacationModel.validationSchema.validate(this, { abortEarly: false });
        const result = VacationModel.validationSchema.validate(this);
        return result.error?.message;
    }
}

export default VacationModel;