import { db } from "@/firebaseApp";
import { PostProps } from "@/types/postType";
import PostBox from "@components/post/PostBox";
import PostForm from "@components/post/PostForm";
import PostTab from "@components/post/PostTab";
import AuthContext from "@contexts/AuthContext";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";

const Home = () => {
  const [posts, setPosts] = useState<PostProps[]>([]);
  const { user } = useContext(AuthContext);

  // TODO: 함수 내용 추가
  const handleFileUpload = () => {};

  useEffect(() => {
    if (user) {
      let postRef = collection(db, "posts");
      let postQuery = query(postRef, orderBy("createdAt", "desc"));

      onSnapshot(postQuery, (snapShot) => {
        let dataObj = snapShot.docs.map((doc) => ({
          ...doc.data(),
          id: doc?.id,
        }));
        setPosts(dataObj as PostProps[]);
      });
    }
  }, []);

  return (
    <main className="home">
      <PostTab />
      <PostForm handleFileUpload={handleFileUpload} />
      <PostBox posts={posts} />
    </main>
  );
};

export default Home;
