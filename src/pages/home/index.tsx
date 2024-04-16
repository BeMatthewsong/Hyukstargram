import { FiImage } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { AiFillHeart } from "react-icons/ai";
import { FaCommentAlt } from "react-icons/fa";

interface PostProps {
  id: string;
  email: string;
  content: string;
  createdAt: string;
  uid: string;
  profileUrl?: string;
  likes?: string;
  likeCount?: number;
  comments?: string;
}

const posts: PostProps[] = [
  {
    id: "1",
    email: "songww1997@naver.com",
    content: "송민혁입니다.",
    createdAt: "2024-04-15",
    uid: "123123",
  },
  {
    id: "2",
    email: "songww1997@naver.com",
    content: "송민혁입니다.",
    createdAt: "2024-04-15",
    uid: "123122",
  },
  {
    id: "3",
    email: "songww1997@naver.com",
    content: "송민혁입니다.",
    createdAt: "2024-04-15",
    uid: "123121",
  },
  {
    id: "4",
    email: "songww1997@naver.com",
    content: "송민혁입니다.",
    createdAt: "2024-04-15",
    uid: "123120",
  },
];

const Home = () => {
  // TODO: 함수 내용 추가
  const handleFileUpload = () => {};
  const handleDelete = () => {};

  return (
    <div className="home">
      <div className="home__title">🌟 반짝 🌟</div>
      <div className="home__tabs">
        <div className="home__tab home__tab--active">For you</div>
        <div className="home__tab">Following</div>
      </div>
      {/* Post Form */}
      <form className="post-form">
        <textarea
          className="post-form__textarea"
          name="content"
          id="content"
          placeholder="What is happening"
          spellCheck="false"
        ></textarea>
        <div className="post-form__submit-area">
          <label className="post-form__file" htmlFor="file-input">
            <FiImage className="post-form__file-icon" size={25} />
          </label>
          <input
            type="file"
            name="file-input"
            accept="image/*"
            className="hidden"
            onChange={handleFileUpload}
          />
          <input
            type="submit"
            value="Tweet"
            className="post-form__submit-btn"
          />
        </div>
      </form>
      {/* Tweet posts */}
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
              <>
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
                <button type="button" className="post__like">
                  <AiFillHeart /> {post?.likeCount || 0}
                </button>
                <button type="button" className="post__comment">
                  <FaCommentAlt /> {post?.comments?.length || 0}
                </button>
              </>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
