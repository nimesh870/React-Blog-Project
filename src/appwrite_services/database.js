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
        try {
            return await this.databases.createDocument(
                config.databaseId,
                config.collectionId,
                slug,
                {
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
        try {
            return await this.databases.updateDocument(
                config.databaseId,
                config.collectionId,
                slug,

                {
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
            return true
        }
        catch (error) {
            console.log("Appwrite service :: deletePost :: error", error)
            return false
        }
    }

    async getPost (slug) {
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
        try {
            return await this.databases.listDocuments(
                config.appwriteUrl,
                config.collectionId,
                queries
            )
        }
        catch (error) {
            console.log("Appwrite service :: getPosts :: error", error)
            return false
        }
    }

    // file upload methods
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
            onsole.log("Appwrite service :: deleteFile :: error", error)
            return false
        }
    }

    getFilePreview(fileId) {
        return this.databases.storage.getFilePreview(
            config.bucketId,
            fileId
        )
    }
}

const databaseService = new DatabaseService();
export default databaseService;