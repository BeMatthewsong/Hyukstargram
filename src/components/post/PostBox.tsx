import { Link } from "react-router-dom";
import { AiFillHeart } from "react-icons/ai";
import { FaCommentAlt, FaUserCircle } from "react-icons/fa";
import { PostProps } from "@/types/postType";
import { useContext } from "react";
import AuthContext from "@contexts/AuthContext";

interface PostBoxProps {
  posts: PostProps[];
  onDelete: () => void;
}

const PostBox = ({ posts, onDelete }: PostBoxProps) => {
  const { user } = useContext(AuthContext);

  return (
    <div className="post">
      {posts?.length > 0 ? (
        posts?.map((post) => (
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
              </div>
            </Link>
            <div className="post__box-footer">
              {user?.uid === post?.uid && (
                <>
                  <div className="post__button-box">
                    <button type="button" className="post__likes">
                      <AiFillHeart /> {post?.likeCount || 0}
                    </button>
                    <button type="button" className="post__comments">
                      <FaCommentAlt /> {post?.comments?.length || 0}
                    </button>
                  </div>
                  <div className="post__button-box">
                    <button type="button" className="post__edit">
                      <Link to={`/posts/edit/${post?.id}`}>수정</Link>
                    </button>
                    <button
                      type="button"
                      className="post__delete"
                      onClick={onDelete}
                    >
                      삭제
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        ))
      ) : (
        <div className="post__no-posts">
          <div className="post__text">게시글이 없습니다.</div>
        </div>
      )}
    </div>
  );
};

export default PostBox;
