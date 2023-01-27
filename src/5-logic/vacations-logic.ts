import dal from "../2-utils/dal";
import { ResourceNotFoundErrorModel, ValidationErrorModel } from "../4-models/error-models";
import VacationModel from "../4-models/vacation-model";
import { v4 as uuid } from "uuid"; // v4 function changed to uuid name.
import { OkPacket } from "mysql";

// Get all vacations adequate to the user: 
async function getAllVacations(userId: number): Promise<VacationModel[]> {
    const sql = `
    SELECT 
        DATE_FORMAT(checkIn, '%d/%m/%Y') checkIn,
        DATE_FORMAT(checkOut, '%d/%m/%Y') AS checkOut,
        vacations.vacationID AS id,
        uuId,
        destination,
        description,
        price,
        imageName,
        CASE WHEN userActivity.vacationId is NOT null THEN 1 else 0 end AS isFollow,
        followedVacations.followNum AS followersCount
    FROM vacations 
    LEFT JOIN userActivity
    ON userActivity.vacationId = vacations.vacationId
    AND userActivity.userId= ?
    LEFT JOIN followedVacations
    ON followedVacations.vacationId=vacations.vacationId
    ORDER BY vacations.checkIn DESC;
    `;

    const vacations = await dal.execute(sql, [userId]);
    return vacations;
}

// Get one vacation for the EditVacation component- to fill in the details of the vacation that is being edited: 
async function getOneVacation(vacationUuId: string): Promise<VacationModel> {
    const sql1 = `
      SELECT  
        DATE_FORMAT(checkIn, '%m/%d/%Y') AS checkIn,
        DATE_FORMAT(checkOut, '%m/%d/%Y') AS checkOut,
        vacationID AS id,
        destination,
        description,
        price,
        imageName,
        isFollow
        FROM vacations
        WHERE uuId =  ?
      `;

    const vacation = await dal.execute(sql1, [vacationUuId]);
    return vacation;
}

// Get name and amount of followed vacations for the VacationReport component- to create a graph of vacations based on the amount of followers:
async function getFollowNameAmount(): Promise<any> {
    const sql1 = `
    SELECT followedVacations.followNum, vacations.destination 
    FROM followedVacations LEFT JOIN vacations 
    ON followedVacations.vacationId = vacations.vacationId
    WHERE followedVacations.followNum>0;  
      `;

    const followVacation = await dal.execute(sql1);
    return followVacation;
}

// Add new vacation:
async function addVacation(vacation: VacationModel): Promise<VacationModel> {
    const errors = vacation.validate();
    if (errors) throw new ValidationErrorModel(errors);
    const extension = vacation.image.name.substring(vacation.image.name.lastIndexOf("."))
    vacation.imageName = uuid() + extension;
    await vacation.image.mv("./src/1-assets/Images/" + vacation.imageName);
    delete vacation.image;
    vacation.uuId = uuid();

    const sql1 = `
    INSERT INTO vacations VALUES(
        DEFAULT,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?);`;

    const info: OkPacket = await dal.execute(sql1, [vacation.uuId, vacation.destination, vacation.description, vacation.price, vacation.checkIn, vacation.checkOut,vacation.imageName, vacation.isFollow]);

    vacation.id = info.insertId;

    const sql2 = `INSERT INTO followedVacations VALUES(?,0);`;
    const information: OkPacket = await dal.execute(sql2, [vacation.id]);

    return vacation;

}

// Update existing vacation:
async function updateVacation(vacation: VacationModel): Promise<VacationModel> {
    const errors = vacation.validate();
    if (errors) throw new ValidationErrorModel(errors);
    const extension = vacation.image.name.substring(vacation.image.name.lastIndexOf("."))
    vacation.imageName = uuid() + extension;
    await vacation.image.mv("./src/1-assets/Images/" + vacation.imageName);
    delete vacation.image;
    const sql = `
        UPDATE vacations SET 
            destination = ?,
            description = ?,
            checkIn = ?,
            checkOut = ?,
            imageName=?,
            price = ?
        WHERE vacationId = ?
    `;

    const info: OkPacket = await dal.execute(sql, [vacation.destination, vacation.description, vacation.checkIn,vacation.checkOut, vacation.imageName, vacation.price, vacation.id]);

    if (info.affectedRows === 0) throw new ResourceNotFoundErrorModel(vacation.id);

    return vacation;
}

// Delete one vacation: 
async function deleteVacation(id: number): Promise<void> {
    const sql1 = `DELETE FROM vacations WHERE VacationId = ?`;

    const info: OkPacket = await dal.execute(sql1, [id]);

    if (info.affectedRows === 0) throw new ResourceNotFoundErrorModel(id);
}

// Follow vacation:
async function followVacation(vacationId: number, userId: number): Promise<void> {
    const sql = `
        UPDATE followedVacations SET 
            followNum = followNum+1
            WHERE VacationId = ?
    `;

    const info: OkPacket = await dal.execute(sql, [vacationId]);

    const sql2 = ` UPDATE vacations SET  isFollow = 1
    WHERE VacationId= ?`;
    const info2: OkPacket = await dal.execute(sql2, [vacationId]);

    const sql3 = `INSERT INTO userActivity VALUES(?,?)`;
    const info3: OkPacket = await dal.execute(sql3, [vacationId, userId]);
}

// Un follow vacation:
async function unFollowVacation(vacationId: number, userId: number): Promise<void> {
    const sql = `
        UPDATE followedVacations SET 
            followNum = followNum-1
            WHERE VacationId = ?
    `;

    const info: OkPacket = await dal.execute(sql, [vacationId]);

    const sql2 = ` UPDATE vacations SET  isFollow = 0
    WHERE VacationId = ?`;
    const info2: OkPacket = await dal.execute(sql2, [vacationId]);

    const sql3 = `DELETE FROM userActivity WHERE vacationId = ? AND userId= ?`;
    const info3: OkPacket = await dal.execute(sql3, [vacationId, userId]);
}

export default {
    getAllVacations,
    addVacation,
    updateVacation,
    deleteVacation,
    followVacation,
    unFollowVacation,
    getOneVacation,
    getFollowNameAmount
};

