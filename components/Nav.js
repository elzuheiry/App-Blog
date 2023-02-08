import Link from "next/link";
import { auth } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Nav() {
  const [user, loading] = useAuthState(auth);

  return (
    <div className="w-full h-[6rem] flex items-center shadow">
      <div className="w-full h-full container mx-auto flex justify-between items-center">
        <div className="">
          <Link href={"/"}>
            <h1 className="text-gray-800 text-[1.5rem] font-[800] uppercase">
              twitter
            </h1>
          </Link>
        </div>

        <nav>
          <ul className="flex items-center gap-4 md:gap-9">
            {!user && (
              <li>
                <Link
                  className="capitalize text-white text-[0.9rem] rounded-[0.2rem] font-[500] py-2 px-4 bg-cyan-500"
                  href={"/auth/login"}
                >
                  join now
                </Link>
              </li>
            )}

            {user && (
              <div className="flex items-center gap-6">
                <li>
                  <Link
                    className="capitalize text-white text-[0.9rem] rounded-[0.2rem] font-[500] py-2 px-4 bg-cyan-500"
                    href={"/posts/create"}
                  >
                    post
                  </Link>
                </li>

                <li>
                  <Link
                    className="block w-[2.5rem] h-[2.5rem] bg-cyan-500 rounded-full overflow-hidden"
                    href={"/dashboard/"}
                  >
                    <img src={user.photoURL} alt={user.displayName} />
                  </Link>
                </li>
              </div>
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
}
