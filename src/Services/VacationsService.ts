import axios from "axios";
import VacationModel from "../Models/VacationModel";
import { VacationsActionType, vacationsStore } from "../Redux/VacationsState";
import appConfig from "../Utils/Config";

class VacationsService {

    // Get all vacations:
    public async getAllVacations(userId: number): Promise<VacationModel[]> {

        // Take vacations from global store:
        let vacations = vacationsStore.getState().vacations;

        if (vacations.length === 0) {//If vacations array is empty-

            // AJAX Request: 
            const response = await axios.get<VacationModel[]>(appConfig.vacationsUrl + userId); // AJAX

            // Extract vacations: 
            vacations = response.data;

            // Save vacations to global state: 
            vacationsStore.dispatch({ type: VacationsActionType.FetchVacations, payload: vacations });
        }

        // Return vacations:
        return vacations;
    }

    //Get one vacation
    public async getOneVacation(uuId: string): Promise<VacationModel> {
        let vacation: any;// An empty variable to store the response from the server.
        const response = await axios.get<VacationModel>(appConfig.oneVacationUrl + uuId);//Axios sends a GET request for vacation information, passing in the oneVacationURL plus the given uuID as parameters.
        vacation = response.data;//Sets up our previously declared "vacation" variable with the data from our API call.
        return vacation[0]; //Finally, this will return only the first element (the one vacation) from our array of returned vacation.
    }

    //Get followed vacation's name and amount of followers:
    public async getFollowVacations(): Promise<any> {

        // AJAX Request: 
        const response = await axios.get<number>(appConfig.followedVacation);

        // Extract vacations: 
        const followVacations = response.data;

        // Return vacations:
        return followVacations;
    }

    // Add vacation: 
    public async addVacation(vacation: VacationModel): Promise<void> {
        const myFormData = new FormData(); // Can contain strings and / or files.
        myFormData.append("destination", vacation.destination);
        myFormData.append("description", vacation.description);
        myFormData.append("price", vacation.price.toString());
        myFormData.append("checkIn", vacation.checkIn);
        myFormData.append("checkOut", vacation.checkOut);
        myFormData.append("image", vacation.image[0]); // image = FileList, image[0] = File
        myFormData.append("isFollow", vacation.isFollow.toString());

        // Sending object with file (the image):
        const response = await axios.post<VacationModel>(appConfig.vacationsUrl, myFormData);

        // Extract the added vacation: 
        const addedVacation = response.data;

        // Add the added vacation to the global state:
        vacationsStore.dispatch({ type: VacationsActionType.AddVacation, payload: addedVacation });
    }

    // Update vacation: 
    public async updateVacation(vacation: VacationModel): Promise<void> {

        const myFormData = new FormData(); // Can contain strings and / or files.
        myFormData.append("destination", vacation.destination);
        myFormData.append("description", vacation.description);
        myFormData.append("checkIn", vacation.checkIn);
        myFormData.append("checkOut", vacation.checkOut); myFormData.append("price", vacation.price.toString());
        myFormData.append("image", vacation.image[0]); // image = FileList, image[0] = File
        myFormData.append("isFollow", vacation.isFollow.toString());

        // Sending object with file (the image):
        const response = await axios.put<VacationModel>(appConfig.vacationsUrl + vacation.id, myFormData); // Sending object without files.

        // Extract the updated vacation: 
        const updatedVacation = response.data;

        // Update that vacation in the global store:
        vacationsStore.dispatch({ type: VacationsActionType.UpdateVacation, payload: updatedVacation });
    }

    // Delete vacation: 
    public async deleteVacation(id: number): Promise<void> {

        // Delete in backend:
        await axios.delete<void>(appConfig.vacationsUrl + id);

        // Delete in global state: 
        vacationsStore.dispatch({ type: VacationsActionType.DeleteVacation, payload: id });

    }

    // Update follow vacation: 
    public async followVacation(vacationId: number, userId: number): Promise<void> {

        // Update follow vacation in backend:
        await axios.put<void>(appConfig.followedVacation + vacationId + "/" + userId);
    }

    // Update unFollow vacation: 
    public async unFollowVacation(vacationId: number, userId: number): Promise<void> {

        // Update unFollow vacation in backend:
        await axios.put<void>(appConfig.unFollowedVacation + vacationId + "/" + userId);
    }

}
const vacationsService = new VacationsService();

export default vacationsService;
