import mongoose from "mongoose";

export class DbClient {
    static async connect(): Promise<void> {
        mongoose.Promise = global.Promise;
        await mongoose.connect(
            '',
            { useUnifiedTopology: true }
        );
    }
}
