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

export const createNewTask = async (userId, data) => {
  const task = {
    ...data,
    userid: userId,
    completed: false,
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

// Get all completed tasks
export const getCompletedTasks = async (userId) => {
  try {
    const lists = await db.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.equal("userid", userId),
      Query.equal("completed", true),
      Query.orderDesc("$createdAt"),
    ]);
    return lists;
  } catch (error) {
    return error;
  }
};

// Get all pending tasks
export const getPendingTasks = async (userId) => {
  try {
    const lists = await db.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.equal("userid", userId),
      Query.equal("completed", false),
      Query.orderDesc("$createdAt"),
    ]);
    return lists;
  } catch (error) {
    return error;
  }
};

// Completed a task
export const completeTask = async (taskId) => {
  try {
    const task = await db.updateDocument(DATABASE_ID, COLLECTION_ID, taskId, {
      completed: true,
    });
    return task;
  } catch (error) {
    return error;
  }
};

// Completed a task
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

// find tasks by asc order
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

// find tasks by asc order
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
