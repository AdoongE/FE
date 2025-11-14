import { createContext, useContext, useState } from 'react';

const SignupContext = createContext();

export const SignupProvider = ({ children }) => {
  const [signupData, setSignupData] = useState({
    nickname: '',
    birthday: '',
    gender: '',
    occupation: '',
    field: '',
    consentToTermsOfService: false,
    consentToPersonalInformation: false,
    consentToMarketingAndAds: false,
  });

  const updateSignup = (field, value) => {
    setSignupData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const resetSignup = () => {
    setSignupData({
      nickname: '',
      birthday: '',
      gender: '',
      occupation: '',
      field: '',
      consentToTermsOfService: false,
      consentToPersonalInformation: false,
      consentToMarketingAndAds: false,
    });
  };

  return (
    <SignupContext.Provider value={{ signupData, updateSignup, resetSignup }}>
      {children}
    </SignupContext.Provider>
  );
};

export const useSignup = () => useContext(SignupContext);
