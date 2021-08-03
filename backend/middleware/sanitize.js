/* This Sanitize module permits
to remove all the potentially dangerous
special char of each textual
data given by the user  */

const sanitize = (obj) => {
  Object.keys(obj).forEach(key => {
    if (typeof obj[key] === "string" && key !== "imageUrl") {
      const regex = /[@#$%&\/?!|*+)(}{=._<"^\[\]]/g
      obj[key] = obj[key].replace(regex, '')
    }
  })
  return obj
}

module.exports = {sanitize}