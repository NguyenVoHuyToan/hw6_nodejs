import { MongoClient } from "mongodb";
import { config } from "dotenv";

config();

// Replace the uri string with your connection string.
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@huytoan.8kpntu8.mongodb.net/`;

class DatabaseService {
  constructor() {
    this.client = new MongoClient(uri);
    this.db = this.client.db(process.env.DB_USERNAME);
  }
  run() {
    try {
      this.client.connect();
    } catch (error) {
      console.log("error", error);
    }
  }
  get new_database() {
    return this.db.collection("new_database");
  }
}
const databaseService = new DatabaseService();
export default databaseService;
