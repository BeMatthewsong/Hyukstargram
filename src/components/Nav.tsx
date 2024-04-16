import { BsHouse } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { MdLogout } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
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
        <button type="button" onClick={() => navigate("/")}>
          <MdLogout /> 로그아웃
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
