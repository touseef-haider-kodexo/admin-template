import React, { useState, useEffect } from "react";
import * as yup from "yup";
import { Formik } from "formik";
import { Link, useHistory, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useMutation, useQuery } from "react-query";
import { useInjectSaga } from "redux-injectors";
import Chip from "@material-ui/core/Chip";

import PasswordInput from "@/components/Input/PasswordInput";
import padlock from "@/assets/images/padlock.webp";
import Input from "@/components/Input";
import Button from "@/components/Button";
import NotificationStatus from "@/components/Notification";
import close from "@/assets/images/close.svg";
import back from "@/assets/images/back.webp";
import AuthService from "@/services/api/auth-service";
import { login } from "@/containers/PageLogin/actions";
import { EMAIL_REG_EXP } from "@/utils/constants";
import { key } from "@/containers/PageLogin/constants";
import saga from "@/containers/PageLogin/saga";
import { resetCurrentUser } from "@/redux/global/actions";
import storage from "@/utils/storage";

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

function PageReset() {
  const {
    location: { state },
  } = useHistory();
  const [userEmail, setUserEmail] = useState(state?.email);
  const [hasTokenError, setHasTokenError] = useState(false);
  const dispatch = useDispatch();
  const { token } = useParams();

  useInjectSaga({ key, saga });

  useEffect(() => {
    window.document.title = "Dent Doc - Forgot Password";
    return () => {
      window.document.title = "Dent Doc Connect";
    };
  }, []);

  const emailSchema = yup.object().shape({
    email: yup
      .string()
      .min(6, "too short")
      .max(140, "too long")
      .matches(EMAIL_REG_EXP, "Invalid email")
      .required("*Please enter your email address to reset your password"),
  });

  const passwordSchema = yup.object().shape({
    password: yup
      .string()
      .min(8, "too short")
      .max(80, "too long")
      .required("*Please enter your new password"),
  });

  const send_email_mutation = useMutation((email) =>
    AuthService.passwordEmail(email),
  );

  useQuery(
    "validateAccessToken",
    () => AuthService.validatePasswordLink(token.split("=")[1]),
    {
      retry: false,
      enabled: !!token,
      onSuccess: (data) => {
        setHasTokenError(false);
        setUserEmail(data?.user?.email);
      },
      onError: () => {
        setHasTokenError(true);
        goForward();
      },
    },
  );

  const pwd_reset_mutation = useMutation((data) =>
    AuthService.passwordReset(data),
  );

  useEffect(() => {
    if (token && token.split("=")[1]) {
      goForward();
    }
  }, [token]);

  const [currentStep, goForward, goBack] = useFormProgress();

  return currentStep === 0 ? (
    <Formik
      key={0}
      initialValues={{ email: userEmail }}
      // eslint-disable-next-line
      onSubmit={async ({ email }, { setSubmitting, setErrors }) => {
        try {
          await send_email_mutation.mutateAsync({ email });
          NotificationStatus(
            "success",
            "We have sent you an email with a link to reset your password.",
          );
        } catch (error) {
          setErrors({ ...error });
        }
      }}
      validateOnMount
      validationSchema={emailSchema}
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
        <S.Recover className="flex">
          <div className="content flex">
            <img alt="secured" className="secured" src={padlock} />
            <p className="title">Recover Your Password</p>
            <form onSubmit={handleSubmit}>
              <Input
                error={errors.email && touched.email && errors.email}
                label="Email"
                onBlur={handleBlur("email")}
                onChange={handleChange("email")}
                type="email"
                value={values.email}
              />
              <Button size="large" type="submit" value="Recover Password" />
            </form>
            <p className="text-helper">
              {" "}
              Go back to <Link to="/login"> Login</Link>
            </p>
          </div>
        </S.Recover>
      )}
    </Formik>
  ) : (
    <Formik
      key={1}
      initialValues={{ password: "" }}
      // eslint-disable-next-line
      onSubmit={async ({ password }, { setSubmitting }) => {
        if (token && token.split("=")[1]) {
          try {
            await pwd_reset_mutation.mutateAsync({
              password,
              token: token.split("=")[1],
            });
            storage.clear();
            dispatch(login.request({ email: userEmail, password }));
            dispatch(resetCurrentUser());
          } catch (error) {
            console.log(`error`, error);
          }
        }
      }}
      validateOnMount
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
        <S.Recover className="flex">
          <div className="content content2 flex">
            <button
              className="fade-btn with-back"
              onClick={() => goBack()}
              type="button"
            >
              <img alt="back" className="back" src={back} />
            </button>
            <img alt="secured" className="secured" src={padlock} />
            <p className="title">Recover Your Password</p>
            <Chip
              DeleteIcon={close}
              color="primary"
              label={userEmail ?? "N/A"}
              onDelete={() => goBack()}
              variant="outlined"
            />
            <form onSubmit={handleSubmit}>
              <PasswordInput
                disabled={hasTokenError}
                error={errors.password && touched.password && errors.password}
                label="New Password"
                onBlur={handleBlur("password")}
                onChange={handleChange("password")}
                value={values.password}
              />
              <Button
                size="large"
                type="submit"
                disabled={hasTokenError}
                value="Reset Password"
              />
            </form>
            <p className="text-helper">
              {" "}
              Go back to <Link to="/login"> Login</Link>
            </p>
          </div>
        </S.Recover>
      )}
    </Formik>
  );
}

export default PageReset;
