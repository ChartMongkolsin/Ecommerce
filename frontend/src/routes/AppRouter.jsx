import { createBrowserRouter,RouterProvider,Navigate } from "react-router-dom";
import Login from "../pages/Login"
import App from "../App"
import Homepage from "../pages/Homepage";
import useUserStore from "../stores/userstore";
import Category from "../components/category/Category";
import Hero from "../components/hero/Hero";
import Footer from "../components/footer/Footer";
import EditUser from "../pages/EditUser";
import Shop from "../pages/Shop";
import AllProduct from "../pages/admin/AllProduct";
import CreateProduct from "../pages/admin/CreateProduct";
import CartModel from "../pages/CartModel";
import EditProduct from "../pages/admin/EditProduct";
import Contact from "../pages/Contact";
import Order from "../pages/Order";
import MyProfile from "../pages/MyProfile";


const guestRouter = createBrowserRouter([
    {path : '/', element: <App/>},
    {path : 'login', element: <Login/>},
    {path : '/', element: <Navigator to="/"/> }
])

const adminRouter = createBrowserRouter([
    {path : '/', element: <App/>,
    children : [
        {path : "/", element :<>
        <Hero />
        <Category />
        </> },
    {path : 'login', element: <Login/>},
    {path : 'edituser', element : <EditUser/>},
    {path : 'myprofile', element : <MyProfile/>},
    {path : 'shop', element : <Shop/>},
    {path : 'allproduct', element: <AllProduct/>},
    {path : 'createproduct', element: <CreateProduct/>},
    {path : 'editproduct', element: <EditProduct/>},
    {path : 'order', element : <Order/>},
    {path : 'contact', element : <Contact/>},
    {path : '/', element: <Navigator to="/"/> }
        ],
    }
])

const userRouter = createBrowserRouter([
    {path : '/', element :<App/>,
        children : [
            {path : "/", element :<>
            <Hero />
            <Category />
            </> },
            {path : 'login', element : <Login/>},
            {path : 'edituser', element : <EditUser/>},
            {path : 'myprofile', element : <MyProfile/>},
            {path : 'shop', element : <Shop/>},
            {path : 'order', element : <Order/>},
            {path : 'contact', element : <Contact/>},
            {path : '*', element : <Navigate to= "/"/>}
        ]
    },
])

export default function AppRouter(){
    const user = useUserStore(state=>state.user)
    // const user = null
    const finalRouter = user?.role == "ADMIN"
    ? adminRouter
    : user?.role == "USER"
    ? userRouter
    : guestRouter
    return(
        <RouterProvider key={user?.id} router = {finalRouter}/>
    )
}