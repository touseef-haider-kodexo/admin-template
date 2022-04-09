import React, { useState, useEffect } from "react";
import * as yup from "yup";
import { Formik } from "formik";
import { Link } from "react-router-dom";
import { useInjectSaga } from "redux-injectors";
import { useDispatch, useSelector } from "react-redux";
import { useMutation } from "react-query";
import Chip from "@material-ui/core/Chip";

import close from "@/assets/images/close.svg";
import TextInput from "@/components/Input";
import PasswordInput from "@/components/Input/PasswordInput";
import Button from "@/components/Button";
import NotificationStatus from "@/components/Notification";
import back from "@/assets/images/back.webp";
import AuthService from "@/services/api/auth-service";
import storage from "@/utils/storage";
import { EMAIL_REG_EXP } from "@/utils/constants";

import { errorsSelector } from "./selectors";
import { login, reset_errors } from "./actions";
import saga from "./saga";
import { key } from "./constants";
import * as S from "./styled";

function useFormProgress() {
  const [currentStep, setCurrentStep] = useState(0);

  function goForward() {
    setCurrentStep(currentStep + 1);
  }

  function goBack() {
    setCurrentStep(currentStep - 1);
  }

  return [currentStep, goForward, goBack];
}

function PageLogin() {
  const [email, setEmail] = useState("");
  const [backCount, setBackCount] = useState(0);

  const global_error = useSelector(errorsSelector);
  // eslint-disable-next-line
  const currentUser = useSelector(({ global }) => ({
    global: { currentUser },
  }));

  const dispatch = useDispatch();

  useInjectSaga({ key, saga });

  const emailSchema = yup.object().shape({
    email: yup
      .string()
      .min(6, "too short")
      .max(140, "too long")
      .matches(EMAIL_REG_EXP, "Invalid email")
      .required("*email is required"),
  });

  useEffect(() => {
    const claimId = storage.get("claimId");
    if (claimId) {
      storage.clear();
    }
  }, []);

  useEffect(() => {
    window.document.title = "Dent Doc - Log In";
    return () => {
      window.document.title = "Dent Doc Connect";
    };
  }, []);

  const passwordSchema = yup.object().shape({
    password: yup
      .string()
      .min(8, "too short")
      .max(80, "too long")
      .required("*Please enter your password to login"),
  });
  // eslint-disable-next-line
  const validate_email = useMutation(
    // eslint-disable-next-line
    (email) => AuthService.validateEmail(email),
    {
      onSuccess: (data) => {
        if (data?.status !== 404) {
          goForward();
        } else {
          NotificationStatus("error", "Email does not exists");
        }
      },
    },
  );

  const [currentStep, goForward, goBack] = useFormProgress();

  return currentStep === 0 ? (
    <Formik
      // eslint-disable-next-line
      key={0}
      initialValues={{ email }}
      //  eslint-disable-next-line
      onSubmit={async ({ email }, { setSubmiting, setErrors }) => {
        try {
          // eslint-disable-next-line
          email = email.trim();
          const result = await validate_email.mutateAsync(email);
          if (result.status === 404) {
            throw new Error(result?.message);
          }
          setEmail(email);
        } catch (error) {
          setErrors({ email: error.message });
        }
      }}
      //  eslint-disable-next-line
      validateOnMount={backCount <= 0 ? true : false}
      validationSchema={emailSchema}
      validateOnChange
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        // isSubmitting,
        touched,
        values,
        /* and other goodies */
      }) => (
        <S.Wrapper className="flex">
          <div className="content">
            <p className="title">Sign In</p>
            <form onSubmit={handleSubmit}>
              <TextInput
                error={
                  (errors.email && touched.email && errors.email) ||
                  global_error?.message
                }
                label="Email"
                name="email"
                onBlur={handleBlur("email")}
                onChange={handleChange("email")}
                value={values.email}
              />
              <Button
                // disabled={isSubmitting}
                size="large"
                type="submit"
                value="Next"
              />
            </form>
          </div>
        </S.Wrapper>
      )}
    </Formik>
  ) : (
    <Formik
      key={1}
      initialValues={{ password: "" }}
      // eslint-disable-next-line
      onSubmit={({ password }, { setSubmitting }) => {
        dispatch(login.request({ email, password }));
      }}
      validateOnMount
      validateOnChange
      validationSchema={passwordSchema}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        // isSubmitting,
        touched,
        values,
        /* and other goodies */
      }) => (
        <S.Wrapper className="flex">
          <div className="content">
            <button
              className="fade-btn with-back"
              onClick={() => {
                goBack();
                setBackCount((prev) => prev + 1);
                dispatch(reset_errors());
              }}
              type="button"
            >
              <img alt="back" className="back" src={back} />
            </button>
            <p className="title">Sign In</p>
            <Chip
              DeleteIcon={close}
              color="primary"
              label={email === "" ? "craig@test.com" : email}
              onDelete={() => {
                goBack();
                setBackCount((prev) => prev + 1);
                dispatch(reset_errors());
              }}
              variant="outlined"
            />
            <form onSubmit={handleSubmit}>
              <PasswordInput
                error={
                  (errors.password && touched.password && errors.password) ||
                  global_error?.message
                }
                label="Password"
                name="password"
                onBlur={handleBlur("password")}
                onChange={handleChange("password")}
                value={values.password}
              />
              <Button size="large" type="submit" value="Log In" />
            </form>
            <p className="flex text-helper">
              <Link to={{ pathname: "/forgot", state: { email } }}>
                Forgot Password?
              </Link>
            </p>
          </div>
        </S.Wrapper>
      )}
    </Formik>
  );
}

export default PageLogin;
