export type Auth = {
  email: string,
  password: string,
}

export type Signup = {
  name: string,
  surname: string,
  email: string,
  avatar: string,
  password: string,
}

export type User = {
  id?: string,
  name: string,
  surname: string,
  email: string,
  avatar: string,
  password?: string,
  token?: string,
}
