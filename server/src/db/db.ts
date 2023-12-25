import sqlite3 from "sqlite3";
import { IUser } from "../models/IUser";

export const db = new sqlite3.Database("database");

db.run(`CREATE TABLE IF NOT EXISTS users(
    userID INTEGER PRIMARY KEY AUTOINCREMENT,
    username VARCHAR(255),
    password VARCHAR(255),
    UNIQUE (username)
)`);

export const createUser = async (user: IUser) => {
  const sql = `INSERT INTO users (username, password) VALUES (?,?)`;
  const values = [user.username, user.password];
  db.run(sql, values);
};

export const getAllUsers = async (): Promise<IUser[]> => {
  const sql = `SELECT * FROM users`;
  return new Promise<IUser[]>((resolve, reject) => {
    db.all(sql, (error, rows: IUser[]) => {
      if (error) {
        reject(error);
      } else {
        resolve(rows);
      }
    });
  });
};

export const getById = async (userID: number, callback: Function) => {
  const sql = `SELECT * FROM users WHERE userID = ?`;
  db.get(sql, [userID], callback);
};
