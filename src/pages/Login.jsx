import React, { useState } from "react";
import { useAuth } from "../providers/AuthProvider";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

const Login = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { onLogin } = useAuth();
  const handleLogin = async () => {
    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );
      const user = userCredential.user;
      const signedInUser = await signInWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );

      console.log({ user, signedInUser });
      // onLogin({user})
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log({ errorMessage });
    }
  };
  return (
    <div className="bg-slate-900">
      <div className="container flex w-full justify-center items-center h-screen">
        <div className="w-4/12 py-8">
          <form
            className="w-full"
            action=""
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
          >
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block mb-2 text-white font-semibold text-sm"
              >
                Name
              </label>
              <input
                type="text"
                className="mt-1 py-4 px-4 border block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                onChange={(e) =>
                  setForm({ ...form, ...{ name: e.target.value } })
                }
                value={form.name}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block mb-2 text-white font-semibold text-sm"
              >
                Email
              </label>
              <input
                type="email"
                className="mt-1 py-4 px-4 border block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                onChange={(e) =>
                  setForm({ ...form, ...{ email: e.target.value } })
                }
                value={form.email}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block mb-2 text-white font-semibold text-sm"
              >
                Password
              </label>
              <input
                type="password"
                className="mt-1 py-4 px-4 border block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                onChange={(e) =>
                  setForm({ ...form, ...{ password: e.target.value } })
                }
                value={form.password}
              />
            </div>
            <div className="mb-4">
              <button
                type="submit"
                className="py-4 text-center w-full bg-green-300 text-white font-semibold rounded-md"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
