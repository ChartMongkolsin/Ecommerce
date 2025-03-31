import { useEffect, useState } from "react";
import useUserStore from "../stores/userstore";

// rfce
function ProtectRoute({ el, allows }) {
  const [ok, setOk] = useState(null);
  //   console.log("Hello, Protect Route");
  //   const user = useAuthStore((state) => state.user);
  const token = useUserStore((state) => state.token);

  useEffect(() => {
    // code
    checkPermission();
  }, []);

  const checkPermission = async () => {
    // code body
    // console.log("Check permission");
    try {
      const res = await actionCurrentUser(token);
      // Role from back-end
      const role = res.data.result.role;
      //   console.log(role);
      setOk(allows.includes(role));
    } catch (error) {
      console.log(error);
      setOk(false);
    }
  };
  console.log(ok);
  if (ok === null) {
    return <h1>Loading...</h1>;
  }
  if (!ok) {
    return <h1>Unauthorized!!!</h1>;
  }

  return el;
}
export default ProtectRoute;