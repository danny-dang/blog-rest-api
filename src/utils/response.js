export const baseResponse = (message, data, statusCode) => {
  return {
    message: message,
    data: data,
  };
}

export function cleanSecretFields(user) {
  let clone = JSON.parse(JSON.stringify(user))
  if (clone.password) {
    delete clone.password
  }

  return clone
}