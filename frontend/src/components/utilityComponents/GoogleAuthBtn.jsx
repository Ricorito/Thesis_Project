import { useGoogleLogin } from "@react-oauth/google";

const GoogleAuthBtn = ({ className = "", onSuccess }) => {
  const login = useGoogleLogin({
    flow: "auth-code",
    onSuccess: async ({ code }) => {
      await onSuccess(code);
    },
    onError: (err) => {
      console.error("Google login error:", err);
    },
  });

  return (
    <button
      type="button"
      onClick={() => login()}
      className={`flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition ${className}`}
    >
      <svg
        className="w-5 h-5"
        viewBox="0 0 533.5 544.3"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M533.5 278.4c0-17.4-1.6-34.1-4.6-50.4H272v95.3h146.9c-6.3 33.7-25.1 62.2-53.5 81.3v67.3h86.4c50.6-46.6 81.7-115.4 81.7-193.5z"
          fill="#4285f4"
        />
        <path
          d="M272 544.3c72.6 0 133.6-24.1 178.1-65.4l-86.4-67.3c-24 16.1-54.7 25.6-91.7 25.6-70.5 0-130.2-47.6-151.5-111.4H31.8v69.9c44.6 88.1 136.7 148.6 240.2 148.6z"
          fill="#34a853"
        />
        <path
          d="M120.5 326.1c-10.4-30.7-10.4-63.9 0-94.6V161.6H31.8c-40.6 81.2-40.6 177.9 0 259.1l88.7-94.6z"
          fill="#fbbc04"
        />
        <path
          d="M272 107.7c39.4-.6 77.5 13.7 107 40.4l80.2-80.2C414.8 24.2 344.9-1.1 272 0 168.5 0 76.4 60.5 31.8 161.6l88.7 69.9C141.8 155.3 202.5 107.7 272 107.7z"
          fill="#ea4335"
        />
      </svg>
      <span className="text-sm font-medium">Google</span>
    </button>
  );
};

export default GoogleAuthBtn;
