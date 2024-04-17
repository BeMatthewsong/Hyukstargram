import { Link } from "react-router-dom";

const SignupForm = () => {
  return (
    <form>
      <div className="form form--lg">
        <div className="form__title">회원가입</div>
        <div className="form__block">
          <label htmlFor="email">이메일</label>
          <input type="text" name="email" id="email" required />
        </div>
        <div className="form__block">
          <label htmlFor="password">비밀번호</label>
          <input type="password" name="password" id="password" required />
        </div>
        <div className="form__block">
          <label htmlFor="passwordConfirm">비밀번호 확인</label>
          <input
            type="password"
            name="passwordConfirm"
            id="passwordConfirm"
            required
          />
        </div>
      </div>
      {/* error */}
      <div className="form__block">
        <div className="form__error">에러</div>
      </div>
      <div className="form__block">
        계정이 있으신가요? <Link to="/login">로그인하러 가기</Link>
      </div>
      <button type="submit" className="form__btn-submit">
        회원가입하기
      </button>
    </form>
  );
};

export default SignupForm;
