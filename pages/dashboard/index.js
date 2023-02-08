import Head from "next/head";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../utils/firebase";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import Message from "../../components/Message";
import { AiFillDelete } from "react-icons/ai";
import { FiEdit2 } from "react-icons/fi";
import Link from "next/link";
import { toast } from "react-toastify";

export default function index() {
  const route = useRouter();
  const [user, loading] = useAuthState(auth);
  const [posts, setPosts] = useState([]);

  //See if user is logged
  const getData = async () => {
    if (loading) return;
    if (!user) return route.push("/auth/login");

    const collectionRef = collection(db, "posts");
    const q = query(collectionRef, where("user", "==", user.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setPosts(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
    return unsubscribe;
  };

  // Delete Post
  const deletePost = async (id) => {
    const docRef = doc(db, "posts", id);
    await deleteDoc(docRef);
    toast.success("Post has been delete .", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 1500,
    });
  };

  useEffect(() => {
    getData();
  }, [user, loading]);

  return (
    <div>
      <Head>
        <title>Dashboard</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="w-full min-h-auto my-[4rem]">
        <div className="my-6">
          <h1 className="text-lg font-bold">Your posts</h1>
        </div>

        <div className="flex flex-col gap-5 mb-8">
          {posts.map((post) => {
            return (
              <Message key={post.id} {...post}>
                <div className="flex gap-4">
                  <button
                    onClick={() => deletePost(post.id)}
                    className="flex items-center justify-center gap-2 py-2 text-sm text-pink-600"
                  >
                    <AiFillDelete className="text-2xl" />
                    Delete
                  </button>

                  <Link
                    href={{
                      pathname: "/posts/create",
                      query: post,
                    }}
                  >
                    <button className="flex items-center justify-center gap-2 py-2 text-sm text-teal-600">
                      <FiEdit2 className="text-2xl" />
                      Edit
                    </button>
                  </Link>
                </div>
              </Message>
            );
          })}
        </div>

        <button
          className="capitalize text-white text-[0.9rem] rounded-[0.2rem] font-medium py-2 px-4 bg-gray-800"
          onClick={() => auth.signOut()}
        >
          signout
        </button>
      </div>
    </div>
  );
}