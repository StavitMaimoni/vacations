import { useState } from "react";
import useVerifyLoggedIn from "../../../Utils/useVerifyLoggedIn";
import VacationCard from "../VacationCard/VacationCard";
import "./MyVacations.css";
import Pagination from "../../LayoutArea/Home/Pagination/Pagination";
import { vacationsStore } from "../../../Redux/VacationsState";


function MyVacations(): JSX.Element {
    useVerifyLoggedIn();// UseVerifyLoggedIn hook is used to verify if the user is logged in.
    const [cardsPerPage] = useState(12);// Sets a state for cards per page.
    const [currentPage, setCurrentPage] = useState(1);// Sets a state for current page number which will be updated when necessary.
    const lastCardIndex = currentPage * cardsPerPage;// Calculates index of first and last card by multiplying current page number with cardsPerPage variable.
    const firstCardIndex = lastCardIndex - cardsPerPage;// Calculates index of first card by subtracting cardsPerPage from lastCardIndex.
    const vacationArr= vacationsStore.getState().vacations;//Gets vacations array from vacationStore.
    const filteredVacations = vacationArr.filter(vacation => vacation.isFollow === 1);// Filter from vacations array only the vacations that has been followed.
    const currentCard = filteredVacations.slice(firstCardIndex, lastCardIndex);// Creates a new array of vacations with the vacations between the calculated indices.

    return (
        <div className="homeDiv">

            <div className="vacationList">
                {currentCard.map(v => <VacationCard key={v.id} vacation={v} />)}
            </div>
            <div className="paginationDiv">
                {vacationArr.length > 0 && <>
                    <Pagination 
                        totalCards={vacationArr.length}
                        cardsPerPage={cardsPerPage}
                        setCurrentPage={setCurrentPage}
                        currentPage={currentPage}
                    />
                </>}
            </div>
        </div>
    );
}

export default MyVacations;
