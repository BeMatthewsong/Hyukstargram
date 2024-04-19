import { db } from "@/firebaseApp";
import { PostProps } from "@/types/postType";
import AuthContext from "@contexts/AuthContext";
import { deleteDoc, doc } from "firebase/firestore";
import { useContext } from "react";
import { AiFillHeart } from "react-icons/ai";
import { FaCommentAlt, FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface PostBoxProps {
  post: PostProps;
}

const Post = ({ post }: PostBoxProps) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleDelete = async () => {
    const confirm = window.confirm("해당 게시글을 삭제하시겠습니까?");
    if (confirm) {
      await deleteDoc(doc(db, "posts", post?.id));
      toast.success("게시글을 삭제했습니다.");
      navigate("/");
    }
  };

  return (
    <div className="post__box" key={post?.id}>
      <Link to={`/posts/${post?.id}`}>
        <div className="post__box-profile">
          <div className="post__flex">
            {post?.profileUrl ? (
              <img
                src={post?.profileUrl}
                alt="profile"
                className="post__box-profile-icon"
              />
            ) : (
              <FaUserCircle className="post__box-profile-icon" />
            )}
            <div className="post__email">{post?.email}</div>
            <div className="post__createdAt">{post?.createdAt}</div>
          </div>
          <div className="post__box-content">{post?.content}</div>
          <div className="post-form__hashtags-outputs">
            {post?.hashTags?.map((tag, index) => (
              <span className="post-form__hashtags-tag" key={tag + index}>
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </Link>
      <div className="post__box-footer">
        <div className="post__button-box">
          <button type="button" className="post__likes">
            <AiFillHeart /> {post?.likeCount || 0}
          </button>
          <button type="button" className="post__comments">
            <FaCommentAlt /> {post?.comments?.length || 0}
          </button>
        </div>
        {user?.uid === post?.uid && (
          <>
            <div className="post__button-box">
              <button type="button" className="post__edit">
                <Link to={`/posts/edit/${post?.id}`}>수정</Link>
              </button>
              <button
                type="button"
                className="post__delete"
                onClick={handleDelete}
              >
                삭제
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Post;
