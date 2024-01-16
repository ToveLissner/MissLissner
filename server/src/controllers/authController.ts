import { Request, Response } from "express";
import { verifyUser, getUserByUsername } from "../db/db";

export const loginController = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    // Kolla om användaren finns i databasen och lösenordet stämmer
    const isValidUser = await verifyUser(username, password);

    if (isValidUser) {
      // Hämta hela användarobjektet från databasen baserat på användarnamnet
      const user = await getUserByUsername(username);

      if (user) {
        // Skicka hela användarobjektet till klienten
        res.json({ message: "Login successful", user });
      } else {
        res.status(500).json({
          error: "Något gick fel vid hämtning av användarinformation",
        });
      }
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
