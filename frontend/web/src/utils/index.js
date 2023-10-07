export const validateEmail = (userData = {}, setToggle = () => {}) => {
  var validRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (userData[`email`].match(validRegex)) {
    setToggle({
      val: false,
      message: "",
      severity: "",
    });
    return true;
  } else {
    return false;
  }
};

export const passwordValidate = (userData = {}, setToggle = () => {}) => {
  let reg =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/;
  if (userData[`password`].match(reg)) {
    setToggle({
      val: false,
      message: "",
      severity: "",
    });
    return true;
  } else {
    return false;
  }
};
