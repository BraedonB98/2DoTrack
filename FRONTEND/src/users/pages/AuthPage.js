import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import Card from "../../shared/components/UIElements/Card";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import TermsOfServiceModal from "../components/TermsOfServiceModal";

import { AuthContext } from "../../shared/context/auth-context";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MAXLENGTH,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";

const AuthPage = () => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(true);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [termsOfService, setTermsOfService] = useState(false);
  const [displayTermsOfService, setDisplayTermsOfService] = useState(false);

  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const switchModeHandler = (event) => {
    if (!isLogin) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
          image: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: "",
            isValid: false,
          },
          phoneNumber: {
            value: "",
            isValid: false,
          },
        },
        false
      );
    }
    setIsLogin((prevMode) => !prevMode);
  };
  const authSubmitHandler = async (event) => {
    event.preventDefault();

    if (isLogin) {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_API_URL}/user/login`,
          "POST",
          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
          { "Content-Type": "application/json" }
        );
        auth.login(responseData._id, responseData.token);
        navigate("/");
      } catch (error) {}
    } else {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_API_URL}/user/createuser`,
          "POST",
          JSON.stringify({
            email: formState.inputs.email.value,
            name: formState.inputs.name.value,
            phoneNumber: formState.inputs.phoneNumber.value,
            password: formState.inputs.password.value,
          }),
          { "Content-Type": "application/json" }
        );
        auth.login(responseData._id, responseData.token);
        navigate("/");
      } catch (error) {}
    }
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {displayTermsOfService && (
        <TermsOfServiceModal
          onClear={() => {
            setDisplayTermsOfService(false);
          }}
        />
      )}
      <Card className="authentication">
        {isLoading && <LoadingSpinner asOverlay />}
        <h2>Login Required</h2>
        <hr />
        <form onSubmit={authSubmitHandler}>
          {!isLogin && (
            <Input
              element="input"
              id="name"
              type="text"
              label="Name"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a name."
              onInput={inputHandler}
            />
          )}
          {!isLogin && (
            <Input
              element="input"
              id="phoneNumber"
              type="text"
              label="Phone Number"
              validators={[VALIDATOR_MINLENGTH(10) && VALIDATOR_MAXLENGTH(10)]}
              errorText="Please enter a phone number."
              onInput={inputHandler}
            />
          )}
          <Input
            element="input"
            id="email"
            type="email"
            label="E-Mail"
            validators={[VALIDATOR_EMAIL()]}
            errorText="Please enter a valid email address."
            onInput={inputHandler}
          />
          <Input
            element="input"
            id="password"
            type="password"
            label="Password"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter a valid password."
            onInput={inputHandler}
          />
          {!isLogin && (
            <div>
              <div
                onClick={() => {
                  setDisplayTermsOfService(true);
                }}
              >
                <p>View Terms Of Service</p>
              </div>
              <input
                type="checkbox"
                id="termsOfService"
                name="termsOfService"
                value="Agree"
                onClick={(event) => {
                  termsOfService
                    ? setTermsOfService(false)
                    : setTermsOfService(true);
                }}
              />
              <label for="termsOfService">
                {" "}
                I Agree &nbsp;&nbsp;&nbsp;&nbsp;
              </label>
              <br />
              <br />
            </div>
          )}
          <Button
            type="submit"
            disabled={
              !formState.isValid || (!isLogin ? !termsOfService : false)
            }
          >
            {" "}
            {isLogin ? "LOGIN" : "SIGNUP"}{" "}
          </Button>
        </form>
        <br />
        <Button size="small" onClick={switchModeHandler}>
          {isLogin
            ? "new to todo finance? Click here to sign up"
            : "already have an account? Click here to log in"}
        </Button>
      </Card>
    </React.Fragment>
  );
};

export default AuthPage;
