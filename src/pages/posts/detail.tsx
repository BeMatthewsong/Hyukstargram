import { db } from "@/firebaseApp";
import { PostProps } from "@/types/postType";
import Loader from "@components/loader/Loader";
import Post from "@components/post/Post";
import { doc, getDoc } from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";

const PostDetail = () => {
  const [post, setPost] = useState<PostProps | null>(null);
  const navigate = useNavigate();
  const params = useParams();

  const getPost = useCallback(async () => {
    if (params.id) {
      const docRef = doc(db, "posts", params.id);
      const docSnap = await getDoc(docRef);

      setPost({ ...(docSnap?.data() as PostProps), id: docSnap?.id });
    }
  }, [params.id]);

  useEffect(() => {
    if (params?.id) getPost();
  }, [params.id]);

  return (
    <div className="post">
      <div className="post__header">
        <button type="button" onClick={() => navigate(-1)}>
          <IoIosArrowBack className="post__header-btn" />
        </button>
      </div>
      {post ? <Post post={post} /> : <Loader />}
    </div>
  );
};

export default PostDetail;
