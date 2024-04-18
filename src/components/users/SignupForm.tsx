import { app } from "@/firebaseApp";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithPopup,
} from "firebase/auth";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SignupForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const onSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const auth = getAuth(app);
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/");
      toast.success("성공적으로 회원가입이 되었습니다 🥳");
    } catch (error: any) {
      toast.error("회원가입이 안 되었습니다");
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
      } else if (value !== passwordConfirm) {
        setError("비밀번호 확인 값과 동일하지 않습니다.");
      } else {
        setError("");
      }
    }

    if (name === "password_confirmation") {
      setPasswordConfirm(value);

      if (value !== password) {
        setError("비밀번호 값과 동일하지 않습니다.");
      } else {
        setError("");
      }
    }
  };

  const onClickSocialLogin = async (e: any) => {
    const { name } = e.target;
    let provider;
    const auth = getAuth(app);

    if (name === "google") {
      provider = new GoogleAuthProvider();
    }

    if (name === "github") {
      provider = new GithubAuthProvider();
    }

    await signInWithPopup(
      auth,
      provider as GoogleAuthProvider | GithubAuthProvider
    )
      .then((result) => {
        console.log(result);
        toast.success("로그인 되었습니다.");
      })
      .catch((error) => {
        console.log(error);
        toast.error("로그인이 실패되었습니다.");
      });
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="form form--lg">
        <div className="form__title">회원가입</div>
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
        <div className="form__block">
          <label htmlFor="password_confirmation">비밀번호 확인</label>
          <input
            type="password"
            name="password_confirmation"
            id="password_confirmation"
            onChange={onChange}
            value={passwordConfirm}
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
          계정이 있으신가요? <Link to="/login">로그인 하기</Link>
        </div>
      </div>
      <button
        type="submit"
        className="form__btn--submit"
        disabled={error?.length > 0}
      >
        회원가입
      </button>
      <div className="form__block">
        <button
          type="button"
          name="google"
          className="form__btn--google"
          onClick={onClickSocialLogin}
        >
          Google로 회원가입
        </button>
      </div>
      <div className="form__block">
        <button
          type="button"
          name="github"
          className="form__btn--github"
          onClick={onClickSocialLogin}
        >
          Github로 회원가입
        </button>
      </div>
    </form>
  );
};

export default SignupForm;
