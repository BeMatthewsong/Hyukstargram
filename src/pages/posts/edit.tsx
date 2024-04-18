import PostEditForm from "@components/post/PostEditForm";

const PostEdit = () => {
  const handleFileUpload = () => {};
  return (
    <div>
      <PostEditForm handleFileUpload={handleFileUpload} />
    </div>
  );
};

export default PostEdit;
