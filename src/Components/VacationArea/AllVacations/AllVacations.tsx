import "./AllVacations.css";
import { useEffect, useState } from "react";
import useVerifyLoggedIn from "../../../Utils/useVerifyLoggedIn";
import VacationModel from "../../../Models/VacationModel";
import VacationsService from "../../../Services/VacationsService";
import notifyService from "../../../Services/NotifyService";
import VacationCard from "../VacationCard/VacationCard";
import Pagination from "../../LayoutArea/Home/Pagination/Pagination";
import { authStore } from "../../../Redux/AuthState";

function AllVacations(): JSX.Element {
    useVerifyLoggedIn();// UseVerifyLoggedIn hook is used to verify if the user is logged in.
    const [vacations, setVacations] = useState<VacationModel[]>([]);// Sets a state with an initial value of an empty array and uses VacationsService to get all vacations related to given userId.
    const [cardsPerPage] = useState(12);// Sets a state for cards per page.
    const [currentPage, setCurrentPage] = useState<number>(1);// Sets a state for current page number which will be updated when necessary.
    const lastCardIndex = currentPage * cardsPerPage;// Calculates index of first and last card by multiplying current page number with cardsPerPage variable.
    const firstCardIndex = lastCardIndex - cardsPerPage;// Calculates index of first card by subtracting cardsPerPage from lastCardIndex
    const currentCard = vacations.slice(firstCardIndex, lastCardIndex);// Creates a new array of vacations with the vacations between the calculated indices.
    const token= sessionStorage.getItem('token');//Get token from sessionStorage if exist.

    useEffect(() => {// Effect hook that retrieves vacations data by calling VacationService when component mounts or updates.
        if (token) {//If there is token in the storage-
            const userId= authStore.getState().user.userId;// Gets userId from authStore.
            VacationsService.getAllVacations(userId)
                .then(vacations => setVacations(vacations))
                .catch(err => notifyService.error(err));
        }
    }, []);

    return (
        <div className="homeDiv">
            <div className="vacationList">
                {currentCard.map(v => <VacationCard key={v.id} vacation={v} />)}
            </div>
            <div className="paginationDiv">
                {vacations.length > 0 && <>
                    <Pagination
                        totalCards={vacations.length}
                        cardsPerPage={cardsPerPage}
                        setCurrentPage={setCurrentPage}
                        currentPage={currentPage}
                    />
                </>}
            </div>
        </div>
    );
}

export default AllVacations;
