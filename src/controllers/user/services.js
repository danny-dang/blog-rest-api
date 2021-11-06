import { hashPassword } from "../../utils"
import { v4 as uuidv4 } from 'uuid';

export const getUserByEmail = async (email) => {
  try {
    const query = await global.firestore.collection('users').where("email", "==", email).get()
    if (!query.empty) {
      return query.docs[0].data()
    }
  } catch (error) {
    console.log(error)
  }
  return
}

export const getUserById = async (id) => {
  try {
    const query = await global.firestore.collection('users').doc(id).get();
    if (query.exists) {
      return query.data()
    }
  } catch (error) {

  }
  return
}

export const createUser = async (email, password) => {
  try {
    let hashedPassword = await hashPassword(password)

    let newId = uuidv4()
    let newUser = {
      id: newId,
      email: email,
      password: hashedPassword.password,
    }

    await firestore.collection('users').doc(newId).set(newUser);
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
      await firestore.collection('users').doc(id).update(updatedUser);
      return updatedUser
    }

  } catch (error) {
    console.log(error)
  }
  return
}