import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { jwt } from "better-auth/plugins";

const client = new MongoClient(process.env.MONGODB_URI!);
const db = client.db("fixmatedb");

export const auth = betterAuth({

  database: mongodbAdapter(db),

  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL,
  trustedOrigins: [process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"],

  emailAndPassword: { 
    enabled: true, 
    minPasswordLength: 6, 
    autoSignIn:false,
  },

  plugins: [jwt()],

  user: {
    additionalFields: {
      role: {
        type: "string",
        required: true,
        defaultValue: "customer",
        input: true,
      },
      phone: { type: "string", required: true, input: true },
      area: { type: "string", required: true, input: true },
      bio: { type: "string", required: false, input: true },
      photoURL: { type: "string", required: false, input: true },

    },
  },
});
