import { useAuth } from "../../contexts/AuthContext";
import { Header } from "../../components/Header";

const Home = () => {
  const { logout } = useAuth();

  return (
    <>
      <Header />
      <h1>Home Page</h1>
      <button onClick={logout}>Logout</button>
    </>
  );
};

export default Home;
