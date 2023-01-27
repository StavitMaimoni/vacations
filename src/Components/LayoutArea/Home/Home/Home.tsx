import useVerifyLoggedIn from "../../../../Utils/useVerifyLoggedIn";
import "./Home.css";
import { useEffect, useState } from "react";
import UserModel from "../../../../Models/UserModel";
import { authStore } from "../../../../Redux/AuthState";
import AllVacations from "../../../VacationArea/AllVacations/AllVacations";
import MyVacations from "../../../VacationArea/MyVacation/MyVacations";


function Home(): JSX.Element {
    useVerifyLoggedIn();// UseVerifyLoggedIn hook is used to verify if the user is logged in.
    const [filter, setFilter] = useState("AllVacations");// Sets filter variable with an initial value of 'AllVacations' in order to display all the vacations by default.
    const [user, setUser] = useState<UserModel>();// Sets user variable with type UserModel.


    useEffect(() => {// UseEffect hook is used to detect any changes in the authStore and update the user state accordingly.
        setUser(authStore.getState().user);
        const unsubscribe = authStore.subscribe(() => {
            setUser(authStore.getState().user);
        });
        return unsubscribe;
    }, []);

    const isAdmin = user?.role === 'Admin'; // Checks if the user's role is Admin or not.

    return (
        <div className="homeDiv">
            {!isAdmin && <>
                <div className="FilterButton">
                    <div className="radio-btn-container">
                        <div className="radio-btn" onClick={() => { setFilter("MyVacations"); }}>
                            <input type="radio" value={filter} name="filter"
                                checked={filter === "MyVacations"} readOnly />
                            My Vacations
                        </div>
                        <div className="radio-btn" onClick={() => { setFilter("AllVacations");}}>
                            <input type="radio" value={filter} name="filter"
                                checked={filter === "AllVacations"} readOnly />
                            All Vacations
                        </div>
                    </div>
                </div>
            </>}
            {filter==='AllVacations' && <> 
                <AllVacations />
            </>}
            {filter==='MyVacations' && <>
             <MyVacations />
            </>}
          
        </div>
    );
}

export default Home;
