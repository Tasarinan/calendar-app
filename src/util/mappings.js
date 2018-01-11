export const taskCategory = categories => task => {
  const category = categories.find(c => task.category === c._id) ||
    categories.find(c => c._id === 'default_category');
  return {
    ...task,
    category,
  }
}