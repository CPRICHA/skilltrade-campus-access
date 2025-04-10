
import { Link } from "react-router-dom";
import LoginForm from "@/components/LoginForm";
import AuthLayout from "@/components/AuthLayout";

const Login = () => {
  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Log in to your SkillTrade account"
      footerText="Don't have an account?"
      footerLinkText="Sign up"
      footerLinkHref="/signup"
    >
      <LoginForm />
    </AuthLayout>
  );
};

export default Login;
