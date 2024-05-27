let users = [];
let currentId = 1;

module.exports = {
  getUsers: async () => {
    return users;
  },
  getUser: async (id) => {
    return users.find((user) => user.id === id);
  },
  addUser: async (user) => {
    user.id = currentId++;
    users.push(user);
    return user;
  },
  deleteUser: async (id) => {
    const index = users.findIndex((user) => user.id === id);
    if (index > -1) {
      const user = users.splice(index, 1)[0];
      return user;
    } else {
      return null;
    }
  },
  updateUser: async (id, user) => {
    const index = users.findIndex((u) => u.id === id);
    if (index > -1) {
      Object.assign(users[index], user);
      return users[index];
    } else {
      return null;
    }
  },
  getCurrentId: async () => {
    return currentId;
  },
};
