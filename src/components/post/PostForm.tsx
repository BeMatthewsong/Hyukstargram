import { db } from "@/firebaseApp";
import AuthContext from "@contexts/AuthContext";
import { addDoc, collection } from "firebase/firestore";
import { useContext, useState } from "react";
import { FiImage } from "react-icons/fi";
import { toast } from "react-toastify";

interface PostFormProps {
  handleFileUpload: () => void;
}

//TODO: 모듈화 하기
const PostForm = ({ handleFileUpload }: PostFormProps) => {
  const [content, setContent] = useState("");
  const [hashtag, setHashtag] = useState<string>("");
  const [hashtags, setHashtags] = useState<string[]>([]);

  const { user } = useContext(AuthContext);

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (name === "content") {
      setContent(value);
    }
  };

  const onChangeHashtag = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setHashtag(value);
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    if (e.keyCode === 32 && value.trim() !== "") {
      // 오류: 동작 안 함
      if (hashtags?.includes(value?.trim())) {
        toast.error("동일한 태그가 존재합니다");
      } else {
        setHashtags((prev) => [...prev, hashtag]);
        setHashtag("");
      }
    }
  };

  // 오류: 같은 내용이면 같이 사라지는 오류
  const removeHashtag = (tag: string) => {
    setHashtags(hashtags?.filter((value) => value !== tag));
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
        hashTags: hashtags,
      });
      setContent("");
      setHashtag("");
      setHashtags([]);
      toast.success("게시물을 생성했습니다");
    } catch (error) {
      toast.error("게시물 작성이 실패했습니다");
    }
  };

  return (
    <form className="post-form" onSubmit={onSubmit}>
      {/* 본문 입력 */}
      <textarea
        className="post-form__textarea"
        name="content"
        id="content"
        placeholder="What is happening"
        spellCheck="false"
        value={content}
        onChange={onChange}
      />
      {/* 해시태그 입력 */}
      <div className="post-form__hashtags">
        <span className="post-form__hashtags-outputs">
          {hashtags?.map((item, index) => (
            <span
              className="post-form__hashtags-tag"
              key={item + index}
              onClick={() => removeHashtag(item)}
            >
              #{item}
            </span>
          ))}
        </span>
        <input
          type="text"
          className="post-form__hashtags-input"
          name="hashtag"
          id="hashtag"
          placeholder="해시태그를 스페이스 바로 입력"
          spellCheck="false"
          value={hashtag}
          onChange={onChangeHashtag}
          onKeyUp={handleKeyUp}
        />
      </div>
      {/* 파일 입력 */}
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
