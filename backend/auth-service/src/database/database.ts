import mongoose from "mongoose";
import { config } from "../configuration/app.config";

const connectDatabase = async () => {
  try {
    await mongoose.connect(config.MONGO_URI);
    console.log("Успешно подкючено к базе данных MongoDB");
  } catch (error) {
    console.log("Ошибка при подключении к базе данных MongoDB");
    process.exit(1);
  }
};

export default connectDatabase;
