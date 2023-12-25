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
  const isTaken = await isUsernameTaken(user.username);

  if (isTaken) {
    throw new Error("Username is already taken");
  }

  const sql = `INSERT INTO users (username, password) VALUES (?,?)`;
  const values = [user.username, user.password];
  db.run(sql, values);
};

export const isUsernameTaken = async (username: string): Promise<boolean> => {
  const sql = `SELECT COUNT(*) as count FROM users WHERE username = ?`;
  const result = await new Promise<{ count: number }>((resolve, reject) => {
    db.get(sql, [username], (error, row) => {
      if (error) {
        reject(error);
      } else {
        resolve(row as { count: number });
      }
    });
  });

  return result.count > 0;
};

export const getAllUsers = async (): Promise<IUser[]> => {
  const sql = `SELECT * FROM users`;
  return new Promise<IUser[]>((resolve, reject) => {
    db.all(sql, (error, rows: IUser[]) => {
      if (error) {
        reject(error);
      } else {
        resolve(rows || []);
      }
    });
  });
};

export const getUserById = async (userID: number): Promise<IUser | null> => {
  const sql = `SELECT * FROM users WHERE userID = ?`;

  return new Promise<IUser | null>((resolve, reject) => {
    db.get(sql, [userID], (error, user: IUser | null) => {
      if (error) {
        reject(error);
      } else {
        resolve(user);
      }
    });
  });
};

export const updateUser = async (userID: number, updatedUser: IUser) => {
  const sql = `UPDATE users SET username = ?, password = ? WHERE userID = ?`;
  const values = [updatedUser.username, updatedUser.password, userID];

  return new Promise<void>((resolve, reject) => {
    db.run(sql, values, (error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
};

export const deleteUser = async (userID: number) => {
  const sql = `DELETE FROM users WHERE userID = ?`;

  return new Promise<void>((resolve, reject) => {
    db.run(sql, [userID], (error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
};
