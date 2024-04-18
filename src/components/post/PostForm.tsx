import { db } from "@/firebaseApp";
import AuthContext from "@contexts/AuthContext";
import { addDoc, collection } from "firebase/firestore";
import { useContext, useState } from "react";
import { FiImage } from "react-icons/fi";
import { toast } from "react-toastify";

interface PostFormProps {
  handleFileUpload: () => void;
}

const PostForm = ({ handleFileUpload }: PostFormProps) => {
  const [content, setContent] = useState("");

  const { user } = useContext(AuthContext);

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (name === "content") {
      setContent(value);
    }
  };
  const onSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "posts"), {
        content,
        createdAt: new Date()?.toLocaleDateString("ko", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
        uid: user?.uid,
        email: user?.email,
      });
      setContent("");
      toast.success("게시물을 생성했습니다");
    } catch (error) {}
  };

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
          value="작성하기"
          className="post-form__submit-btn"
        />
      </div>
    </form>
  );
};

export default PostForm;
