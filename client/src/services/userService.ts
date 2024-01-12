import axios from "axios";
import { User } from "../models/User";

const API_BASE_URL = "http://localhost:4440";

// LoginUser

export const loginUser = async (
  username: string,
  password: string
): Promise<User> => {
  try {
    console.log("1");

    const response = await axios.post(`${API_BASE_URL}/auth/login`, {
      username,
      password,
    });

    console.log("2");

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
