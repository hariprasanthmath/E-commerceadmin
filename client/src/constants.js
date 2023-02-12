export const requestroute = "http://localhost:5000/"
// http://192.168.15.196:5000/ 
// "http://localhost:5000/"
//"https://e-commerceadmin-hariprasanthmath.vercel.app/";
// "http://localhost:5000/"

export const registeruserRoute = requestroute + "admin/register"
export const loginuserRoute = requestroute + "admin/login"
export const getProfiledetailsRoute = requestroute + "admin/profile";


export const DashLinkNav = [
    {
      name : "Profile",
      location : "admin"
    },
    {
      name : "Products",
      location : "admin/products"
    },
    {
      name : "Analytics",
      location : "admin/analytics"
    },
    {
      name : "Create Product",
      location : "admin/create"
    },
    {
      name : "Orders",
      location : "admin/orders"
    },
    {
      name : "User view",
      location : "admin/userview"
    }
  ]

export const sidemenu = [
    {
        name: "Profile",
        path : "profile"
    },
    {
        name : "Analytics",
        path : "analytics"
    },
    {
        name : "Products",
        path : "products"
    },
    {
        name : "Create Product",
        path : "create"
    },
    {
        name : "Orders",
        path : "orders"
    },
    {
      name : "User view",
      path : "userview"
    }
]