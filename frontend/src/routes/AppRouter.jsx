import { createBrowserRouter,RouterProvider,Navigate } from "react-router-dom";
import Login from "../pages/Login"
import App from "../App"
import Homepage from "../pages/Homepage";
import useUserStore from "../stores/userstore";


const guestRouter = createBrowserRouter([
    {path : '/', element: <App/>},
    {path : 'login', element: <Login/>},
    {path : '/', element: <Navigator to="/"/> }
])

const userRouter = createBrowserRouter([
    {path : '/', element :<App/>,
        children : [
            {path : "/", element : <>
            
            
            </>},
            {path : 'login', element : <Login/>},
            {path : '*', element : <Navigate to= "/"/>}
        ]
    },
])

export default function AppRouter(){
    // const user = useUserStore(state=>state.user)
    const user = null
    const finalRouter = user ? userRouter : guestRouter
    return(
        <RouterProvider router = {finalRouter}/>
    )
}