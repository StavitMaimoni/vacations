import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import UserModel from "../../../Models/UserModel";
import { authStore } from "../../../Redux/AuthState";
import "./AuthMenu.css";

function AuthMenu(): JSX.Element {

    const [user, setUser] = useState<UserModel>();//uses the Hooks API to declare and initialize user state with UserModel type.

    useEffect(() => {//Sets up an effect hook on mount of the component which runs once when it mounts and stores user in our state from authStore:
        setUser(authStore.getState().user);
        setUser(authStore.getState().user);
        const unsubscribe = authStore.subscribe(() => {//Creates a subscription to listen for changes in auth store, whenever any change happens we update our local state accordingly.
            setUser(authStore.getState().user);
        });
        return unsubscribe;//Returning unsubscribe will remove the listener created using subscribe method on unmount of AuthMenu Component.
    }, []);

    const isAdmin = user?.role === 'Admin';//Checks if role property of currently logged-in user is Administrator.
    let today = new Date();//Creating current date object.
    let curHr = today.getHours();//Getting current hour from system clock.
    
    // setting greeting variable based on time range→
    let greet = "";
    if (curHr < 12 && curHr > 4) greet = `Good morning`;
    else if (curHr < 17 && curHr > 11) greet = `Good noon `;
    else if (curHr > 16 && curHr < 21) greet = `Good afternoon `;
    else greet = `Good night`;

    return (
        <div className="AuthMenu">
            {!user && <>
                <span className="AuthSpan"> {greet} 😀 Guest  </span>
                <NavLink to="/login" className="NavLink">Login</NavLink>
                <NavLink to="/register" className="NavLink">Register</NavLink>
            </>}

            {user && <>
                <span className="AuthSpan"> {greet} {user.firstName + " " + user.lastName} </span>
                <NavLink to="/home" className="NavLink">Home</NavLink>
                <NavLink to="/logout" className="NavLink">Logout</NavLink>
            </>}

            {isAdmin && <>
                <NavLink to={"add-vacation"} className="NavLink" onClick={() => {
                    window.scrollTo({ top: -10, left: 0, behavior: 'smooth' });
                }}>Add vacation</NavLink>
                <NavLink to={"vacation-report"} className="NavLink">Vacations-Report</NavLink>
            </>}
        </div>
    );
}

export default AuthMenu;
