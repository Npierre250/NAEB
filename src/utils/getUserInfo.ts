// Helper function to decode Base64 URL
const base64UrlDecode = (str: string): string => {
    return decodeURIComponent(
      atob(str.replace(/_/g, '/').replace(/-/g, '+'))
        .split('')
        .map((c) => `%${c.charCodeAt(0).toString(16).padStart(2, '0')}`)
        .join('')
    );
  };
  
  // Function to get user info from the token
  const getUserInfo = (): any | null => {
    const token = localStorage.getItem('token');
    if (!token) return null;
  
    try {
      const payloadBase64 = token.split('.')[1];
      if (!payloadBase64) return null;
  
      const payload = JSON.parse(base64UrlDecode(payloadBase64));
      return payload;
    } catch (error) {
      console.error('Failed to decode token:', error);
      return null;
    }
  };
  
  export default getUserInfo;
  