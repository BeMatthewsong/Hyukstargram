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
  const [hashtag, setHashtag] = useState<string>("");
  const [hashtags, setHashtags] = useState<string[]>([]);
  const params = useParams();
  const navigate = useNavigate();

  const getPost = useCallback(async () => {
    if (params?.id) {
      const docRef = doc(db, "posts", params.id);
      const docSnap = await getDoc(docRef);
      setPost({ ...(docSnap?.data() as PostProps), id: docSnap?.id });
      setContent(docSnap?.data()?.content);
      setHashtags(docSnap?.data()?.hashTags);
    }
  }, []);

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
      if (post) {
        const postRef = doc(db, "posts", post?.id);
        await updateDoc(postRef, { content, hashTags: hashtags });
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
      />
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
