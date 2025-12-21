// lib/api.ts

const API_BASE_URL = 'http://127.0.0.1:8000/api';

// Function to handle user registration
export const registerUser = async (userData: any) => {
  const response = await fetch(`${API_BASE_URL}/users/register/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Something went wrong');
  }
  return response.json();
};

// Function to handle user login
export const loginUser = async (credentials: any) => {
  const response = await fetch(`${API_BASE_URL}/users/login/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Something went wrong');
  }
  return response.json();
};

// Function to get user profile
export const getProfile = async (token: string) => {
  const response = await fetch(`${API_BASE_URL}/users/profile/`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error('Failed to fetch profile');
  }
  return response.json();
};

// Function to update user profile
export const updateProfile = async (token: string, profileData: any) => {
  const response = await fetch(`${API_BASE_URL}/users/profile/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${token}`,
    },
    body: JSON.stringify(profileData),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Something went wrong');
  }
  return response.json();
};
