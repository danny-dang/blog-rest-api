import * as bcrypt from 'bcrypt';

export const hashPassword = async (password) => {
  let password_salt = bcrypt.genSaltSync(10)
  let hashPassword = await bcrypt.hash(password, password_salt)
  return {
    password: hashPassword,
    password_salt
  }
}

export const comparePassword = async (password, userPassword) => {
  if (!userPassword) return false
  const isValid = await bcrypt.compare(password, userPassword)
  return isValid
}