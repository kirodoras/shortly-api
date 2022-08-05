import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();
const SALT_ROUNDS = +process.env.BCRYPT_SALT || 10;

export async function encode(password) {
  return await bcrypt.hash(password, SALT_ROUNDS);
}

export function verify(password, hash) {
  return bcrypt.compareSync(password, hash);
}
