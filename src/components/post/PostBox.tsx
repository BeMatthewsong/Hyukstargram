import { PostProps } from "@/types/postType";
import Post from "./Post";

interface PostBoxProps {
  posts: PostProps[];
}

const PostBox = ({ posts }: PostBoxProps) => {
  return (
    <div className="post">
      {posts?.length > 0 ? (
        posts?.map((post) => <Post key={post.id} post={post} />)
      ) : (
        <div className="post__no-posts">
          <div className="post__text">게시글이 없습니다.</div>
        </div>
      )}
    </div>
  );
};

export default PostBox;
