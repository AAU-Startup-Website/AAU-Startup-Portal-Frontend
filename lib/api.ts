// lib/api.ts

export const API_BASE_URL = "/api";

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

// Get startups
export const getStartups = async (token: string) => {
  console.log("Making API call to get startups with token:", token);
  const response = await fetch(`${API_BASE_URL}/startups/`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
  console.log("Startups API response status:", response.status);
  if (!response.ok) {
    const errorText = await response.text();
    console.error("Startups API error:", errorText);
    throw new Error("Failed to fetch startups");
  }
  const data = await response.json();
  console.log("Startups API response data:", data);
  return data;
};

// Get a single startup
export const getStartup = async (token: string, startupId: number) => {
  const response = await fetch(`${API_BASE_URL}/startups/${startupId}/`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
  if (!response.ok) throw new Error("Failed to fetch startup");
  return response.json();
};

// Update startup
export const updateStartup = async (
  token: string,
  startupId: number,
  data: any
) => {
  const response = await fetch(`${API_BASE_URL}/startups/${startupId}/`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Failed to update startup");
  return response.json();
};

// Get milestones
export const getMilestones = async (
  token: string,
  startupId?: number,
  phaseId?: number
) => {
  const params = new URLSearchParams();
  if (startupId) params.append("startup", startupId.toString());
  if (phaseId) params.append("phase", phaseId.toString());
  const url = `${API_BASE_URL}/milestones/?${params}`;
  console.log("Making API call to get milestones:", url);
  const response = await fetch(url, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
  console.log("Get milestones response status:", response.status);
  if (!response.ok) {
    const errorText = await response.text();
    console.error("Get milestones API error:", errorText);
    throw new Error("Failed to fetch milestones");
  }
  const data = await response.json();
  console.log("Get milestones response data:", data);
  return data;
};

// Update milestone
export const updateMilestone = async (
  token: string,
  milestoneId: number,
  data: any
) => {
  console.log(
    "Making API call to update milestone:",
    milestoneId,
    "with data:",
    data
  );
  const response = await fetch(`${API_BASE_URL}/milestones/${milestoneId}/`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify(data),
  });
  console.log("Update milestone response status:", response.status);
  if (!response.ok) {
    const errorText = await response.text();
    console.error("Update milestone API error:", errorText);
    throw new Error("Failed to update milestone");
  }
  const result = await response.json();
  console.log("Update milestone response:", result);
  return result;
};

// Get phases
export const getPhases = async (token: string) => {
  console.log("Making API call to get phases");
  const response = await fetch(`${API_BASE_URL}/phases/`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
  console.log("Get phases response status:", response.status);
  if (!response.ok) {
    const errorText = await response.text();
    console.error("Get phases API error:", errorText);
    throw new Error("Failed to fetch phases");
  }
  const data = await response.json();
  console.log("Get phases response data:", data);
  return data;
};

// Create milestone
export const createMilestone = async (token: string, milestoneData: any) => {
  console.log("Making API call to create milestone with data:", milestoneData);
  const response = await fetch(`${API_BASE_URL}/milestones/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify(milestoneData),
  });
  console.log("Create milestone response status:", response.status);
  if (!response.ok) {
    const errorText = await response.text();
    console.error("Create milestone API error:", errorText);
    throw new Error("Failed to create milestone");
  }
  const result = await response.json();
  console.log("Create milestone response:", result);
  return result;
};

// Get meetings
export const getMeetings = async (token: string) => {
  console.log("Making API call to get meetings");
  const response = await fetch(`${API_BASE_URL}/meetings/`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
  console.log("Get meetings response status:", response.status);
  if (!response.ok) {
    const errorText = await response.text();
    console.error("Get meetings API error:", errorText);
    throw new Error("Failed to fetch meetings");
  }
  const data = await response.json();
  console.log("Get meetings response data:", data);
  return data;
};

// Create meeting
export const createMeeting = async (token: string, meetingData: any) => {
  console.log("Making API call to create meeting with data:", meetingData);
  const response = await fetch(`${API_BASE_URL}/meetings/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify(meetingData),
  });
  console.log("Create meeting response status:", response.status);
  if (!response.ok) {
    const errorText = await response.text();
    console.error("Create meeting API error:", errorText);
    throw new Error("Failed to create meeting");
  }
  const result = await response.json();
  console.log("Create meeting response:", result);
  return result;
};

// Update meeting
export const updateMeeting = async (
  token: string,
  meetingId: number,
  meetingData: any
) => {
  console.log(
    "Making API call to update meeting:",
    meetingId,
    "with data:",
    meetingData
  );
  const response = await fetch(`${API_BASE_URL}/meetings/${meetingId}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify(meetingData),
  });
  console.log("Update meeting response status:", response.status);
  if (!response.ok) {
    const errorText = await response.text();
    console.error("Update meeting API error:", errorText);
    throw new Error("Failed to update meeting");
  }
  const result = await response.json();
  console.log("Update meeting response:", result);
  return result;
};

// Delete meeting
export const deleteMeeting = async (token: string, meetingId: number) => {
  console.log("Making API call to delete meeting:", meetingId);
  const response = await fetch(`${API_BASE_URL}/meetings/${meetingId}/`, {
    method: "DELETE",
    headers: {
      Authorization: `Token ${token}`,
    },
  });
  console.log("Delete meeting response status:", response.status);
  if (!response.ok) {
    const errorText = await response.text();
    console.error("Delete meeting API error:", errorText);
    throw new Error("Failed to delete meeting");
  }
  console.log("Delete meeting successful");
  return true;
};

// Get matched users for co-founder matching
export const getMatchedUsers = async (token: string, search?: string) => {
  console.log("Making API call to get matched users");
  const params = new URLSearchParams();
  if (search) params.append("search", search);

  const url = `${API_BASE_URL}/users/match/?${params.toString()}`;
  const response = await fetch(url, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
  console.log("Get matched users response status:", response.status);
  if (!response.ok) {
    const errorText = await response.text();
    console.error("Get matched users API error:", errorText);
    throw new Error("Failed to fetch matched users");
  }
  const data = await response.json();
  console.log("Get matched users response data:", data);
  return data;
};
