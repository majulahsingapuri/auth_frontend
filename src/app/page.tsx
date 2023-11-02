'use client'

import Link from "next/link";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as types from "../../api/types";
import * as api from "../../api/index";

export default function Login() {

  const initialValues: types.PasswordSignInParams = {
    username: "",
    password: ""
  }

  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen">
      <div className="w-full bg-white rounded-lg shadow dark:border mt-0 max-w-md p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="space-y-6 p-8">
          <h1 className="font-bold leading-tight tracking-tight text-gray-900 text-2xl dark:text-white">
            Sign in to your account
          </h1>
          <Formik
            initialValues={initialValues}
            onSubmit={(values, { setSubmitting }) => {
              api
                .signIn({ provider: "password", params: values })
                .then((res) => {
                  setSubmitting(false)
                  window.location.href = "https://app.local.localhost"
                })
            }}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-6">
                <div>
                  <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Your Username
                  </label>
                  <Field type="text" name="username" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="johnny_appleseed" required />
                  <ErrorMessage name="username" component={"div"} />
                </div>
                <div>
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Password
                  </label>
                  <Field type="password" name="password" id="password" placeholder="******" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                  <ErrorMessage name="password" component={"div"} />
                </div>
                <div className="flex items-center justify-between">
                  <Link href={"/forgot-password"} className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">
                    Forgot password?
                  </Link>
                </div>
                <button type="submit" disabled={isSubmitting} className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                  Sign in
                </button>
              </Form>
            )}
          </Formik>
          <p className="text-sm font-light text-gray-500 dark:text-gray-400">
            Don&apos;t have an account yet? {" "}
            <Link href={"/signup"} className="font-medium text-primary-600 hover:underline dark:text-primary-500">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
