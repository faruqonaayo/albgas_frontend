import PropTypes from "prop-types";
import axios from "axios";
import { useState, useEffect } from "react";

// importing my components
import Container from "../../../components/Container/Container";
import Form from "../../../components/Form/Form";
import Input from "../../../components/Input/Input";
import Label from "../../../components/Label/Label";
import Button from "../../../components/Button/Button";

// importing styles
import "./Profile.css";

export default function Profile({ onAuthenticate, serverUrl }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    async function getUserProfile() {
      try {
        const response = await axios.get(`${serverUrl}/admin/profile`, {
          headers: {
            Authorization: `Bearer:${localStorage.getItem("albGasToken")}`,
          },
        });

        // set the user profile details to what is returned from the server
        setFirstName(response.data.profile.firstName);
        setLastName(response.data.profile.lastName);
        setEmail(response.data.profile.email);
      } catch (error) {
        console.log(error);
        if (error.response.data.statusCode === 401) {
          localStorage.removeItem("albGasToken");
          onAuthenticate(false);
        }
      }
    }
    getUserProfile();
  }, []);

  async function handleUpdateProfileForm(event) {
    try {
      event.preventDefault();

      if (
        firstName.length >= 2 &&
        lastName.length >= 2 &&
        password.length >= 7 &&
        cPassword === password
      ) {
        const response = await axios.patch(
          `${serverUrl}/admin/profile/update`,
          {
            firstName,
            lastName,
            email,
            password,
            cPassword,
          },
          {
            headers: {
              Authorization: `Bearer:${localStorage.getItem("albGasToken")}`,
            },
          }
        );

        // set the success message and clear the error message
        setErrorMessage("");
        setSuccessMessage(response.data.message);

        // reset the password and confirm password fields
        setPassword("");
        setCPassword("");
      } else {
        setErrorMessage("Please fill all fields correctly");
      }
    } catch (error) {
      console.log(error);
      if (error.response.data.statusCode === 401) {
        localStorage.removeItem("albGasToken");
        onAuthenticate(false);
      }
      setErrorMessage(error.response.data.message);
      setSuccessMessage("");
    }
  }

  return (
    <Container className={"profile"}>
      <h1 className="content-title">Profile</h1>

      <Container className={"profile-details"}>
        <img
          src="../../../public/avatar.png"
          title="avatar"
          className="avatar-icon"
        />
        <h2>
          {firstName} {lastName}
        </h2>
        <Form
          className={"profile-form"}
          onSubmitFunction={handleUpdateProfileForm}
        >
          {/* Error and success message */}
          {/* error and success message container */}
          <Container
            className={
              errorMessage && !successMessage
                ? "error-message"
                : successMessage && !errorMessage && "success-message"
            }
          >
            <p className={"message"}>
              {errorMessage && !successMessage
                ? errorMessage
                : successMessage && !errorMessage && successMessage}
            </p>
          </Container>

          <Container className={"label-input-container"}>
            <Label labelFor={"firstName"} labelText={"First Name: "} />
            <Input
              inputType={"text"}
              inputName={"firstName"}
              inputPlaceholder={"Enter your first name"}
              inputValue={firstName}
              onChangeFunction={setFirstName}
            />
          </Container>
          <Container className={"label-input-container"}>
            <Label labelFor={"lastNmae"} labelText={"Last Name: "} />
            <Input
              inputType={"text"}
              inputName={"lastName"}
              inputPlaceholder={"Enter your last name"}
              inputValue={lastName}
              onChangeFunction={setLastName}
            />
          </Container>
          <Container className={"label-input-container"}>
            <Label labelFor={"email"} labelText={"Email: "} />
            <Input
              inputType={"email"}
              inputName={"email"}
              inputPlaceholder={"Enter your email"}
              inputValue={email}
              onChangeFunction={setEmail}
            />
          </Container>
          <Container className={"label-input-container"}>
            <Label labelFor={"password"} labelText={"Password: "} />
            <Input
              inputType={"password"}
              inputName={"password"}
              inputPlaceholder={"Enter your password"}
              inputValue={password}
              onChangeFunction={setPassword}
            />
          </Container>
          <Container className={"label-input-container"}>
            <Label labelFor={"cPassword"} labelText={"Confirm Password: "} />
            <Input
              inputType={"password"}
              inputName={"cPassword"}
              inputPlaceholder={"Confirm your password"}
              inputValue={cPassword}
              onChangeFunction={setCPassword}
            />
            <Button
              buttonText={"Update Profile"}
              className={"update-profile-button"}
            />
          </Container>
        </Form>
      </Container>
    </Container>
  );
}

Profile.propTypes = {
  onAuthenticate: PropTypes.func,
  serverUrl: PropTypes.string,
};
