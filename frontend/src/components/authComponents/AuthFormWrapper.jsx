import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

function AuthFormWrapper({
  isRegisterPage,
  onSubmit,
  formData,
  setFormData,
  errors,
  successMessage,
  onGoogleLogin,
}) {
  return (
    <form onSubmit={onSubmit} className="w-full">
      {isRegisterPage ? (
        <RegisterForm {...formData} {...setFormData} errors={errors} />
      ) : (
        <LoginForm
          {...formData}
          {...setFormData}
          errors={errors}
          successMessage={successMessage}
          onGoogleLogin={onGoogleLogin}
        />
      )}
    </form>
  );
}

export default AuthFormWrapper;
