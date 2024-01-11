import { Request, Response } from "express";
// import jwt from "jsonwebtoken";
import { verifyUser } from "../db/db";
// import { secretKey } from "../../config";

export const loginController = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    // Kolla om användaren finns i databasen och lösenordet stämmer
    const isValidUser = await verifyUser(username, password);

    if (isValidUser) {
      // Generera en JWT-token och skicka tillbaka till klienten
      //   const token = generateToken(username);

      //   res.json({ token });
      res.json({ message: "Login successful" });
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

// const generateToken = (username: string): string => {
//   // Skapa en JWT-token med användarnamnet och en hemlig nyckel
//   const token = jwt.sign({ username }, secretKey, { expiresIn: "1h" }); // Tokenet kommer att vara giltigt i 1 timme

//   return token;
// };
