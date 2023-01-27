import RoleModel from "./role-model";

class UserModel {
    public userId: number;
    public firstName: string;
    public lastName: string;
    public username: string; 
    public password: string;
    public role: RoleModel;

    public static firstNameValidation = {
        required: { value: true, message: "Missing firstName" },
        minLength: { value: 2, message: "firstName too short" },
        maxLength: { value: 20, message: "firstName too long" }
    }
    public static lastNameValidation = {
        required: { value: true, message: "Missing lastName" },
        minLength: { value: 2, message: "lastName too short" },
        maxLength: { value: 20, message: "lastName too long" }
    }
    public static usernameValidation = {
        required: { value: true, message: "Missing username" },
        minLength: { value: 2, message: "username too short" },
        maxLength: { value: 20, message: "username too long" }
    }
    public static passwordValidation = {
        required: { value: true, message: "Missing password" },
        minLength: { value: 2, message: "password too short" },
        maxLength: { value: 150, message: "password too long" }
    }

}

export default UserModel;