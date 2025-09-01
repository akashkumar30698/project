//const BASE_URL = `/auth`; // change this to your backend URL

export const requestOtp = async (email: string) => {
  try {
    const res = await fetch(`https://backend-note-ltfp.onrender.com/auth/request-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
      credentials: 'include',
    });

    if (!res.ok) {
      const errData = await res.json();
      throw new Error(errData.message || 'Failed to request OTP');
    }

    return true; // success
  } catch (error: any) {
    return error.message || 'Something went wrong while requesting OTP';
  }
};

export const signUp = async (email: string, name: string, dateOfBirth: string) => {
  try {
    const res = await fetch(`hhttps://backend-note-ltfp.onrender.com/auth/request-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, name, dateOfBirth }),
      credentials: 'include',
    });

    if (!res.ok) {
      const errData = await res.json();
      throw new Error(errData.message || 'Signup failed');
    }

    return true;
  } catch (error: any) {
    return error.message || 'Something went wrong during signup';
  }
};

export const verifyOtp = async (email: string, code: string) => {
  try {
    const res = await fetch(`https://backend-note-ltfp.onrender.com/auth/verify-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, code }),
      credentials: 'include',
    });

    if (!res.ok) {
      const errData = await res.json();
      throw new Error(errData.message || 'OTP verification failed');
    }

    return res;
  } catch (error: any) {
    return error.message || 'Something went wrong while verifying OTP';
  }
};
