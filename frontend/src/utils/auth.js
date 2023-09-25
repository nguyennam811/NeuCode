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
  
  export const writeAuthToken = (token, expiresIn) => {
    localStorage.setItem('token', token);
    const expiration = new Date(new Date().getTime() + expiresIn * 1000);
    localStorage.setItem('expiration', expiration.toISOString());
  };
  
  export const getAuthToken = () => {
    const token = localStorage.getItem('token');
    console.log(token)
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
  };
  