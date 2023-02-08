import { LinkIcon } from "@heroicons/react/24/solid";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useRouter } from "next/router";
import { auth } from "../../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from "react";
import Head from "next/head";

export default function login() {
  // use the Router
  const route = useRouter();

  //check if user here or not
  const [user, loading] = useAuthState(auth);

  //Login with Google
  const googleProvider = new GoogleAuthProvider();
  const GoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      route.push("/");
    } catch (error) {}
  };

  // check if user here go to Dashboard
  useEffect(() => {
    if (user) {
      route.push("/dashboard");
    } else {
      console.log("login");
    }
  }, [user]);

  return (
    <div>
      <Head>
        <title>Login</title>
      </Head>

      <div className="w-full min-h-[100vh] md:max-w-2xl md:mx-auto my-[6rem] shadow-lg p-10">
        <div>
          <h2 className="text-[1.2rem] text-gray-700 font-[700] capitalize mb-4">
            join today
          </h2>

          <div className="my-4">
            <h3 className="text-gray-600 text-[1rem] capitalize mb-6">
              sign in with one of the providers
            </h3>
            <button
              onClick={GoogleLogin}
              className="bg-gray-700 flex items-center gap-5 px-[1rem] text-white w-full capitalize font-[600] py-[0.7rem] rounded-[0.5rem]"
            >
              <LinkIcon className="w-[1rem] h-[1rem]" /> sign in with google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
