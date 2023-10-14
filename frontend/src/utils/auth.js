export const getTokenDuration = () => {
    const storedExpirationDate = localStorage.getItem('expiration');
  
    if (!storedExpirationDate) {
      return -1;
    }
  
    const expirationDate = new Date(storedExpirationDate);
    const now = new Date();
    const duration = expirationDate.getTime() - now.getTime();
    return duration;
  };
  
  export const writeAuthToken = (token, expiresIn, decodedToken) => {
    localStorage.setItem('token', token);
    const expiration = new Date(new Date().getTime() + expiresIn * 1000);
    localStorage.setItem('expiration', expiration.toISOString());
    const current_user = JSON.stringify(decodedToken);
    localStorage.setItem('current_user', current_user);
  };

  export const getCurrentUser = () => {
    const current_user_json = localStorage.getItem('current_user');
    const current_user = JSON.parse(current_user_json);
    if (!current_user) {
      return null;
    }
    return current_user
  };
  
  export const getAuthToken = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      return null;
    }
    const tokenDuration = getTokenDuration();
    if (tokenDuration < 0) {
      return 'EXPIRED';
    }
  
    return token;
  };
  
  export const removeAuthToken = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('current_user');
  };
  