'use client'

import Link from "next/link";
import { Formik, Form, Field, ErrorMessage, FormikErrors } from 'formik';
import * as types from "../../../api/types";
import * as api from "../../../api/index";

interface FormLayout {
  type: string;
  id: string;
  text: string;
  placeholder: string;
}

export default function Login() {

  const initialValues: types.PasswordSignUpParams = {
    username: "",
    email: "",
    password1: "",
    password2: ""
  }

  const formFields: FormLayout[] = [
    {
      type: "text",
      id: "username",
      text: "Username",
      placeholder: "johndoe"
    },
    {
      type: "email",
      id: "email",
      text: "Email",
      placeholder: "johndoe@email.com"
    },
    {
      type: "password",
      id: "password1",
      text: "Password",
      placeholder: "•••••"
    },
    {
      type: "password",
      id: "password2",
      text: "Confirm Password",
      placeholder: "•••••"
    },
  ]

  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto min-h-screen max-h-max">
      <div className="w-full bg-white rounded-lg shadow dark:border mt-0 max-w-md p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="space-y-6 p-8">
          <h1 className="font-bold leading-tight tracking-tight text-gray-900 text-2xl dark:text-white">
            Sign up for an account
          </h1>
          <Formik
            initialValues={initialValues}
            validate={(values: types.PasswordSignUpParams) => {
              let errors: FormikErrors<types.PasswordSignUpParams> = {}
              if (values.password2 !== "" && values.password1 !== values.password2) {
                errors.password2 = "Passwords do not match"
              }
              if (!values.email) {
                errors.email = "Email is required"
              } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){
                errors.email = "Not a valid email"
              }
              return errors
            }}
            validateOnBlur
            onSubmit={(values, { setSubmitting }) => {
              api
                .signUp({ provider: "password", params: values })
                .then(() => {
                  api
                    .signIn({
                      provider: "password", params: {
                        username: values.username,
                        password: values.password1
                      }
                    })
                    .then(() => {
                      setSubmitting(false);
                      window.location.href = "https://app.local.localhost"
                    })
                })
            }}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-6">
                {formFields.map((field) => (
                  <div key={field.id} className="space-y-4">
                    <label htmlFor="password2" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      {field.text}
                    </label>
                    <Field type={field.type} name={field.id} id={field.id} placeholder={field.placeholder} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                    <ErrorMessage name={field.id} component={"div"} className="bg-red-700 border border-red-600 text-white text-sm rounded-lg block w-full p-2.5" />
                  </div>
                ))}
                <button type="submit" disabled={isSubmitting} className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                  Sign up
                </button>
              </Form>
            )}
          </Formik>
          <p className="text-sm font-light text-gray-500 dark:text-gray-400">
            Have an account? {" "}
            <Link href={"/"} className="font-medium text-primary-600 hover:underline dark:text-primary-500">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
