import axios from "axios";
import { User } from "../models/User";

const API_BASE_URL = "http://localhost:4440";

// loginUser

export const loginUser = async (
  username: string,
  password: string
): Promise<User> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, {
      username,
      password,
    });

    if (response.data === "Login successful") {
      console.log("Inloggningen lyckades!");
      return { username, password, balance: 0, isLoggedIn: true };
    } else {
      console.log("Inloggningen misslyckades!");
      throw new Error("Inloggningen misslyckades");
    }
  } catch (error) {
    console.log("något fel Tove", error);
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

    if (response.data.message === "User created successfully") {
      return { username, password, balance: 0, isLoggedIn: false };
    } else {
      throw new Error("Failed to create user");
    }
  } catch (error) {
    console.error("Failed to create user:", error);
    throw error;
  }
};
