import { scrypt, randomBytes } from "crypto";
import { promisify } from "util";

const scryptAsync = promisify(scrypt)

export default class PasswordUtil {
    public static async hashing(password: string): Promise<string> {
        const salt = randomBytes(16).toString("hex")
        const hashedBuffer = (await scryptAsync(password, salt, 64)) as Buffer
        return `${salt}:${hashedBuffer.toString('hex')}`
    };

    public static async varifying(password: string, storedHash: string): Promise<boolean> {
        const [salt, hash] = storedHash.split(':')
        const hashedBuffer = (await scryptAsync(password, salt, 64)) as Buffer
        return hash === hashedBuffer.toString('hex')
    }
}