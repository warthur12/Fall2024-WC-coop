async function getUsers() {
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

      return data;
}

function parseUser(selectUser: string, users: any) {
  if (users.length == 0) {
    return ["Loading...", "Loading...", "Loading"];
  }
  let response: any[] = [];
  users.getUsers.forEach((user: { username: string; description: string; pfp: string }) => {
    if (user.username == selectUser) {
      response = [user.username, user.description, user.pfp]
    }
  });
  return response;
}

export { getUsers, parseUser };