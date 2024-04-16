import { FiImage } from "react-icons/fi";

interface PostFormProps {
  onClick: () => void;
}

const PostForm = ({ onClick }: PostFormProps) => {
  return (
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
          onChange={onClick}
        />
        <input type="submit" value="Tweet" className="post-form__submit-btn" />
      </div>
    </form>
  );
};

export default PostForm;
