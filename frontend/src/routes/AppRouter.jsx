import { createBrowserRouter,RouterProvider,Navigate } from "react-router-dom";
import Login from "../pages/Login"
import App from "../App"
import Homepage from "../pages/Homepage";


const guestRouter = createBrowserRouter([
    {path : '/', element: <App/>},
    {path : '/', element: <Navigator to="/"/> }
])

const userRouter = createBrowserRouter([
    {path : '/', element :<App/>,
        children : [
            {path : "/", element : <>
            
            
            </>},
            {path : 'friend', element : <p>Friends Page</p>},
            {path : '*', element : <Navigate to= "/"/>}
        ]
    },
])

export default function AppRouter(){
    const user = null
    const finalRouter = user ? userRouter : guestRouter
    return(
        <RouterProvider router = {finalRouter}/>
    )
}