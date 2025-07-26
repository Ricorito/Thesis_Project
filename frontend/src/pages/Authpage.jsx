import AuthLayout from "../components/authComponents/AuthLayout";
import AuthForm from "../components/authComponents/AuthFormWrapper";

import useAuth from "../hooks/authHooks/useAuth";
import logo from "/assets/logo.png";

function AuthPage() {
  const {
    isRegisterPage,
    togglePage,
    handleSubmit,
    formData,
    setFormData,
    handleGoogleLogin,
    errors,
    successMessage,
  } = useAuth();
    const currentUser = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      <AuthLayout isRegisterPage={isRegisterPage} onToggle={togglePage} logo={logo}>
        <AuthForm
          isRegisterPage={isRegisterPage}
          onSubmit={handleSubmit}
          onGoogleLogin={handleGoogleLogin}
          formData={formData}
          setFormData={setFormData}
          errors={errors}
          successMessage={successMessage}
        />
      </AuthLayout>
      <div className="footer">
      </div>
    </>
  );
}

export default AuthPage;