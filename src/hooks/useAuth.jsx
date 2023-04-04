import axios from "axios";
import React, {createContext, useContext, useEffect, useState} from "react";
import Cookies from "universal-cookie";

export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

const AuthContextProvider = (props) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const cookies = new Cookies();

  useEffect(() => {
    (async () => {
      const token = cookies.get("auth_token");

      if (token) {
        try {
          await axios
            .get(`${import.meta.env.VITE_API_PATH}/auth/user`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .then((res) => {
              setUser(res.data.user);
              setLoading(false);

              if (res.data.user.verified === true) {
                cookies.remove("verify_email_sent");
              }
              // console.log(res.data.user);
            })
            .catch((err) => {
              console.log(err);
              cookies.remove("auth_token");
            });
        } catch (err) {
          console.log(err);
          window.location.href = "/";
          // cookies.remove("auth_token");
        }
      }
      setLoading(false);
    })();
  }, []);

  return (
    <AuthContext.Provider value={{user}}>
      {!loading && props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
