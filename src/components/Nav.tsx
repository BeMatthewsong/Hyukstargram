import { app } from "@/firebaseApp";
import AuthContext from "@contexts/AuthContext";
import { getAuth, signOut } from "firebase/auth";
import { useContext } from "react";
import { BsHouse } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { MdLogin, MdLogout } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const NavBar = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  return (
    <nav className="navbar">
      <div className="navbar__grid">
        <button type="button" onClick={() => navigate("/")}>
          <BsHouse /> 홈
        </button>
        <button type="button" onClick={() => navigate("/profile")}>
          <CgProfile /> 프로필
        </button>
        {/* TODO: 로그아웃 페이지 추가 */}
        {user === null ? (
          <button type="button" onClick={() => navigate("/login")}>
            <MdLogin /> 로그인
          </button>
        ) : (
          <button
            type="button"
            onClick={async () => {
              const auth = getAuth(app);
              await signOut(auth);
              toast.success("로그아웃이 되었습니다 🫥");
            }}
          >
            <MdLogout /> 로그아웃
          </button>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
