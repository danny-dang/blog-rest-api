import { hashPassword } from "../../utils"
import { v4 as uuidv4 } from 'uuid';


export const getUsers = async () => {
  let users = global.users
  return users
}

export const getUserByUsername = async (username) => {
  let user = global.users.find(i => i.username === username)
  return user
}

export const getUserById = async (id) => {
  let user = global.users.find(i => i.id === id)
  return user
}

export const createUser = async (payload) => {
  try {
    let { username, password, name, role } = payload

    let hashedPassword = await hashPassword(password)

    let newId = uuidv4()
    let newUser = {
      id: newId,
      username,
      password: hashedPassword.password,
      name,
      role: role
    }

    global.users.push(newUser);
    return newUser

  } catch (error) {
    console.log(error)
  }
}

export const updateUserById = async (id, user) => {
  try {
    let existedUser = await getUserById(id)
    if (existedUser) {
      let updatedUser = {
        ...existedUser,
        ...user,
      }

      let itemIndex = global.users.findIndex(i => i?.id === id)
      let newList = [...prev.slice(0, itemIndex), updatedUser, ...prev.slice(itemIndex + 1)]
      global.users = newList
      return updatedUser
    }

  } catch (error) {
    console.log(error)
  }
  return
}