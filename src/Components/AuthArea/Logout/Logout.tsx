import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { vacationsStore, VacationsActionType } from "../../../Redux/VacationsState";
import authService from "../../../Services/AuthService";
import notifyService from "../../../Services/NotifyService";
import "./Logout.css";

function Logout(): JSX.Element {
    const navigate = useNavigate();// UseNavigate hook is used for navigation between pages.
    const arr:any= []// An empty array is created to act as the payload for the FetchVacations action of VacationsActionType.

    //VacationsStore dispatches a FetchVacations action with the empty array in order to reset the state of vacations when user changes.
    vacationsStore.dispatch({ type: VacationsActionType.FetchVacations, payload: arr });

    //A side effect logs out and navigates to Login page on success or displays an error message otherwise.
    useEffect(() => {
        authService.logout();
        notifyService.success(`Bye Bye`);
        navigate("/login");
    }, []);

    return null; // Returns null since there are no JSX elements to render.
}

export default Logout;
