import { useState, useEffect } from "react";
import axios from "axios";

export default function CurrentUser() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [roles, setRoles] = useState([]);

  const fetchCurrentUser = async () => {
    try {
      const response = await axios.get("http://localhost:8080/user", {
        withCredentials: true,
      });
      setUser(response.data.user);
      setRoles(response.data.roles);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  return {
    user,
    setUser,
    roles,
    isLoading,
  };
}
