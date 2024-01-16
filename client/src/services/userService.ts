import axios from "axios";
import { User, UserAllInfo } from "../models/User";

const API_BASE_URL = "http://localhost:4440";

// loginUser

export const loginUser = async (
  username: string,
  password: string
): Promise<UserAllInfo> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, {
      username,
      password,
    });

    console.log("Response from login API call:", response.data);

    if (response.data.message === "Login successful") {
      console.log("Inloggningen lyckades!");

      const responseAll: UserAllInfo = response.data;
      const responseUser = responseAll.user;

      console.log("Response User:", responseUser);

      const userID = responseUser.userID;

      const balance = await getBalance(userID);

      return {
        user: {
          userID,
          username,
          password,
        },
        gameAccount: { balance },
        isLoggedIn: true,
      };
    } else {
      console.log("Inloggningen misslyckades!");
      throw new Error("Inloggningen misslyckades");
    }
  } catch (error) {
    console.log("Något fel inträffade vid inloggning:", error);
    throw error;
  }
};

// getBalance
export const getBalance = async (userID: number): Promise<number> => {
  try {
    const response = await axios.get<UserAllInfo>(
      `${API_BASE_URL}/users/${userID}/allInfo`
    );
    if (
      response.data.gameAccount &&
      response.data.gameAccount.balance !== undefined
    ) {
      return response.data.gameAccount.balance;
    } else {
      console.error(
        "Invalid response structure for getBalance API call:",
        response.data
      );
      throw new Error("Invalid response structure");
    }
  } catch (error) {
    console.error("Failed to get balance:", error);
    throw error;
  }
};

// getAllUsers

export const getAllUsers = async (): Promise<User[]> => {
  let response = await axios.get<User[]>(`${API_BASE_URL}/users`);

  return response.data;
};

// createUser

export const createUser = async (
  username: string,
  password: string
): Promise<User> => {
  try {
    const allUsers = await getAllUsers();

    const isUsernameTaken = allUsers.some((user) => user.username === username);

    if (isUsernameTaken) {
      throw new Error("Användarnamnet är redan taget");
    }
    const response = await axios.post(`${API_BASE_URL}/users`, {
      username,
      password,
    });

    const user: User = response.data.user;

    const userID = user.userID;

    if (response.data.message === "User created successfully") {
      return { userID, username, password, balance: 0, isLoggedIn: false };
    } else {
      throw new Error("Failed to create user");
    }
  } catch (error) {
    console.error("Failed to create user:", error);
    throw error;
  }
};
