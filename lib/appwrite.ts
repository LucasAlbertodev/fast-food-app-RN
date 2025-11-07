import { Account, Avatars, Client, Databases, ID, Query, Storage, TablesDB } from 'react-native-appwrite';

export const appwriteConfig = {
    endpoint:process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!,
    platform: "com.lucas.foodapp",
    projectId:process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!,
    databaseId:'690c1556002c39cf63ef',
    bucketId:'690df560001942e6112e',
    userCollectionId: 'user',
    categoriesCollectionId: 'categories',
    menuCollectionId: 'menu',
    customizationCollectionId: 'customizations',
    menuCustomizationCollectionId: 'menu_customizations'
}

export const client =  new Client();

client
    .setEndpoint(appwriteConfig.endpoint)
    .setProject(appwriteConfig.projectId)
    .setPlatform(appwriteConfig.platform)

export const account = new Account(client);
export const tableDB = new TablesDB(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
const avatars = new Avatars(client);

interface CreateUserPrams {
    email: string;
    password: string;
    name: string;
}

export const createUser = async ({email, password, name}: CreateUserPrams) => {

    try {
        const newAccount = await account.create(ID.unique(), email,password,name)
        if(!newAccount) throw new Error;

        await signIn({email,password})

        const avatarUrl = avatars.getInitialsURL(name);

        return await tableDB.createRow({
            databaseId: appwriteConfig.databaseId,
            tableId: appwriteConfig.userCollectionId,
            rowId: ID.unique(),
            data: {email,name, accountId: newAccount.$id, avatar:avatarUrl }
        })

    } catch (error) {
        throw new Error(error as string)
    }
}

interface SignInParams {
    email: string;
    password: string;
}
export const signIn = async ({email, password}:SignInParams) => {
    try {
        const session = await account.createEmailPasswordSession({email,password})
    } catch (error) {
        console.log(error)
        throw new Error(error as string)
    }
}

export const getCurrentUser = async() => {
    try {
        const currentAccount = await account.get();
        if(!currentAccount) throw new Error;

        const currentUser = await tableDB.listRows({
            databaseId: appwriteConfig.databaseId,
            tableId: appwriteConfig.userCollectionId,
            queries: [
                Query.equal('accountId', currentAccount.$id)
                ]
        });

        if(!currentUser) throw Error;

        return currentUser.rows[0]
        
    } catch (error) {
        console.log(error)
        throw new Error(error as string)
    }
}

interface GetMenuParams {
    category: string;
    query: string;
}

export const getMenu = async({category, query}:GetMenuParams) => {
    try {
        const queries:string[] = [];

        if(category) queries.push(Query.equal('categories', category));
        if(query) queries.push(Query.search('name', query));

        const menus = await tableDB.listRows({
            databaseId: appwriteConfig.databaseId,
            tableId: appwriteConfig.menuCollectionId,
            queries
        })

        return menus.rows;
    } catch (error) {
        throw new Error(error as string);
    }
};

export const getCategories = async () => {
    try {
        const categories = await tableDB.listRows({
            databaseId:appwriteConfig.databaseId,
            tableId:appwriteConfig.categoriesCollectionId
        })

        return categories.rows;
    } catch (error) {
        throw new Error(error as string);
    }
}