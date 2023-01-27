import VacationModel from "../../../Models/VacationModel";
import appConfig from "../../../Utils/Config";
import "./VacationCard.css";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { BsEmojiHeartEyes } from "react-icons/bs";
import {  useState } from "react";
import vacationsService from "../../../Services/VacationsService";
import { AiOutlineLike } from "react-icons/ai";
import { FaTrash } from "react-icons/fa";
import { TfiPencilAlt } from "react-icons/tfi";
import notifyService from "../../../Services/NotifyService";
import { authStore } from "../../../Redux/AuthState";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// VacationCardProps interface is used to pass in a vacation object of type VacationModel.
interface VacationCardProps {
    vacation: VacationModel;
}

// VacationCard functional component that takes one parameter - props, of type VacationCardProps.
function VacationCard(props: VacationCardProps): JSX.Element {
    const [followNum, setFollowNum] = useState<number>(props.vacation.followersCount); // useState hook is used to initialize followNum.
    const navigate = useNavigate();//UseNavigate hook is used for navigation between pages.
    const user= authStore.getState().user;// User variable is set by getting the current state from authStore.
    const isAdmin = user?.role === 'Admin';//IsAdmin boolean value depends on whether or not the user's role is Admin or not.

    function handleClick(vacationId: number): void { 
        if (!props.vacation.isFollow) {//If the clicked vacation has not been followed yet (isFollow=0).
            vacationsService.followVacation(vacationId, user.userId);//Updates followers count accordingly using vacationsService API call followVacations().
            setFollowNum(followNum+1);//Increases followNum by one to reflect updated follower count in state.
            props.vacation.isFollow=1; //Changes isFollow value in props object to 1 to indicate that vacation is now being followed by current user.
            props.vacation.followersCount++;//Increases followersCount property of VacationModel by one in order to reflect new change.
            
        }
        else {// If vacation has already been followed,then take opposite action i-e Un-follow & reduce followers Count.
            vacationsService.unFollowVacation(vacationId, user.userId);//Updates followers count accordingly using vacationsService API call followVacations().
            props.vacation.isFollow=0;//Changes isFollow value in props object to 0 to indicate that vacation is now being un-followed by current user.
            props.vacation.followersCount--;//Decreases followersCount property of VacationModel by one in order to reflect new change.
            setFollowNum(followNum-1);//Decreases followNum by one to reflect updated follower count in state.
        }
    }

    async function deleteVac(vacationID: number) {// deleteVac() function deletes a vacation from the database and displays an appropriate response to the user.
        try {
            if (!(window.confirm("Are you sure you want to delete this vacation?"))) return; // Checks whether user confirms deletion of vacation or not.
            await vacationsService.deleteVacation(vacationID); // Makes an API call using VacationsService object to delete selected vacation from server.
            notifyService.success("Vacation has been successfully deleted");// Displays success message on successful deletion of data.
            navigate("/home"); // Navigates back to home page after completing operation.
        }
        catch (err: any) {
            notifyService.error(err);// Display an error message if something goes wrong.
        }
    }

    return (
        <section className="main container section">

            <div className="secContent grid">
                <div key={props.vacation.id} className="singleDestination">
                    <div className="imgDiv"><img src={appConfig.vacationImagesUrl + props.vacation.imageName} />
                    </div>

                    <div className="cardInfo">
                        <div className="DestTitle"><h4>{props.vacation.destination}
                            <HiOutlineLocationMarker className="icon" /></h4>
                        </div>
                        <div className="price"> <h5>{"Price:" + props.vacation.price + "$"}</h5></div>
                        <div className="fees flex"></div>
                        <div className="desc">
                            <p>{props.vacation.description}</p>
                        </div>
                        <div> {"checkIn: " + props.vacation.checkIn}
                        </div>

                        <div> {"checkOut: " + props.vacation.checkOut}
                        </div>

                        {!isAdmin && <>
                            <button className={props.vacation.isFollow ? "follow" : ""}
                                onClick={() => handleClick(props.vacation.id)}
                            >{!props.vacation.isFollow ? "follow" : "UnFollow"}
                                <BsEmojiHeartEyes className="icon" />
                            </button>

                            <div className="grade">
                                <span className="followCount">{followNum}<AiOutlineLike className="like" /></span>
                            </div>
                        </>}

                        {isAdmin && <div className="adminIcon">
                            <div className="trash">
                                <FaTrash className="icon adminNav" onClick={() => { deleteVac(props.vacation.id) }
                                } />
                                <span className="trashText">Delete Vacation</span>
                            </div>
                            <div className="edit">
                                <NavLink to={"/edit/" + props.vacation.uuId} className="adminNav">
                                    <TfiPencilAlt className="icon edit" />
                                    <span className="editText">Edit Vacation</span>
                                </NavLink>
                            </div>
                        </div>}
                    </div>
                </div >
            </div>
        </section>
    );
}

export default VacationCard;