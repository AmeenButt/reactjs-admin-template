import React from "react";
import { useLocation, Route, Routes, Navigate } from "react-router-dom";
import Sidebar from "components/Sidebar/Sidebar.js";
import routes from "routes.js";
import basePath from "basePath";
import ErrorPage from "views/errorPage";
const Admin = (props) => {
  const mainContent = React.useRef(null);
  const location = useLocation();

  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContent.current.scrollTop = 0;
  }, [location]);

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === `/${basePath}/admin`) {
        return (
          <Route path={prop.path} element={prop.component} key={key} exact />
        );
      } else {
        return null;
      }
    });
  };
  return (
    <>
        {<Sidebar
          {...props}
          routes={routes}
          logo={{
            innerLink: "/admin/index",
            imgSrc: require("../assets/img/logo.png"),
            imgAlt: "...",
          }}
        />}
        <div className="main-content" ref={mainContent}>

          <Routes>
            {getRoutes(routes)}
            <Route path="*" element={<Navigate to={`/${basePath}/admin/index`} replace />} />
            <Route path={`/error`} element={<ErrorPage />} />
          </Routes>

        </div>
    </>
  );
};

export default Admin;
