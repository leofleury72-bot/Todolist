import ApiFetch from "./ApiFetch";

const useLogout = () => {
  const logout = async () => {
    await ApiFetch("/api/logout", { method: "POST" });
  };

  return { logout };
};

export default useLogout;
