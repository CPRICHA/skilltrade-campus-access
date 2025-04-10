
import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
  footerText?: string;
  footerLinkText?: string;
  footerLinkHref?: string;
}

const AuthLayout = ({
  children,
  title,
  subtitle,
  footerText,
  footerLinkText,
  footerLinkHref
}: AuthLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-skillTrade-blue/30 px-4 py-8">
      <div className="mb-6 text-center">
        <Link to="/" className="inline-block">
          <h1 className="text-4xl font-bold text-skillTrade-purple">SkillTrade</h1>
        </Link>
      </div>
      
      <div className="auth-card animate-fade-in">
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
          {subtitle && <p className="mt-2 text-skillTrade-coolGray">{subtitle}</p>}
        </div>
        
        {children}
        
        {footerText && footerLinkText && footerLinkHref && (
          <div className="mt-6 text-center text-sm">
            <p className="text-skillTrade-neutral">
              {footerText}{" "}
              <Link to={footerLinkHref} className="auth-link">
                {footerLinkText}
              </Link>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthLayout;
