export const baseResponse = (message, data, statusCode) => {
  return {
    message: message,
    data: data,
  };
}

export function cleanSecretFields(user) {
  if (user.password) {
    delete user.password
    delete user.stripeCustomerId
  }
  if (user.subscriptions) {
    user.subscriptions.forEach((i) => { delete i.stripeSubscriptionId });
  }
  return user
}