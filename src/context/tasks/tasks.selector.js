export const lengthOfPendingTasks = (taskList) => {
  const filteredPendingTasks = taskList.filter(
    (task) => task.status === "pending"
  );
  return filteredPendingTasks.length;
};
