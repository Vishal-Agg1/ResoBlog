import conf from "../../config/config";
import { Client, Account, ID } from "appwrite";
export class AuthService {
   client = new Client();
   account;

   constructor() {
       this.client
           .setEndpoint(conf.appwriteurl)
           .setProject(conf.appwriteprojectid);
       this.account = new Account(this.client);
           
   }

   async createAccount({ email, password, name }) {
    try {
        const userAccount = await this.account.create(ID.unique(), email, password, name);
        console.log("Account created:", userAccount); // Check account creation response
        if (userAccount) {
            const loginResponse = await this.login({ email, password });
            console.log("Login response:", loginResponse); // Check login response
            return loginResponse;
        } else {
            return userAccount;
        }
    } catch (error) {
        console.error("Create Account Error:", error);
        throw error;
    }
}

async login({ email, password}) {
    try {
        const session = await this.account.createEmailPasswordSession(email, password);
        console.log("Session created:", session); // Check if session is created
        return session;
    } catch (error) {
        console.error("Login error:", error);
        throw error;
    }
}

   async getCurrentUser() {
       try {
           return await this.account.get();
       } catch (error) {
           console.log("Appwrite serive :: getCurrentUser :: error", error);
       }

       return null;
   }

   async logout() {

       try {
           await this.account.deleteSessions();
       } catch (error) {
           console.log("Appwrite serive :: logout :: error", error);
       }
   }
}

const Auth = new AuthService();
export default Auth;