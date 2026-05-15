import config from '../config.js'
import { Client, Account, ID } from "appwrite";

export class AuthService {

    client = new Client();
    account;

    //  runs automatically when the class is instantiated
    constructor () {
        // setting connection to the appwrite server
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.projectId);

        // creating an account service
        this.account = new Account(this.client)
    }

    // creating user account
    async createUserAccount ({email , password , name}) {
        try {
            const userAccont = await this.account.create(ID.unique() , email , password , name)

            if (userAccont) {
                // login to the account direct if userAccount exist
                return this.login({email , passowrd}) // calling another method i.e login
            } 
            else {
                return userAccont;
            }
        }
        catch (error) {
            throw error;
        }
    }

    // login
    async login ({email , password}) {
        try {
            const userLogin = await this.account.createEmailPasswordSession(email , password)
            return userLogin;
        }
        catch (error) {
            throw error;
        }
    }

    async logout () {
        try {
            return await this.account.deleteSessions()
        }
        catch (error) {
            throw error;
        }
    }

    async getUser() {
        try {
            return await this.account.get()
        }
        catch (error) {
            return null;
        }
    }
}

const authService = new AuthService();

export default authService;