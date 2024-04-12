import AuthMain from "@/components/auth/Login/AuthMain";
const Login = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="flex flex-col justify-center w-[50%] p-8 h-[450px]border-white border-[2px] rounded-lg">
        <AuthMain />
      </div>
    </div>
  );
};
export default Login;
