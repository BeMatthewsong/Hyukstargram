import { Link } from "react-router-dom";
import { AiFillHeart } from "react-icons/ai";
import { FaCommentAlt, FaUserCircle } from "react-icons/fa";
import { PostProps } from "@/types/postType";

interface PostBoxProps {
  posts: PostProps[];
  onDelete: () => void;
}

const PostBox = ({ posts, onDelete }: PostBoxProps) => {
  return (
    <div className="post">
      {posts?.map((post) => (
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
            {/* 게시물 주인일 때 */}
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
              <button type="button" className="post__delete" onClick={onDelete}>
                삭제
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostBox;
