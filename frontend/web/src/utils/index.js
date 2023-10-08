import { setActiveLoader } from "../redux/reducer/userSlider";
import store from "../redux/store";

export const validateEmail = (userData = {}, setToggle = () => {}) => {
  var validRegex =
    /^[-a-z0-9~!$%^&*_=+}{'?]+(\.[-a-z0-9~!$%^&*_=+}{'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;

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

export const delayFunction = (callBack = () => {}, timer = 0) => {
  store.dispatch(setActiveLoader(true));
  setTimeout(() => {
    callBack();
  }, timer);
};
