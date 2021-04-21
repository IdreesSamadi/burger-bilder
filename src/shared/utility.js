export const updateObject = (oldObj, newObj) => {
  return {
    ...oldObj,
    ...newObj
  }
}

export const checkValidity = (rules, value) => {
  let isValid = true
  if (!rules) {
    return true
  }
  if (rules.required) {
    isValid = value.trim() !== '' && isValid
  }
  if (rules.minLength) {
    isValid = value.length >= 5 && isValid
  }
  if (rules.maxLength) {
    isValid = value.length <= 5 && isValid
  }
  if (rules.isEmail) {
    const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    isValid = pattern.test(value) && isValid
  }
  return isValid
}