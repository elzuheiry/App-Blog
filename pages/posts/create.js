import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../utils/firebase";
import { useRouter } from "next/router";
import Head from "next/head";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";

export default function create() {
  const [post, setPost] = useState({ description: "" });
  const [user, loading] = useAuthState(auth);
  const route = useRouter();
  const routeData = route.query;

  //Submit post
  const submitPost = async (e) => {
    e.preventDefault();

    // Run checks for description
    if (!post.description) {
      toast.error("Description Field empty.!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1000,
      });
      return;
    }

    if (post.description.length > 300) {
      toast.error("Description too long.!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1000,
      });
      return;
    }

    if (post?.hasOwnProperty("id")) {
      const docRef = doc(db, "posts", post.id);
      const updatePost = { ...post, timestamp: serverTimestamp() };
      await updateDoc(docRef, updatePost);
      return route.push("/");
    } else {
      // make a new post
      const collectionRef = collection(db, "posts");
      await addDoc(collectionRef, {
        ...post,
        timestamp: serverTimestamp(),
        user: user.uid,
        avatar: user.photoURL,
        username: user.displayName,
      });

      setPost({ description: "" });
      toast.success("Post has been made ", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1500,
      });
      return route.push("/");
    }
  };

  const checkUser = async () => {
    if (loading) return;
    if (!user) route.push("/auth/login");
    if (routeData.id) {
      setPost({ description: routeData.description, id: routeData.id });
    }
  };

  useEffect(() => {
    checkUser();
  }, [user, loading]);

  return (
    <div>
      <Head>
        <title>{post.hasOwnProperty("id") ? "Edit post" : "Create post"}</title>
      </Head>

      <div className="lg:w-[35rem] mx-auto my-20 p-12 shadow-2xl rounded-xl">
        <form onSubmit={submitPost}>
          <h1 className="text-[1.2rem] text-gray-900 font-[700] mb-3">
            {post.hasOwnProperty("id") ? "Edit your post" : "Create a new post"}
          </h1>

          <div className="my-5">
            <h3 className="text-[0.9rem] text-gray-500 font-[400] capitalize">
              description
            </h3>
            <textarea
              value={post.description}
              onChange={(e) =>
                setPost({ ...post, description: e.target.value })
              }
              className=" bg-gray-800 text-white w-full h-48 rounded-lg p-3 text-sm"
            ></textarea>
            <p
              className={`text-[0.8rem] text-cyan-600 font-medium ${
                post.description.length > 300 ? "text-red-600" : ""
              }`}
            >
              {post.description.length}/300
            </p>
          </div>

          <button
            type="submit"
            className="w-full bg-cyan-600 text-white font-medium py-2 my-2 uppercase rounded-lg text-sm"
          >
            {post.hasOwnProperty("id") ? "Update" : "Post"}
          </button>
        </form>
      </div>
    </div>
  );
}
