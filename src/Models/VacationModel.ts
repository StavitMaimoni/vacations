class VacationModel {
    
    public id: number; 
    public uuId: string; 
    public destination: string;
    public description: string;
    public price: number;
    public checkIn: string;
    public checkOut: string;
    public imageName: string;
    public image: FileList;
    public isFollow: number;
    public followersCount: number;


    public static destinationValidation = {
        required: { value: true, message: "Missing destination" },
        minLength: { value: 3, message: "destination too short" },
        maxLength: { value: 100, message: "destination too long" }
    }
    public static descriptionValidation = {
        required: { value: true, message: "Missing description" },
        minLength: { value: 40, message: "description must be at least 40 letters" },
        maxLength: { value: 60, message: "description must be maximum 60 letters" }
    }

    public static priceValidation = {
        required: { value: true, message: "Missing price" },
        min: { value: 0, message: "Price can't be negative" }
    }
    public static checkInValidation = {
        required: { value: true, message: "Missing check-in" }
    }
    public static checkOutValidation = {
        required: { value: true, message: "Missing check-out" }
    }
    public static imageValidation = {
        required: { value: true, message: "Missing image" }
    }
}

export default VacationModel;
