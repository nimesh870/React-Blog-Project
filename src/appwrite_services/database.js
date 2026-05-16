import config from '../config.js'
import { Client , ID , Databases , Storage , Query } from "appwrite";

export class DatabaseService {

    cilent = new Client();
    databases;
    storage;

    constructor () {
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.projectId);

        this.databases = new Databases(this.client)
        this.storage = new Storage(this.client)
    }

    // create document
    async createPost ({title , slug , content , featuredImage , status , userId}) {
        // SDK fires HTTP POST request to Appwrite server
        try {
            return await this.databases.createDocument(
                config.databaseId,
                config.collectionId,
                slug, // document ID
                { // actual stored data
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            )
        }
        catch (error) {
            console.log("Appwrite service :: createPost :: error", error)
        }
    }

    // update document
    async updatePost (slug , {title , content , featuredImage , status , userId}) {
        // SDK fires HTTP PATCH request
        try {
            return await this.databases.updateDocument(
                config.databaseId,
                config.collectionId,
                slug,

                { // new updated values
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            )
        } 
        catch (error) {
            console.log("Appwrite service :: updatePost :: error", error)
        }
    }

    // delete document
    async deletePost (slug) {
        try {
            await this.databases.deleteDocument(
                config.databaseId,
                config.collectionId,
                slug,
            )
            return true // UI knows there's no document
        }
        catch (error) {
            console.log("Appwrite service :: deletePost :: error", error)
            return false
        }
    }

    async getPost (slug) {
        // HTTP GET request -> Fetch post using slug
        try {
            return await this.databases.getDocument(
                config.databaseId,
                config.collectionId,
                slug,
            )
        }
        catch (error) {
            console.log("Appwrite service :: getPost :: error", error)
            return false
        }
    }

    async getPosts (queries = [Query.equal('status' , 'active')]) {
        // fetches only post with status = active (filtering using query)
        try {
            return await this.databases.listDocuments(
                config.databaseId,
                config.collectionId,
                queries
            )
        }
        catch (error) {
            console.log("Appwrite service :: getPosts :: error", error)
            return false
        }
    }

    // file upload methods -> Storage Service
    async uploadFile (file) {
        try {
            return await this.storage.createFile(
                config.bucketId,
                ID.unique(), // file id
                file
            )
        } 
        catch (error) {
            console.log("Appwrite service :: uploadFile :: error", error)
            return false
        }
    }

    async deleteFile (fileId) {
        try {
            await this.storage.deleteFile(
                config.bucketId,
                fileId
            )
        } 
        catch (error) {
            console.log("Appwrite service :: deleteFile :: error", error)
            return false
        }
    }

    getFilePreview(fileId) {
        //  returns URL string of image from storage
        return this.storage.getFilePreview(
            config.bucketId,
            fileId
        )
    }
}

const databaseService = new DatabaseService();
export default databaseService;