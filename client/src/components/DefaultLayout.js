import React from "react";
import "../resourses/layout.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function DefaultLayout({ children }) {
  const navigate = useNavigate();
  const [collapsed] = React.useState(false);
  const { user } = useSelector((state) => state.users);
  const userMenu = [
    {
      name: "Inicio",
      icon: "ri-home-line",
      path: "/",
    },
    {
      name: "Perfil",
      icon: "ri-user-line",
      path: `/user/${user._id}`,
    },
    {
      name: "Salir",
      icon: "ri-logout-box-line",
      path: "/logout",
    },
  ];
  const adminMenu = [
    {
      name: "Inicio",
      path: "/",
      icon: "ri-home-line",
    },
    {
      name: "Peliculas",
      path: "/admin/movies",
      icon: "ri-film-line",
    },
    {
      name: "Usuarios",
      path: "/admin/users",
      icon: "ri-user-line",
    },
    {
      name: "Compras",
      path: "/admin/bookings",
      icon: "ri-file-list-line",
    },
    {
      name: "Salir",
      path: "/logout",
      icon: "ri-logout-box-line",
    },
  ];
  const menuToBeRendered = user?.isAdmin ? adminMenu : userMenu;
  let activeRoute = window.location.pathname;
  if (window.location.pathname.includes("book-now")) {
    activeRoute = "/";
  }

  return (
    <div className="layout-parent">
      <div className="sidebar">
        <div className="sidebar-header gap-4">
          <Link to="/">
            <img
              className="logo"
              src="https://i.imgur.com/PqH82vs.png"
              alt="cinemania"
            />
          </Link>
          <h1 className="role">
            {user?.isAdmin ? "Admin" : "User"}: <br />
            {user?.name}
          </h1>
        </div>
        <div className="d-flex gap-4 menu">
          {menuToBeRendered.map((item, index) => {
            return (
              <div
                className={`${
                  activeRoute === item.path && "active-menu-item"
                } menu-item`}
              >
                <i className={item.icon}></i>
                {!collapsed && (
                  <span
                    onClick={() => {
                      if (item.path === "/logout") {
                        localStorage.removeItem("token");
                        navigate("/login");
                      } else {
                        navigate(item.path);
                      }
                    }}
                  >
                    {item.name}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <div className="body">
        <div className="content"> {children}</div>
      </div>
    </div>
  );
}

export default DefaultLayout;
