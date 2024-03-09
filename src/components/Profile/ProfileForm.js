import { useRef } from "react";
import classes from "./ProfileForm.module.css";

const ProfileForm = () => {
  const myKey = "";
  const changePasswordRef = useRef();
  const changePasswordHandler = async (e) => {
    e.preventDefault();
    const newPassword = changePasswordRef.current.value;
    if (newPassword.length > 7) {
      try {
        const myTokenId = localStorage.getItem("token");
        const response = await fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:update?key=" +
            myKey,
          {
            method: "POST",
            body: JSON.stringify({
              idToken: myTokenId,
              password: newPassword,
              returnSecureToken: true,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        if (!data.error) alert("Password Updated Successfully");
        else throw data.error;
      } catch (error) {
        alert(error.message);
      }
    } else {
      alert("Enter Password Should have more than 7 characters");
    }
  };
  return (
    <form className={classes.form}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input type="password" id="new-password" ref={changePasswordRef} />
      </div>
      <div className={classes.action}>
        <button onClick={changePasswordHandler}>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
