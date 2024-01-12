import { Request, Response } from "express";
import { verifyUser } from "../db/db";

export const loginController = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    // Kolla om användaren finns i databasen och lösenordet stämmer
    const isValidUser = await verifyUser(username, password);

    if (isValidUser) {
      //   res.json({ username, password });
      res.json("Login successful");
    } else {
      res
        .status(401)
        .json({ error: "Felaktigt användarnamn eller lösenord tyvärr" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Något gick fel" });
  }
};
