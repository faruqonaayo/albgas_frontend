import { useState } from "react";

// importing custom components
import Container from "../../components/Container/Container";
import Form from "../../components/Form/Form";
import Label from "../../components/Label/Label";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import Select from "../../components/Select/Select";
import Option from "../../components/Option/Option";

// importing styles
import "./Auth.css";

export default function Auth() {
  const [formType, setFormType] = useState("login");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [addressProvince, setAddressProvince] = useState("");
  const [address, setAddress] = useState("");
  const [occupation, setOccupation] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  function handleAuthFormSubmition(event) {
    event.preventDefault();
  }

  function handleFormTypeChange() {
    setFormType((c) => {
      if (c === "login") {
        return "register";
      }
      return "login";
    });
  }
  return (
    <div className="Auth">
      <Container className="auth-form-container">
        <h1 className="logo">AlbGas</h1>
        <Form
          onSubmitFunction={handleAuthFormSubmition}
          className={"auth-form"}
        >
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
          {/* fields to display if form is a register form */}
          {formType === "register" && (
            <>
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
                <Label labelFor={"lastName"} labelText={"Last Name: "} />
                <Input
                  inputType={"text"}
                  inputName={"lastName"}
                  inputPlaceholder={"Enter your last name"}
                  inputValue={lastName}
                  onChangeFunction={setLastName}
                />
              </Container>
              <Container className={"label-input-container"}>
                <Label labelFor={"gender"} labelText={"Gender: "} />
                <Select selectValue={gender} onChangeFunction={setGender}>
                  <Option optionText={""} />
                  <Option optionText={"male"} />
                  <Option optionText={"female"} />
                </Select>
              </Container>

              <Container className={"label-input-container"}>
                <Label
                  labelFor={"addressProvince"}
                  labelText={"Address Province: "}
                />
                <Select
                  selectValue={addressProvince}
                  onChangeFunction={setAddressProvince}
                >
                  <Option optionText={""} />
                  <Option optionText={"Alberta"} />
                  <Option optionText={"British Columbia"} />
                  <Option optionText={"Manitoba"} />
                  <Option optionText={"New Brunswick"} />
                  <Option optionText={"Newfoundland and Labrador"} />
                  <Option optionText={"Nova Scotia"} />
                  <Option optionText={"Ontario"} />
                  <Option optionText={"Prince Edward Island"} />
                  <Option optionText={"Quebec"} />
                  <Option optionText={"Saskatchewan"} />
                </Select>
              </Container>
              <Container className={"label-input-container"}>
                <Label labelFor={"address"} labelText={"Address: "} />
                <Input
                  inputType={"text"}
                  inputName={"address"}
                  inputPlaceholder={"Enter your address"}
                  inputValue={address}
                  onChangeFunction={setAddress}
                />
              </Container>
              <Container className={"label-input-container"}>
                <Label labelFor={"occupation"} labelText={"Occupation: "} />
                <Input
                  inputType={"text"}
                  inputName={"occupation"}
                  inputPlaceholder={"Enter your occupation"}
                  inputValue={occupation}
                  onChangeFunction={setOccupation}
                />
              </Container>
            </>
          )}

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

          {/* fields to display if form is a register form */}
          {formType === "register" && (
            <Container className={"label-input-container"}>
              <Label labelFor={"cPassword"} labelText={"Confirm Password: "} />
              <Input
                inputType={"password"}
                inputName={"cPassword"}
                inputPlaceholder={"Confirm your password"}
                inputValue={cPassword}
                onChangeFunction={setCPassword}
              />
            </Container>
          )}

          <label className="change-form" onClick={handleFormTypeChange}>
            {formType === "login" ? "Not a user" : "Already a user"}
          </label>
          <Button
            buttonText={formType === "login" ? "Login" : "Register"}
            buttonType={"submit"}
            className={"auth-submit-button"}
          />
        </Form>
      </Container>
    </div>
  );
}
