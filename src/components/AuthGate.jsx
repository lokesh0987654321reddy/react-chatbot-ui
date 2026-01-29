import { useSelector } from "react-redux";

const AuthGate = ({ children }) => {
  const { loading } = useSelector((state) => state.auth);
  console.log("AuthGate loading:", loading);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-xl">
        Checking session...
      </div>
    );
  }

  return children;
};

export default AuthGate;