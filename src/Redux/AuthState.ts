import { createStore } from "redux";
import jwtDecode from "jwt-decode";
import UserModel from "../Models/UserModel";

// 1. Global State - the global data:
export class AuthState {

    public token: string = null;//Token variable of type 'string' to store the authentication token when it is retrieved from the server.
    public user: UserModel = null;//User variable of type 'UserModel' which will contain data about users in order to identify them within the application.

    public constructor() {
        this.token = sessionStorage.getItem("token");//Assigns the authentication token stored in session storage (if one exists).
        if (this.token) {//Checks whether there is a token found in session storage before proceeding further.
            const jwtPayload = jwtDecode(this.token);//Decodes any existing JWT payloads into JavaScript objects using the imported jwtDecode function.
            this.user = (jwtPayload as any).user;//Assigns relevant pieces of data obtained from decoding JWT payloads containing user related information.
        }
    }
}

// 2. Action Type - a list of operations we can perform on the data:
export enum AuthActionType {//Defines an enumeration containing strings representing different types of authentication actions available through redux action creators.
    Register = "Register",
    Login = "Login",
    Logout = "Logout",
    Update = "Update"
}

// 3. Action - A single object which dispatch sends to Redux for some change:
export interface AuthAction {//Declares an interface describing what properties must exist on every auth action object created through Redux action creators.
    type: AuthActionType;
    payload?: any;
}

// 4. Reducer - a function which will be invoked when calling dispatch to perform the operation:
export function authReducer(currentState = new AuthState(), action: AuthAction): AuthState {//Describes how state should be updated based on incoming actions passed into reducers.

    const newState = { ...currentState };//Creates a new state object by spreading the existing one with updated information.
 
    switch (action.type) {//Checks what action was passed in and proceeds accordingly to each case section declared within it.

        case AuthActionType.Register://Handles registration requests by assigning authentication token payloads to session storage variables.
        case AuthActionType.Login://Handles login requests by decoding JWT token payloads into JavaScript objects and then subsequently setting them as state variables so they can be accessed elsewhere if needed.
            newState.token = action.payload;
            const container: { user: UserModel } = jwtDecode(newState.token); 
            newState.user = container.user;
            sessionStorage.setItem("token", newState.token);
            break;

        case AuthActionType.Logout://Takes care of log out requests by resetting all relevant session related variables back to their default values.
            newState.token = null;
            newState.user = null;
            sessionStorage.removeItem("token");
            break;
    }

    return newState;//Returns created/updated state data at the end of each switch statement block.
}

// 5. Store - manager object from Redux library which handles the entire operation:
export const authStore = createStore(authReducer);//Creates and stores our global application state management object, using Redux’s createStore method.