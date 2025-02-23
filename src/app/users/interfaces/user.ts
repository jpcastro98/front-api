import { ISessionHistory } from "./session-history";
import { IUserData } from "./user-data";

export interface IUser {
    Id: number,
    Email: string,
    Password: string,
    UserData: IUserData
    SessionHistory: ISessionHistory,
}