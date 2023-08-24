import { Client, Account, Databases, ID, Query} from 'appwrite';

const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_URL) // Your API Endpoint
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);

const account = new Account(client);


const databases = new Databases(client);


export default {client, account, ID, databases, Query};





