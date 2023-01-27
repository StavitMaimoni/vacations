import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import VacationModel from "../../../Models/VacationModel";
import notifyService from "../../../Services/NotifyService";
import vacationsService from "../../../Services/VacationsService";
import useVerifyLoggedIn from "../../../Utils/useVerifyLoggedIn";
import "./EditVacation.css";

function EditVacation(): JSX.Element {

    useVerifyLoggedIn();// UseVerifyLoggedIn hook is used to verify if the user is logged in.
    const { register, handleSubmit, formState, setValue } = useForm<VacationModel>();// UseForm hook allows to create a custom hook to manage form state.
    const params = useParams();//Retrieves parameters from URL path.
    const navigate = useNavigate();//UseNavigate hook is used for navigation between pages.
    const [file, setFile] = useState<File>(null);// Initialize file variable with null.
    const [minDate, setMinDate] = useState<any>();// Sets a state of type any and defines minDate as today's date using useEffect hook.
    const changeHandler = (e: any) => {// Function for handling change event on image file inputs.
        const file1 = e.target.files[0];
        setFile(file1);
    }

    // Effect hook that sets minDate to Today's date.
    useEffect(() => {
        let date: any = new Date();
        let toDate: any = date.getDate();
        if (toDate < 10) toDate = "0" + toDate;
        let month: any = date.getMonth() + 1;
        if (month < 10) month = "0" + month;
        let year: any = date.getFullYear();
        setMinDate(year + "-" + month + "-" + toDate);
    }, []);

    useEffect(() => {
        const uuId = params.uuId;//The uuId parameter is retrieved from the URL path using the useParams hook.
        vacationsService.getOneVacation(uuId)//Setting form values with vacation data that was retrieved from the server.
            .then(vacation => {
                setValue("id", vacation.id);
                setValue("destination", vacation.destination);
                setValue("description", vacation.description);
                setValue("price", vacation.price);
                setValue("checkIn", vacation.checkIn);
                setValue("checkOut", vacation.checkOut);
                setValue("image", vacation.image);
                setValue("isFollow", vacation.isFollow);
            })
            .catch(err => notifyService.error(err));// Display an error message if something goes wrong.
    }, []);

    async function submit(vacation: VacationModel) {
        try {
            if (vacation.checkOut < vacation.checkIn) {// Check if check-out is before check-in.
                notifyService.error("Check-out must be after check-in");
                return;
            }
            await vacationsService.updateVacation(vacation);//Update a vacation on the server.
            notifyService.success("Vacation has been successfully updated");//Displays a success message with notifyService.success().
            navigate("/home");// Navigates back to the home page.
        }
        catch (err: any) {
            notifyService.error(err);// Display an error message if something goes wrong.
        }
    }

    return (
        <div className="EditVacation">

            <form onSubmit={handleSubmit(submit)}>

                <h2>Edit Vacation</h2>


                <label>Destination:</label><span className="Error"> {formState.errors.destination?.message}</span>
                <input type="text" {...register("destination", VacationModel.destinationValidation)} required />

                <label>Description:</label><span className="Error"> {formState.errors.description?.message}</span>
                <input type="text" {...register("description", VacationModel.descriptionValidation)} required />

                <label>Price:</label><span className="Error"> {formState.errors.price?.message}</span>
                <input type="number" {...register("price", VacationModel.priceValidation)} required />

                <label>Check in:</label> <span className="Error"> {formState.errors.checkIn?.message}</span>
                <input type="date" min={minDate} {...register("checkIn", VacationModel.checkInValidation)} required />

                <label>Check out:</label> <span className="Error"> {formState.errors.checkOut?.message}</span>
                <input type="date" min={minDate} {...register("checkOut", VacationModel.checkOutValidation)} required />

                <label>Image: </label>
                <span className="Error"> {formState.errors.imageName?.message}</span>
                <input type="file" onChangeCapture={changeHandler} accept="image/*" {...register("image", VacationModel.imageValidation)} required />
                {file && <img className="preloadImg" src={URL.createObjectURL(file)} alt="" />}

                <input type="hidden" {...register("isFollow")} />

                <input type="hidden" {...register("followersCount")} />


                <button className="btn">Update</button>

            </form>
        </div>
    );
}

export default EditVacation;