const serverAddress = 'http://localhost:3000';

const getUsers = async () => {
  const response = await fetch(`${serverAddress}/users`);
  const users = await response.json();

  return users;
}

const getContent = async () => {
  const response = await fetch(`${serverAddress}/content`);
  const contents = await response.json();

  return contents;
}

const deleteContent = async (id) => {
  const response = await fetch(`${serverAddress}/content/${id}`, {
    method: 'DELETE'
  });
  const contents = await response.json();

  return contents;
}

const createContent = async (contentProps) => {
  const response = await fetch(`${serverAddress}/content`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "accept": "application/json"
    },
    body: JSON.stringify(contentProps)
  });
  const contents = await response.json();

  return contents;
}

const updateContent = async (id, contentProps) => {
  const response = await fetch(`${serverAddress}/content/${id}`, {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json",
      "accept": "application/json"
    },
    body: JSON.stringify(contentProps)
  });
  const contents = await response.json();

  return contents;
}


const ApiService = {
    getUsers,
    getContent,
    deleteContent,
    createContent,
    updateContent,
};

export default ApiService;