import {
  Client,
  Account,
  ID,
  Databases,
  Permission,
  Role,
  Query,
} from "appwrite";

export const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("646efe5a986505dc2bba");

const account = new Account(client);

const db = new Databases(client);

const DATABASE_ID = "6472f275b59ed08821bc";
const COLLECTION_ID = "647de6c2d35a22e34b6a";
const LIST_COLLECTION_ID = "647b2931a770730c8329";
const LINEUPS_COLLECTION_ID = "64869cfa95fba0236423";

export const listenChanges = (callback) =>
  client.subscribe(
    [
      "databases.6472f275b59ed08821bc.collections.647de6c2d35a22e34b6a.documents",
      "databases.6472f275b59ed08821bc.collections.647b2931a770730c8329.documents",
      "databases.6472f275b59ed08821bc.collections.64869cfa95fba0236423.documents",
    ],
    callback
  );

export const lineups = async (userid) => {
  return await db.listDocuments(DATABASE_ID, LINEUPS_COLLECTION_ID, [
    Query.equal("userid", userid),
    Query.orderDesc("$createdAt"),
  ]);
};

export const createLineup = async (userid, taskid) => {
  return await db.createDocument(
    DATABASE_ID,
    LINEUPS_COLLECTION_ID,
    ID.unique(),
    { userid, taskid }
  );
};

export const deleteLineUp = async (lineupId) => {
  return await db.deleteDocument(DATABASE_ID, LINEUPS_COLLECTION_ID, lineupId);
};

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

// Update task priority
export const updateTaskPriority = async (taskId, priority) =>
  await db.updateDocument(DATABASE_ID, COLLECTION_ID, taskId, { priority });

// Update task status
export const updateTaskStatus = async (taskId, status) =>
  await db.updateDocument(DATABASE_ID, COLLECTION_ID, taskId, { status });

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
    console.log(console.log(error));
    return error;
  }
};

// Get all tasks by list id
export const getListOfTasksByListId = async (userId, listId) => {
  try {
    const lists = await db.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.equal("userid", userId),
      Query.equal("list_id", listId),
      Query.orderDesc("$createdAt"),
    ]);
    return lists;
  } catch (error) {
    return error;
  }
};

// Filter tasks
export const filterTaskList = async (userId, filters, sorting = null) => {
  const queries = Object.keys(filters).reduce((acc, key) => {
    if (key === "status" && filters[key]?.length) {
      acc.push(Query.equal("status", filters[key]));
    } else if (key === "selectedDate" && filters[key]?.length) {
      acc.push(Query.equal("created_at", filters[key]));
    } else if (key === "priorities" && filters[key]?.size > 0) {
      acc.push(Query.equal("priority", [...filters[key]]));
    }
    return acc;
  }, []);

  if (filters.list_id) {
    queries.push(Query.equal("list_id", filters.list_id));
  }

  if (sorting) {
    [...sorting].forEach((sort) => {
      const key = sort[0];
      const order = sort[1];
      if (key === "status") {
        order === "asc"
          ? queries.push(Query.orderAsc(key))
          : queries.push(Query.orderDesc(key));
      } else if (key === "priority") {
        order === "desc"
          ? queries.push(Query.orderDesc(key))
          : queries.push(Query.orderAsc(key));
      } else if (key === "created_at") {
        order === "asc"
          ? queries.push(Query.orderAsc("$createdAt"))
          : queries.push(Query.orderDesc("$createdAt"));
      }
    });
  }
  return await db.listDocuments(DATABASE_ID, COLLECTION_ID, [
    Query.equal("userid", userId),
    ...queries,
  ]);
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

// Delete a list
export const deleteList = async (listId) => {
  return await db.deleteDocument(DATABASE_ID, LIST_COLLECTION_ID, listId);
};

// Update a list
export const updateList = async (listId, data) => {
  return await db.updateDocument(DATABASE_ID, LIST_COLLECTION_ID, listId, data);
};

//Get all lists/categories
export const getLists = async (userid) => {
  try {
    const lists = await db.listDocuments(DATABASE_ID, LIST_COLLECTION_ID, [
      Query.equal("userid", userid),
    ]);
    return lists;
  } catch (error) {
    return error;
  }
};
