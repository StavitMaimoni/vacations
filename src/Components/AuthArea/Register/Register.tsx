import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import UserModel from "../../../Models/UserModel";
import authService from "../../../Services/AuthService";
import notifyService from "../../../Services/NotifyService";
import "./Register.css";

function Register(): JSX.Element {

    const { register, handleSubmit, formState } = useForm<UserModel>();// UseForm hook is used to get the values from the form.
    const navigate = useNavigate();// UseNavigate hook is used for navigation between pages.

    async function send(user: UserModel) {
        try {
            await authService.register(user);// Sends user details to register function.
            notifyService.success("Welcome!");//Displays a 'welcome' massage on success.
            navigate("/home");//Navigates to Home page on success.
        }
        catch(err: any) {
            notifyService.error(err);//Displays an error message when there is an error.
        }
    }

    return (
        <div className="Register">

            <form onSubmit={handleSubmit(send)}>

                <h2>Register</h2>

                <label>First name: </label>
                <input type="text" {...register("firstName",UserModel.firstNameValidation)} />
                <span className="Error">{formState.errors.firstName?.message}</span>

                <label>Last name: </label>
                <input type="text" {...register("lastName",UserModel.lastNameValidation)} />
                <span className="Error">{formState.errors.lastName?.message}</span>

                <label>Username: </label>
                <input type="text" {...register("username",UserModel.usernameValidation)} />
                <span className="Error">{formState.errors.username?.message}</span>

                <label>Password: </label>
                <input type="password" {...register("password",UserModel.passwordValidation)} />
                <span className="Error">{formState.errors.password?.message}</span>

                <button className="btn">Register</button>
                <div className="login">
                <NavLink to="/login">  Login</NavLink>
                </div>

            </form>

        </div>
    );
}

export default Register;
