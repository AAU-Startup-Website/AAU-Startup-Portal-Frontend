// lib/api.ts

export const API_BASE_URL = "http://127.0.0.1:8000/api";

// Function to handle user registration
export const registerUser = async (userData: any) => {
  const response = await fetch(`${API_BASE_URL}/users/register/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Something went wrong");
  }
  return response.json();
};

// Function to handle user login
export const loginUser = async (credentials: any) => {
  const response = await fetch(`${API_BASE_URL}/users/login/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Something went wrong");
  }
  return response.json();
};

// Function to get user profile
export const getProfile = async (token: string) => {
  const response = await fetch(`${API_BASE_URL}/users/profile/`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch profile");
  }
  return response.json();
};

// Function to update user profile
export const updateProfile = async (token: string, profileData: any) => {
  const response = await fetch(`${API_BASE_URL}/users/profile/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify(profileData),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Something went wrong");
  }
  return response.json();
};
// Add these to lib/api.ts

// Fetch all ideas for the current user
export const getIdeas = async (token: string) => {
  const response = await fetch(`${API_BASE_URL}/ideas/`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  });
  if (!response.ok) throw new Error("Failed to fetch applications");
  return response.json();
};

// Create a new idea application
export const createIdea = async (token: string, ideaData: any) => {
  const response = await fetch(`${API_BASE_URL}/ideas/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify(ideaData),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(JSON.stringify(errorData) || "Failed to submit idea");
  }
  return response.json();
};

// Update an idea (full update)
export const updateIdea = async (
  token: string,
  ideaId: number,
  ideaData: any
) => {
  const response = await fetch(`${API_BASE_URL}/ideas/${ideaId}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify(ideaData),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(JSON.stringify(errorData) || "Failed to update idea");
  }
  return response.json();
};

// Partially update an idea
export const partialUpdateIdea = async (
  token: string,
  ideaId: number,
  ideaData: any
) => {
  const response = await fetch(`${API_BASE_URL}/ideas/${ideaId}/`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify(ideaData),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(JSON.stringify(errorData) || "Failed to update idea");
  }
  return response.json();
};

// Delete an idea
export const deleteIdea = async (token: string, ideaId: number) => {
  const response = await fetch(`${API_BASE_URL}/ideas/${ideaId}/`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to delete idea");
  }
  return response;
};

// Get a single idea by ID
export const getIdea = async (token: string, ideaId: number) => {
  const response = await fetch(`${API_BASE_URL}/ideas/${ideaId}/`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  });
  if (!response.ok) throw new Error("Failed to fetch idea");
  return response.json();
};

// Approve an idea
export const approveIdea = async (
  token: string,
  ideaId: number,
  feedback?: string
) => {
  const response = await fetch(`${API_BASE_URL}/ideas/${ideaId}/approve/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify({ feedback: feedback || "" }),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(JSON.stringify(errorData) || "Failed to approve idea");
  }
  return response.json();
};

// Reject an idea
export const rejectIdea = async (
  token: string,
  ideaId: number,
  feedback: string
) => {
  const response = await fetch(`${API_BASE_URL}/ideas/${ideaId}/reject/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify({ feedback }),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(JSON.stringify(errorData) || "Failed to reject idea");
  }
  return response.json();
};
