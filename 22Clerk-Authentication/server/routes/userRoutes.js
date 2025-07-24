import express from "express";
import { requireAuth, getAuth, clerkClient } from "@clerk/express";
import { User } from "../models/User.js";

const router = express.Router();
router.post("/sync", requireAuth(), async (req, res) => {
  try {
    const { userId } = getAuth(req);
    console.log("Syncing user with Clerk ID:", userId);

    let user = await User.findOne({ clerkId: userId });
    if (!user) {
      console.log("User not found in DB. Fetching from Clerk...");
      const clerkUser = await clerkClient.users.getUser(userId);
      console.log("Clerk User Data:", clerkUser);

      user = new User({
        clerkId: clerkUser.id,
        email: clerkUser.emailAddresses[0]?.emailAddress,
        name: `${clerkUser.firstName || ""} ${clerkUser.lastName || ""}`,
      });
      await user.save();
      console.log("User saved to DB.");
    }

    res.json(user);
  } catch (error) {
    console.error("Sync Error:", error);
    res.status(500).json({ error: error.message });
  }
});

router.get("/me", requireAuth(), async (req, res) => {
  try {
    const { userId } = getAuth(req);
    console.log("Fetching user from DB with Clerk ID:", userId);
    const user = await User.findOne({ clerkId: userId });
    if (!user) return res.status(404).json({ error: "User not found in DB" });
    res.json(user);
  } catch (error) {
    console.error("ME Error:", error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
