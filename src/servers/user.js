export const users = [];

export function AddUser({ name, cpf, numberTable }) {
  const existingUser = users.find((user) => user.cpf === cpf);

  if (existingUser) {
    return { error: "existing user" };
  }
  const user = {
    name,
    cpf,
    numberTable,
  };
  users.push(user);
}
export function getUser(cpf) {
  return users.find((user) => user.cpf === cpf);
}

export default { AddUser, getUser, users };
