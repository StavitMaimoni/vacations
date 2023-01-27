import { OkPacket } from "mysql";
import dal from "../2-utils/dal";
import cyber from "../2-utils/cyber";
import { ResourceNotFoundErrorModel, UnauthorizedErrorModel, ValidationErrorModel } from "../4-models/error-models";
import UserModel from "../4-models/user-model";
import CredentialsModel from "../4-models/credentials-model";
import RoleModel from "../4-models/role-model";

async function register(user: UserModel): Promise<string> {
    const errors = user.validate();
    if (errors) throw new ValidationErrorModel(errors);
    // Check if userName taken: 
    // Checks if a username already exists in the users table of the database. 
    const isTaken = `
    SELECT userName
    FROM users
    WHERE userName = ?
`;
    const userNames = await dal.execute(isTaken, [user.username]);
    const userName = userNames[0];
    if (userName) throw new ValidationErrorModel(`Sorry the username ${user.username} is already taken, please try another username`);

    //Initializes the user role by default.
    user.role = RoleModel.User;
    // Hash password: 
    // Hashes the entered password using cyber library's hash method so it can be stored securely in the database.  
    user.password = cyber.hash(user.password);

    //Inserts the registered user into the table of users in the database.
    const sql = `
    INSERT INTO users VALUES(DEFAULT,?,?,?,?,?)`;

    const info: OkPacket = await dal.execute(sql, [user.firstName, user.lastName, user.username, user.password, user.role]);
    user.userId = info.insertId;

    // Create new token: 
    // Generates a JWT token to use as authentication when accessing protected resources on this server.
    const token = cyber.getNewToken(user);
    return token;
}

async function login(credentials: CredentialsModel): Promise<string> {

    //Verifies if the user's credentials are correct. If the username or password are incorrect, an error message is thrown.
    const error = credentials.validate();
    if (error) throw new ValidationErrorModel(error);

    // Hash password:
    credentials.password = cyber.hash(credentials.password);

    //Gets all the details of the user from the database.
    const sql = `
    SELECT * FROM users
    WHERE username = ? AND password = ?`;

    const users = await dal.execute(sql, [credentials.username, credentials.password]);

    //If the user is not found in the database an error message is thrown.
    if (users.length === 0) throw new UnauthorizedErrorModel("Incorrect username or password");

    const user = users[0];
    // Create new token: 
    // Generates a JWT token to use as authentication when accessing protected resources on this server.
    const token = cyber.getNewToken(user);
    return token;
}

// Get one user: 
// Gets information from one specific record in users table of database based on provided id number and returns model with that data.
async function getOneUser(id: number): Promise<UserModel> {
    const sql = `SELECT * FROM users WHERE id = ?`;
    const users = await dal.execute(sql, [id]);
    if (users.length === 0) throw new ResourceNotFoundErrorModel(id);
    const user = users[0];
    return user;
}

export default {
    register,
    login,
    getOneUser
}