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
           return await this.databases.createDocument(
            conf.appwritedatabaseid,
            conf.appwritecollectionid,
            slug,
            {
            title,content,featuredimage,status,userid,})
         } catch (error) {
           throw error;
         }
     }
     async updatepost({title, slug, content, featuredimage, status}){
      try {
        return await this.databases.updateDocument(
          conf.appwritedatabaseid,
          conf.appwritecollectionid,
          slug,
          {
            title,
            content,
            featuredimage,
            status,
          }
        )
      } catch (error) {
        console.log(error);
      }
     }
     async deletedoc(slug){
      try {
        await this.databases.deleteDocument(
          conf.appwritedatabaseid,
          conf.appwritecollectionid,
          slug
        )
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
     }
     async post(slag){
      try {
        return await this.databases.getDocument(
          conf.appwritedatabaseid,
          conf.appwritecollectionid,
          slag,
        )
      } catch (error) {
        console.log(error);
      }
     }
     async allpost(){
      try {
        return this.databases.listDocuments(
          conf.appwritedatabaseid,
          conf.appwritecollectionid,
        )
      } catch (error) {
        console.log(error);
      }
     }
}
const service = new Service();
export default service;