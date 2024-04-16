import { posts } from "@/constatnts/postMockData";
import PostBox from "@components/post/PostBox";
import PostForm from "@components/post/PostForm";

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
      <PostForm onClick={handleFileUpload} />
      <PostBox posts={posts} onDelete={handleDelete} />
    </div>
  );
};

export default Home;
