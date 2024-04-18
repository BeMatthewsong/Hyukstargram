import { posts } from "@/constatnts/postMockData";
import PostBox from "@components/post/PostBox";
import PostForm from "@components/post/PostForm";
import PostTab from "@components/post/PostTab";

const Home = () => {
  // TODO: 함수 내용 추가
  const handleFileUpload = () => {};
  const handleDelete = () => {};

  return (
    <main className="home">
      <PostTab />
      <PostForm handleFileUpload={handleFileUpload} />
      <PostBox posts={posts} onDelete={handleDelete} />
    </main>
  );
};

export default Home;
