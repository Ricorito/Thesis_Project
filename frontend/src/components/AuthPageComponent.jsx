import { useAuthForm } from "../hooks/authHooks/useAuthForm";
import AuthCard from "./authComponents/AuthCard";
import AOSWrapper from "../aos/AOSWrapper";

const AuthPageComponent = () => {
  const {
    isRegisterPage,
    setIsRegisterPage,
    form,
    handleChange,
    handleSubmit,
    errors,
    successMessage
  } = useAuthForm();

  const toggleMode = () => {
    setIsRegisterPage(!isRegisterPage);
  };

  return (
    <AOSWrapper>
      <div className="min-h-screen flex items-center justify-center bg-stone-100 py-12 px-4 sm:px-6 lg:px-8">
        <div data-aos="zoom-in" className="max-w-6xl w-full flex items-center justify-center">
          <AuthCard
            isRegisterPage={isRegisterPage}
            toggleMode={toggleMode}
            form={form}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            errors={errors}
            successMessage={successMessage}
          />
        </div>
      </div>
    </AOSWrapper>
  );
};

export default AuthPageComponent;
