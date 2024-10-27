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


export const register = async (email: string, password: string): Promise<void> => {
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
    console.log('Registration successful, userId:', data.userId); 
  } else {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Registration failed');
  }
};