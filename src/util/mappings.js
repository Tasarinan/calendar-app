export const taskCategory = categories => task => {
  const category = categories.find(c => task.category === c._id);
  return {
    ...task,
    category,
  }
}