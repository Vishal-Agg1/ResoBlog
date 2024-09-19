import conf from "../../config/config";
import { Client, Account, ID } from "appwrite";
class auth{
     client = new Client();
     account;
     constructor(){
        this.client
           .setEndpoint(conf.appwriteurl)
           .setProject(conf.appwriteprojectid);
        this.account = new Account(this.client);
     }
     async createAccount({email,password,name}){
        try{
        const newAccount = await this.account.create(ID.unique(),email,password,name);
        if(newAccount){
            return this.login(email,password);
        }
        else{
            console.alert("Account creation failed");
        }
    }
    catch(error){
        throw error;
    }
     }
     async login({email,password}){
       try {
         const promise = await this.account.createEmailPasswordSession(email,password);
         if(promise){
            return promise;
         }
       } catch (error) {
        throw error;
       }
     }
     async Currentuser(){
      try {
         return await this.account.get();
      } catch (error) {
         throw error;
      }
      return null;
     }
     async logout(){
      try {
         await this.account.deleteSessions();
      } catch (error) {
         throw error;
      }
     }
}
const Auth = new auth();
export default Auth;