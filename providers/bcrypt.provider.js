import bcrypt from 'bcrypt';
import dotenv from "dotenv";

dotenv.config();
const SALT_ROUNDS = +process.env.BCRYPT_SALT || 10;

export async function encode(password){
    return await bcrypt.hash(password, SALT_ROUNDS);
}

export async function verify(password, hash){
    return await bcrypt.compare(password, hash);
}