import sqlite3 from "sqlite3";
import { IUser } from "../models/IUser";
import { IGameAccount } from "../models/IGameAccount";
import { IGameType } from "../models/IGameType";

export const db = new sqlite3.Database("database");

// users //

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

  const sqlInsertUser = `INSERT INTO users (username, password) VALUES (?,?)`;
  const valuesInsertUser = [user.username, user.password];

  return new Promise<number>((resolve, reject) => {
    db.run(sqlInsertUser, valuesInsertUser, function (error) {
      if (error) {
        reject(error);
      } else {
        // Use the lastID property to get the ID of the inserted user
        const userID = this.lastID;

        // Now, create a game_account for the user
        const sqlInsertGameAccount = `INSERT INTO game_accounts (balance, userID) VALUES (?, ?)`;
        const valuesInsertGameAccount = [0, userID];

        db.run(sqlInsertGameAccount, valuesInsertGameAccount, function (error) {
          if (error) {
            reject(error);
          } else {
            resolve(userID);
          }
        });
      }
    });
  });
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
  const userDeleteSql = `DELETE FROM users WHERE userID = ?`;
  const gameAccountDeleteSql = `DELETE FROM game_accounts WHERE userID = ?`;

  return new Promise<void>((resolve, reject) => {
    db.run(userDeleteSql, [userID], (userDeleteError) => {
      if (userDeleteError) {
        reject(userDeleteError);
      } else {
        db.run(gameAccountDeleteSql, [userID], (gameAccountDeleteError) => {
          if (gameAccountDeleteError) {
            reject(gameAccountDeleteError);
          } else {
            resolve();
          }
        });
      }
    });
  });
};

// game_accounts //

db.run(`CREATE TABLE IF NOT EXISTS game_accounts(
  accountID INTEGER PRIMARY KEY AUTOINCREMENT,
  balance DECIMAL(10, 2) DEFAULT 0 CHECK (balance >= 0), -- Adding CHECK constraint
  userID INTEGER UNIQUE,
  FOREIGN KEY (userID) REFERENCES users (userID)
)`);

export const getAllGameAccounts = async (): Promise<IGameAccount[]> => {
  const sql = `SELECT * FROM game_accounts`;
  return new Promise<IGameAccount[]>((resolve, reject) => {
    db.all(sql, (error, rows: IGameAccount[]) => {
      if (error) {
        reject(error);
      } else {
        resolve(rows || []);
      }
    });
  });
};

export const getGameAccountById = async (
  accountID: number
): Promise<IGameAccount | null> => {
  const sql = `SELECT * FROM game_accounts WHERE accountID = ?`;

  return new Promise<IGameAccount | null>((resolve, reject) => {
    db.get(sql, [accountID], (error, gameAccount: IGameAccount | null) => {
      if (error) {
        reject(error);
      } else {
        resolve(gameAccount);
      }
    });
  });
};

export const updateGameAccountBalance = async (
  accountID: number,
  newBalance: number
) => {
  const sql = `UPDATE game_accounts SET balance = ? WHERE accountID = ?`;
  const values = [newBalance, accountID];

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

// game_types //

db.run(`CREATE TABLE IF NOT EXISTS game_types(
  gameTypeID INTEGER PRIMARY KEY AUTOINCREMENT,
  gameType VARCHAR(255) NOT NULL UNIQUE
)`);

export const createGameType = async (gameType: IGameType) => {
  const isGameTypeTaken = await isGameTypeExist(gameType.gameType);

  if (isGameTypeTaken) {
    throw new Error("Game type already exists");
  }

  const sqlInsertGameType = `INSERT INTO game_types (gameType) VALUES (?)`;
  const valuesInsertGameType = [gameType.gameType];

  return new Promise<number>((resolve, reject) => {
    db.run(sqlInsertGameType, valuesInsertGameType, function (error) {
      if (error) {
        reject(error);
      } else {
        const gameTypeID = this.lastID;
        resolve(gameTypeID);
      }
    });
  });
};

export const isGameTypeExist = async (gameType: string): Promise<boolean> => {
  const sql = `SELECT COUNT(*) as count FROM game_types WHERE gameType = ?`;
  const result = await new Promise<{ count: number }>((resolve, reject) => {
    db.get(sql, [gameType], (error, row) => {
      if (error) {
        reject(error);
      } else {
        resolve(row as { count: number });
      }
    });
  });

  return result.count > 0;
};

export const getAllGameTypes = async (): Promise<IGameType[]> => {
  const sql = `SELECT * FROM game_types`;
  return new Promise<IGameType[]>((resolve, reject) => {
    db.all(sql, (error, rows: IGameType[]) => {
      if (error) {
        reject(error);
      } else {
        resolve(rows || []);
      }
    });
  });
};

export const getGameTypeByGameType = async (
  gameType: string
): Promise<IGameType | null> => {
  const sql = `SELECT * FROM game_types WHERE gameType = ?`;

  return new Promise<IGameType | null>((resolve, reject) => {
    db.get(sql, [gameType], (error, gameType: IGameType | null) => {
      if (error) {
        reject(error);
      } else {
        resolve(gameType);
      }
    });
  });
};

export const updateGameType = async (
  gameType: string,
  updatedGameType: IGameType
) => {
  const sql = `UPDATE game_types SET gameType = ? WHERE gameType = ?`;
  const values = [updatedGameType.gameType, gameType];

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

export const deleteGameType = async (gameType: string) => {
  const sql = `DELETE FROM game_types WHERE gameType = ?`;

  return new Promise<void>((resolve, reject) => {
    db.run(sql, [gameType], (error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
};
