const handleGoogleLogin = () => {
  const clientId = encodeURIComponent(
    process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID,
  );
  const redirectUrl = encodeURIComponent(
    process.env.REACT_APP_GOOGLE_REDIRECT_URL,
  );

  const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUrl}&response_type=code&scope=email profile&state=your_random_state_value`;

  window.location.href = googleAuthUrl;
};

export default handleGoogleLogin;
