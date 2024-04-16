import { ReactNode } from "react";
import NavBar from "./Nav";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="layout">
      {children}
      <NavBar />
    </div>
  );
};

export default Layout;
