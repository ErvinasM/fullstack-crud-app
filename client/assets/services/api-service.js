const serverAddress = 'http://localhost:3000';

const getUsers = async () => {
  const response = await fetch(`${serverAddress}/users`);
  const users = await response.json();

  return users;
}

const ApiService = {
    getUsers,
};

export default ApiService;