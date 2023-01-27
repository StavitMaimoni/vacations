import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import notifyService from "../../../Services/NotifyService";
import vacationsService from "../../../Services/VacationsService";
import "./VacationReport.css";

function GetFollowVacations(): JSX.Element { //  Fetch all followed vacations and display them in a tabular format along with their current follow numbers.
    const [followVacations, setFollowVacations] = useState<any>(); // Use State to store the list of followed vacation objects.

    useEffect(() => {// Executes on initial render vacationsService.getFollowVacations().
        vacationsService.getFollowVacations()// Fetches all followed vacations from server.
            .then(followVacations => {
                setFollowVacations(followVacations);// Sets retrieved data into state object followVacations and correspondingly updates UI.
            })
            .catch(err => notifyService.error(err));// Display an error message if something goes wrong.
    }, []);

    const data: any = []; // Declare an empty array to store each element after transforming it into table row compatible objects.
    
    if (followVacations) {//If there are vacations that has been followed push to the table data the followed vacations details.
        for (let i = 0; i < followVacations.length; i++) {
            data.push({
                Vacation: followVacations[i].destination,
                Likes: followVacations[i].followNum
            });
        }
    }

    return (
        <div className="BarChart">
        {followVacations?.length>0 && <>
            <BarChart
                width={1262}
                height={600}
                data={data}
                margin={{
                    top: 5,
                    right: 1,
                    left: 50,
                    bottom: 5
                }}
                barSize={30}
            >
                <XAxis dataKey="Vacation" scale="point" padding={{ left: 35, right: 105 }} />
                <YAxis className="YAxis"/>
                <Tooltip />
                <Legend />
                <CartesianGrid strokeDasharray="3 3" />
                <Bar dataKey="Likes" fill="darkcyan" background={{ fill: "#eee" }} />
            </BarChart>
            </>}

            {followVacations?.length<1 &&<><h1 className="Header">No vacation has been selected yet 🤷🏿</h1></> }
        </div>
    );
}

export default GetFollowVacations;