const Authenticator = {
  isAuthenticated: false,
  login(callback) {
    Authenticator.isAuthenticated = true;
    setTimeout(callback, 100); // fake async
  },
  logout(callback) {
    Authenticator.isAuthenticated = false;
    setTimeout(callback, 100);
  },
};

export { Authenticator };