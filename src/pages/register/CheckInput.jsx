export default function checkInput(name, value) {
  if (name == "name") {
    return value.trim().length > 0;
  } else if (name == "email") {
    return value.includes("@");
  } else if (name == "phone") {
    return value.trim().length == 10 && !isNaN(value);
  } else if (name == "password") {
    return value.trim().length >= 6;
  }
}
