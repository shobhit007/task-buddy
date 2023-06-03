import {
  Client,
  Account,
  ID,
  Databases,
  Permission,
  Role,
  Query,
} from "appwrite";

const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("646efe5a986505dc2bba");

const account = new Account(client);

const db = new Databases(client);

const DATABASE_ID = "6472f275b59ed08821bc";
const COLLECTION_ID = "6472f40c812bc42aa03a";
const LIST_COLLECTION_ID = "647b2931a770730c8329";

// Create an account
export const createUserAccount = (email, password, name) =>
  account.create(ID.unique(), email, password, name);

// Create email session
export const createUserSession = (email, password) =>
  account.createEmailSession(email, password);

// Get current user
export const getUserAccount = () => account.get();

// Delete current session to logout user
export const deleteCurrentSession = () => account.deleteSession("current");

// Create a new task
export const createNewTask = async (userId, data) => {
  const {
    title,
    description,
    selectedList: { id: list_id, name: list_name },
  } = data;

  const task = {
    title,
    description,
    list_name,
    list_id,
    userid: userId,
    created_at: new Date().toLocaleDateString(),
  };
  try {
    const doc = await db.createDocument(
      DATABASE_ID,
      COLLECTION_ID,
      ID.unique(),
      task,
      [Permission.write(Role.user(userId))]
    );
    return doc;
  } catch (error) {
    return error;
  }
};

// Update a task by completing
export const completeTask = async (taskId) => {
  try {
    const task = await db.updateDocument(DATABASE_ID, COLLECTION_ID, taskId, {
      status: "complete",
    });
    return task;
  } catch (error) {
    return error;
  }
};

// Delate a task
export const deleteTask = async (taskId) => {
  try {
    await db.deleteDocument(DATABASE_ID, COLLECTION_ID, taskId);
  } catch (error) {
    return error;
  }
};

// update a task
export const updateTask = async (taskId, data) => {
  try {
    const task = await db.updateDocument(
      DATABASE_ID,
      COLLECTION_ID,
      taskId,
      data
    );
    return task;
  } catch (error) {
    return error;
  }
};

// Get all tasks
export const getListOfTasks = async (userId) => {
  try {
    const lists = await db.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.equal("userid", userId),
      Query.orderDesc("$createdAt"),
    ]);
    return lists;
  } catch (error) {
    return error;
  }
};

// find tasks in asc order by createdAt
export const tasksAscByDate = async (userId) => {
  try {
    const list = await db.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.equal("userid", userId),
      Query.orderAsc("$createdAt"),
    ]);
    return list;
  } catch (error) {
    return error;
  }
};

// find tasks in desc order by createdAt
export const tasksDescByDate = async (userId) => {
  try {
    const list = await db.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.equal("userid", userId),
      Query.orderDesc("$createdAt"),
    ]);
    return list;
  } catch (error) {
    return error;
  }
};

// Filter tasks
export const filterTaskList = async (userId, filters) => {
  const queries = Object.keys(filters).reduce((acc, key) => {
    if (key === "status" && filters[key].length) {
      acc.push(Query.equal("status", filters[key]));
    } else if (key === "selectedDate" && filters[key] !== null) {
      acc.push(Query.equal("created_at", filters[key].toLocaleDateString()));
    } else if (key === "priorities" && filters[key].size > 0) {
      acc.push(Query.equal("priority", [...filters[key]]));
    }
    return acc;
  }, []);

  try {
    const list = await db.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.equal("userid", userId),
      ...queries,
    ]);
    return list;
  } catch (error) {
    return error;
  }
};

/////////////////////////////////////////////////////////////////////////////
//List

//Create a new List
export const createList = async (userid, listName) => {
  try {
    const list = await db.createDocument(
      DATABASE_ID,
      LIST_COLLECTION_ID,
      ID.unique(),
      { userid, list_name: listName },
      [Permission.write(Role.user(userid))]
    );
    return list;
  } catch (error) {
    return error;
  }
};

//Get user's all lists
export const getUserLists = async (userid) => {
  try {
    const lists = await db.listDocuments(DATABASE_ID, LIST_COLLECTION_ID, [
      Query.equal("userid", userid),
    ]);
    return lists;
  } catch (error) {
    return error;
  }
};
