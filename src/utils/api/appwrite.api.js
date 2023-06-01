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

// Create a new task
export const createNewTask = async (userId, data) => {
  const task = {
    ...data,
    userid: userId,
    completed: false,
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
      completed: true,
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

// Get tasks by status(pending/complete)
export const getTasksByStatus = async (userId, status) => {
  try {
    const lists = await db.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.equal("userid", userId),
      Query.equal("completed", status),
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

// find tasks by date
export const tasksByDate = async (userId, date) => {
  try {
    const list = await db.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.equal("userid", userId),
      Query.equal("created_at", date),
    ]);

    return list;
  } catch (error) {
    return error;
  }
};

// find tasks by priority
export const taskByPriority = async (userId, priorities) => {
  console.log(priorities);
  try {
    const list = await db.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.equal("userid", userId),
      Query.equal("priority", [...priorities]),
    ]);

    return list;
  } catch (error) {
    return error;
  }
};
