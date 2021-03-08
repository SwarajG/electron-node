import { IUser } from '../interface/userInterface';
import User from '../model/User';

export const getUsers = (_: any, res: any) => {
  User.find((err: any, users: IUser) => {
    if (err) return console.error(err);
    res.json({ users })
  });
};