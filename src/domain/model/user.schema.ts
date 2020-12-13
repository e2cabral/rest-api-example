import mongoose from "mongoose";
import bcrypt from 'bcrypt';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: { type: String, required: true },
    password: { type: String, required: true, select: false },
    name: { type: String, required: true }
});

UserSchema
    .methods
    .encryptPassword = async (password: string): Promise<string> => {
        const salt = await bcrypt.genSalt(5);
        return await bcrypt.hash(password, salt);
    }

UserSchema
    .methods
    .validPassword = async (candidatePassword: string): Promise<boolean> => {
        try {
            if (this && this !== undefined && this !== null) {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                return await bcrypt.compare(candidatePassword, this.password);
            }
            return false;
        } catch (e) {
            throw new Error('The object is undefined.');
        }
    }

    export default mongoose.model('user', UserSchema);
