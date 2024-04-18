import { app } from "@/firebaseApp";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const onSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const auth = getAuth(app);
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
      toast.success("야홋! 글 쓰러 가볼까요? 😎");
    } catch (error: any) {
      toast.error("다시 확인해주세요! 😅");
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "email") {
      setEmail(value);
      const validRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

      if (!value?.match(validRegex)) {
        setError("이메일 형식에 맞지 않습니다.");
      } else {
        setError("");
      }
    }

    if (name === "password") {
      setPassword(value);

      if (value?.length < 0) {
        setError("비밀번호는 8자리 미만은 불가합니다.");
      } else {
        setError("");
      }
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="form form--lg">
        <div className="form__title">로그인</div>
        <div className="form__block">
          <label htmlFor="email">이메일</label>
          <input
            type="text"
            name="email"
            id="email"
            onChange={onChange}
            value={email}
            required
          />
        </div>
        <div className="form__block">
          <label htmlFor="password">비밀번호</label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={onChange}
            value={password}
            required
          />
        </div>
      </div>
      {error && error?.length > 0 && (
        <div className="form__block">
          <div className="form__error">{error}</div>
        </div>
      )}
      <div className="form__block">
        <div className="navigate">
          계정이 있으신가요? <Link to="/signup">회원가입 하기</Link>
        </div>
      </div>
      <button
        type="submit"
        className="form__btn--submit"
        disabled={error?.length > 0}
      >
        로그인
      </button>
    </form>
  );
};

export default LoginForm;
