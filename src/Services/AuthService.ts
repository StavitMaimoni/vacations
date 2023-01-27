import axios from 'axios';
import { AuthActionType, authStore } from '../Redux/AuthState';
import UserModel from "../Models/UserModel";
import CredentialsModel from '../Models/CredentialsModel';
import appConfig from '../Utils/Config';

class AuthService {

    public async register(user: UserModel): Promise<void> {
        const response = await axios.post<string>(appConfig.registerUrl, user);//Axios library sends an HTTP post request that sends in the user data from app config's register URL and assigns it to the 'response' variable.
        const token = response.data;//Assigns the token we got from response's data attribute to a variable called 'token'.
        authStore.dispatch({ type: AuthActionType.Register, payload: token });//Dispatch an action-register,with payload set as 'token'.
    }

    public async login(credentials: CredentialsModel): Promise<void> {
        const response = await axios.post<string>(appConfig.loginUrl, credentials);//Axios library sends an HTTP post request sending in credentials from app config's loginURL and assigning it to response variable.
        const token = response.data;//Assigns the token we got from response's data attribute to a variable called 'token'.
        authStore.dispatch({ type: AuthActionType.Login, payload: token });//Dispatch an action-login,with payload set as 'token'.
    }

    public logout(): void {
        authStore.dispatch({ type: AuthActionType.Logout });//Dispatch an action-logout,without sending payload.
    }

    public isLoggedIn(): boolean {
        return authStore.getState().token !== null;//Check if user logged in, by checking if there is a token in the authStore.
    }

    public async getOneUser(id: number): Promise<UserModel> {
        const response = await axios.get<UserModel>(appConfig.usersUrl + id);//Axios library sends an HTTP get request in order to get user's details of userModel type.
        const user = response.data;//Assigns user's details we got from response's data attribute to a variable called 'user'.
        return user;//Returning the user variable.
    }

    public async updateUser(user: UserModel): Promise<void> {
        const response = await axios.patch<UserModel>(appConfig.usersUrl + user.userId, user);//Axios library sends an HTTP patch request that sends in the updated user data from app config's register URL and assigns it to the 'response' variable.
        const updatedUser = response.data;//Assigns user's data we got from response's data attribute to a variable called 'updatedUser'.
        authStore.dispatch({ type: AuthActionType.Update, payload: updatedUser });//Dispatch an action-update,with payload set as 'updatedUser'.
    }

}

const authService = new AuthService();//Creating a new instance of the AuthService class for authentication purposes.

export default authService;