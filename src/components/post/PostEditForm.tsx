import { db } from "@/firebaseApp";
import { PostProps } from "@/types/postType";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";
import { FiImage } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

interface PostFormProps {
  handleFileUpload: () => void;
}

const PostEditForm = ({ handleFileUpload }: PostFormProps) => {
  const [content, setContent] = useState("");
  const [post, setPost] = useState<PostProps | null>(null);
  const params = useParams();
  const navigate = useNavigate();

  const getPost = useCallback(async () => {
    if (params?.id) {
      const docRef = doc(db, "posts", params.id);
      const docSnap = await getDoc(docRef);
      setPost({ ...(docSnap?.data() as PostProps), id: docSnap?.id });
      setContent(docSnap?.data()?.content);
    }
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (name === "content") {
      setContent(value);
    }
  };
  const onSubmit = async (e: any) => {
    e.preventDefault();
    try {
      if (post) {
        const postRef = doc(db, "posts", post?.id);
        await updateDoc(postRef, { content });
      }
      navigate(`/posts/${post?.id}`);
      toast.success("업데이트를 성공적으로 했습니다");
    } catch (error) {}
  };

  useEffect(() => {
    if (params.id) getPost();
  }, [getPost, params.id]);

  return (
    <form className="post-form" onSubmit={onSubmit}>
      <textarea
        className="post-form__textarea"
        name="content"
        id="content"
        placeholder="What is happening"
        spellCheck="false"
        value={content}
        onChange={onChange}
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
          value="수정하기"
          className="post-form__submit-btn"
        />
      </div>
    </form>
  );
};

export default PostEditForm;
