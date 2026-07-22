import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";
import type { User } from "../../types/user";

class UserRepository {
  async readByEmail(email: string) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT * FROM users WHERE email = ?",
      [email],
    );

    return (rows as User[])[0];
  }
  async createAccount(user: { email: string; passwordHash: string }) {
    const [result] = await databaseClient.query<Result>(
      `INSERT INTO users 
      (email, password)
      VALUES(?, ?)`,
      [user.email, user.passwordHash],
    );
    return result.insertId;
  }
}

export default new UserRepository();
