import AuthSwitcher from "./AuthSwitcher";
import AuthFormWrapper from "./AuthFormWrapper";

const AuthCard = ({ isRegisterPage, toggleMode }) => {
  return (
    <div className="relative w-[800px] h-[600px] shadow-xl rounded-lg overflow-hidden flex">
      {/* Left sliding panel */}
      <AuthSwitcher isRegisterPage={isRegisterPage} toggleMode={toggleMode} />

      {/* Right form panel */}
      <AuthFormWrapper isRegisterPage={isRegisterPage} />
    </div>
  );
};

export default AuthCard;
