import { useState } from "react";
import FormError from "./FormError";
import { TermsCheckbox } from "./TermsChexkbox";
function RegisterForm({
  name,
  email,
  username,
  password,
  birthday,
  repassword,
  setName,
  setEmail,
  setUsername,
  setPassword,
  setRepassword,
  setBirthday,
  errors,
}) {

  const [termsAccepted, setTermsAccepted] = useState(false);

  return (
    <>
      <h2 className="text-xl font-bold mb-4 text-center text-white">Sign Up</h2>

      <div className="mb-2 w-full">
        <label
          htmlFor="name"
          className="block text-sm font-medium text-white mb-1"
        >
          Full Name
        </label>
        <input
          id="name"
          type="text"
          placeholder="Full Name"
          className={`w-full p-2 border rounded ${
            errors.name ? "border-red-500" : ""
          }`}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {errors.name && <FormError message={errors.name} />}
      </div>

      <div className="mb-2 w-full">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-white mb-1"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          placeholder="Email"
          className={`w-full p-2 border rounded ${
            errors.email ? "border-red-500" : ""
          }`}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && <FormError message={errors.email} />}
      </div>
      <div className="mb-2 w-full">
  <label htmlFor="birthday" className="block text-sm font-medium text-white mb-1">
    Birthday
  </label>
  <input
    id="birthday"
    type="date"
    className="w-full p-2 border rounded"
    value={birthday}
    onChange={(e) => setBirthday(e.target.value)}
    required
  />
</div>    
      <div className="mb-2 w-full">
        <label
          htmlFor="username"
          className="block text-sm font-medium text-white mb-1"
        >
          Username
        </label>
        <input
          id="username"
          type="text"
          placeholder="Username"
          className={`w-full p-2 border rounded ${
            errors.username ? "border-red-500" : ""
          }`}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        {errors.username && <FormError message={errors.username} />}
      </div>

      <div className="mb-2 w-full">
        <label
          htmlFor="password"
          className="block text-sm font-medium text-white mb-1"
        >
          Password
        </label>
        <input
          id="password"
          type="password"
          placeholder="Password"
          className={`w-full p-2 border rounded ${
            errors.password ? "border-red-500" : ""
          }`}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password && <FormError message={errors.password} />}
      </div>

      <div className="mb-2 w-full">
        <label
          htmlFor="repassword"
          className="block text-sm font-medium text-white mb-1"
        >
          Repeat Password
        </label>
        <input
          id="repassword"
          type="password"
          placeholder="Repeat Password"
          className={`w-full p-2 border rounded ${
            errors.repassword ? "border-red-500" : ""
          }`}
          value={repassword}
          onChange={(e) => setRepassword(e.target.value)}
        />
        {errors.repassword && <FormError message={errors.repassword} />}
      </div>

      {errors.general && (
        <p className="text-center font-bold text-red-600">{errors.general}</p>
      )}
       <div className="flex justify-left">
        <TermsCheckbox 
          checked={termsAccepted} 
          onCheckedChange={setTermsAccepted}
        />
      </div>

      <div className="flex justify-center mt-4">
        <button
          type="submit"
          className={`${
            termsAccepted 
              ? "bg-teal-600 hover:bg-teal-700" 
              : "bg-gray-400 cursor-not-allowed"
          } text-white px-4 py-2 rounded-lg transition duration-300`}
          disabled={!termsAccepted}
        >
          Sign Up
        </button>
      </div>
    </>
  );
}

export default RegisterForm;
