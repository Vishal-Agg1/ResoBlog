import conf from "../../config/config";
import { Client, ID, Databases, Storage, Query } from "appwrite";
export class Service{
     client = new Client();
     databases;
     bucket;
     constructor(){
       this.client
       .setEndpoint(conf.appwriteurl)
       .setProject(conf.appwriteprojectid);
       this.databases = new Databases(this.client);
       this.bucket = new Storage(this.client);
     }
     async createpost({title, slug, content, featuredimage, status, userid}){
         try {
           
         } catch (error) {
           throw error;
         }
     }
}
const service = new Service();
export default service;