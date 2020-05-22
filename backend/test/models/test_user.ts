import { User } from "../../models/user.ts";
import { db } from "../db.ts";

db.link([User]);
try {
  await db.sync();
} catch {}

await User.create({ name: "Willem" });
console.log(await User.where("name", "Willem").first());
await db.close();
