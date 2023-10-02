import Index from "views/Index.js";
import Login from "views/examples/Login.js";
import Blogs from "views/blog"
import basePath from "basePath";
import ForgetPassword from 'views/forgetPassword'
var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: <Index />,
    layout: `/${basePath}/admin`,
  },
  // {
  //   path: "/services",
  //   name: "Services",
  //   icon: "ni ni-album-2",
  //   component: <Services />,
  //   layout: `/${basePath}/admin`,
  // },
  // {
  //   path: "/users",
  //   name: "Users",
  //   icon: "fas fa-users",
  //   component: <Users />,
  //   layout: `/${basePath}/admin`,
  // },
  // {
  //   path: "/Categories",
  //   name: "Categories",
  //   icon: "fas fa-list",
  //   component: <Categories />,
  //   layout: `/${basePath}/admin`,
  // },
  // {
  //   path: "/orders",
  //   name: "Orders",
  //   icon: "fas fa-shopping-cart",
  //   component: <Orders />,
  //   layout: `/${basePath}/admin`,
  // },
  // {
  //   path: "/massorders",
  //   name: "MassOrders",
  //   icon: "fas fa-cubes",
  //   component: <MassOrders />,
  //   layout: `/${basePath}/admin`,
  // },
  {
    path: "/blog",
    name: "Blogs",
    icon: "fas fa-pencil-alt",
    component: <Blogs />,
    layout: `/${basePath}/admin`,
  },
  // {
  //   path: "/privacyPolicy",
  //   name: "Privacy policy",
  //   icon: "fas fa-shield-alt",
  //   component: <PrivacyPolicy />,
  //   layout: `/${basePath}/admin`,
  // },
  // {
  //   path: "/t&c",
  //   name: "Terms",
  //   icon: "fas fa-gavel",
  //   component: <Terms />,
  //   layout: `/${basePath}/admin`,
  // },
  {
    path: "/login",
    name: "",
    icon: "",
    component: <Login />,
    layout: `/${basePath}/auth`,
  },
  {
    path: "/forgetPassword",
    name: "",
    icon: "",
    component: <ForgetPassword />,
    layout: `/${basePath}/auth`,
  },
];
export default routes;
