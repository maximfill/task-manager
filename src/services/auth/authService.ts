export const login = async (username: string, password: string): Promise<string | null> => {
  const response = await fetch('http://api.calmplete.net/api/InternalLogin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      state: 'Internal',
      username,
      password,
    }),
  });

  if (response.ok) {
    const data = await response.json();
    return data.accessToken;
  } else {
    throw new Error('Login failed');
  }
};


export const register = async (email: string, password: string): Promise<string | null> => {
  try {
    const response = await fetch('http://api.calmplete.net/api/InternalLogin/sign-up', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Registration successful:', data.userId);
      return null;
    } else {
      const errorData = await response.json();
      console.log('Registration failed:', errorData);
      return errorData.errors?.Password?.[0] || 'Registration failed';
    }
  } catch (error) {
    console.error('Unexpected error during registration:', error);
    return 'An unexpected error occurred';
  }
};