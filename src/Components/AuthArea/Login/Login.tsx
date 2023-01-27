import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import CredentialsModel from "../../../Models/CredentialsModel";
import UserModel from "../../../Models/UserModel";
import { authStore } from "../../../Redux/AuthState";
import authService from "../../../Services/AuthService";
import notifyService from "../../../Services/NotifyService";
import "./Login.css";


function Login(): JSX.Element {
    const { register, handleSubmit } = useForm<CredentialsModel>();//UseForm hook is used to get the values from the form.
    const navigate = useNavigate();//UseNavigate hook is used for navigation between pages.
    const [user, setUser] = useState<UserModel>();//The current user is stored in a state variable which can be updated by subscription to authStore.

    useEffect(() => {//An effect subscribes to authStore and updates the state with the new user information when it changes.
        setUser(authStore.getState().user);
        const unsubscribe = authStore.subscribe(() => {
            setUser(authStore.getState().user);
        });
        return unsubscribe;
    }, []);


    async function send(credentials: CredentialsModel) {//Sends login credentials and navigates to Home page on success or displays an error message otherwise.
        try {
            await authService.login(credentials);
            notifyService.success(`Welcome Back!`);
            navigate("/home");
        }
        catch (err: any) {
            notifyService.error(err);
        }
    }

    return (
        <div className="Login">

            <form onSubmit={handleSubmit(send)}>
                <h2>Login</h2>

                <label>Username: </label>
                <input type="text" {...register("username")} />

                <label>Password: </label>
                <input type="password" {...register("password")} />

                <button className="btn" onClick={() =>window.scrollTo({top: 0, left: 0, behavior: 'smooth'})
                }>Login</button>

                <div className="register">
                    <span> Not a member yet? </span>
                    <NavLink to="/register">  Register</NavLink>
                </div>
            </form>
        </div>

    );
}

export default Login;
