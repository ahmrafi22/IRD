
import Database from "better-sqlite3";
import path from "path";
import fs from "fs"; 

const PERSISTENT_DISK_MOUNT_PATH = process.env.SQLITE_DB_DIR || "/var/data"; 


const dbDirectory = path.resolve(PERSISTENT_DISK_MOUNT_PATH);
if (!fs.existsSync(dbDirectory)) {
  fs.mkdirSync(dbDirectory, { recursive: true });
}

const dbPath = path.join(dbDirectory, "dua_main.sqlite");

console.log(`SQLite database path: ${dbPath}`); 

const db = new Database(dbPath);


export default db;