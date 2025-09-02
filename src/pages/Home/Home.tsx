import { useAuth } from "../../contexts/AuthContext";

const Home = () => {
  const { logout } = useAuth();

  return (
    <>
      <h1>Home Page</h1>
      <button onClick={logout}>Logout</button>
    </>
  );
};

export default Home;
