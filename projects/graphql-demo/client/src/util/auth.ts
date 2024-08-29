async function getAllUsers() {
    const { data } = await fetch('http://localhost:4000/', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `
        query GetUsers {
          getUsers {
            id
            description
            password
            username
            pfp
          }
        }
      `,
        }),
        next: { revalidate: 10 },
      }).then((res) => res.json());

      return data.getUsers;
}

function parseUser(selectUser: string, users: any) {
  if (users.length == 0) {
    return ["Loading...", "Loading...", "Loading"];
  }
  let response: any[] = [];
  users.forEach((user: { username: string; description: string; pfp: string }) => {
    if (user.username == selectUser) {
      response = [user.username, user.description, user.pfp]
    }
  });
  return response;
}

export { getAllUsers, parseUser };