
import SignupForm from "@/components/SignupForm";
import AuthLayout from "@/components/AuthLayout";

const Signup = () => {
  return (
    <AuthLayout
      title="Create an account"
      subtitle="Join SkillTrade and start sharing knowledge"
      footerText="Already have an account?"
      footerLinkText="Log in"
      footerLinkHref="/login"
    >
      <SignupForm />
    </AuthLayout>
  );
};

export default Signup;
