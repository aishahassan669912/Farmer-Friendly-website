const API_BASE_URL = 'http://localhost:5004/api';

// Helper function for API calls
const apiCall = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token');
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
      ...options.headers
    },
    ...options
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'API request failed');
    }
    
    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// Generate 7-digit code for password reset (fallback)
export const generateResetCode = () => {
  return Math.floor(1000000 + Math.random() * 9000000).toString();
};

// Send reset code to email
export const sendResetCode = async (email) => {
  try {
    const result = await apiCall('/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email })
    });
    
    return { success: true, message: 'Reset code sent to your email' };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

// Verify reset code
export const verifyResetCode = async (email, code) => {
  try {
    const result = await apiCall('/auth/verify-code', {
      method: 'POST',
      body: JSON.stringify({ email, code })
    });
    
    return { success: true, message: 'Code verified successfully' };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

// Login function
export const loginUser = async (email, password) => {
  try {
    const result = await apiCall('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });
    
    // Store token
    if (result.token) {
      localStorage.setItem('token', result.token);
    }
    
    return {
      success: true,
      user: result.user,
      message: 'Login successful'
    };
  } catch (error) {
    return {
      success: false,
      message: error.message
    };
  }
};

// Signup function
export const signupUser = async (userData) => {
  try {
    const result = await apiCall('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData)
    });
    
    // Store token
    if (result.token) {
      localStorage.setItem('token', result.token);
    }
    
    return {
      success: true,
      user: result.user,
      message: 'Account created successfully'
    };
  } catch (error) {
    return {
      success: false,
      message: error.message
    };
  }
};

// Reset password
export const resetPassword = async (email, code, newPassword) => {
  try {
    const result = await apiCall('/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify({ email, code, newPassword })
    });
    
    return {
      success: true,
      message: 'Password reset successfully'
    };
  } catch (error) {
    return {
      success: false,
      message: error.message
    };
  }
};

// Drought Reports API
export const createDroughtReport = async (reportData) => {
  try {
    const result = await apiCall('/drought-reports', {
      method: 'POST',
      body: JSON.stringify(reportData)
    });
    
    return {
      success: true,
      message: 'Drought report submitted successfully'
    };
  } catch (error) {
    return {
      success: false,
      message: error.message
    };
  }
};

export const getDroughtReports = async () => {
  try {
    const result = await apiCall('/drought-reports');
    return {
      success: true,
      reports: result.reports
    };
  } catch (error) {
    return {
      success: false,
      message: error.message
    };
  }
};

export const getDroughtReport = async (reportId) => {
  try {
    const result = await apiCall(`/drought-reports/${reportId}`);
    return {
      success: true,
      report: result.report
    };
  } catch (error) {
    return {
      success: false,
      message: error.message
    };
  }
};

export const updateDroughtReport = async (reportId, reportData) => {
  try {
    const result = await apiCall(`/drought-reports/${reportId}`, {
      method: 'PUT',
      body: JSON.stringify(reportData)
    });
    
    return {
      success: true,
      message: 'Report updated successfully'
    };
  } catch (error) {
    return {
      success: false,
      message: error.message
    };
  }
};

export const deleteDroughtReport = async (reportId) => {
  try {
    const result = await apiCall(`/drought-reports/${reportId}`, {
      method: 'DELETE'
    });
    
    return {
      success: true,
      message: 'Report deleted successfully'
    };
  } catch (error) {
    return {
      success: false,
      message: error.message
    };
  }
};

// Users Management API
export const getUsers = async () => {
  try {
    const result = await apiCall('/users');
    return {
      success: true,
      users: result.users
    };
  } catch (error) {
    return {
      success: false,
      message: error.message
    };
  }
};

export const updateUser = async (userId, userData) => {
  try {
    const result = await apiCall(`/users/${userId}`, {
      method: 'PUT',
      body: JSON.stringify(userData)
    });
    
    return {
      success: true,
      message: 'User updated successfully'
    };
  } catch (error) {
    return {
      success: false,
      message: error.message
    };
  }
};

export const deleteUser = async (userId) => {
  try {
    const result = await apiCall(`/users/${userId}`, {
      method: 'DELETE'
    });
    
    return {
      success: true,
      message: 'User deleted successfully'
    };
  } catch (error) {
    return {
      success: false,
      message: error.message
    };
  }
};

// Get user profile
export const getUserProfile = async () => {
  try {
    const result = await apiCall('/user/profile');
    return {
      success: true,
      user: result.user
    };
  } catch (error) {
    return {
      success: false,
      message: error.message
    };
  }
};

// Get support requests
export const getSupportRequests = async () => {
  try {
    const result = await apiCall('/support-requests');
    return {
      success: true,
      requests: result.requests
    };
  } catch (error) {
    return {
      success: false,
      message: error.message
    };
  }
};

// Create support request
export const createSupportRequest = async (requestData) => {
  try {
    const result = await apiCall('/support-requests', {
      method: 'POST',
      body: JSON.stringify(requestData)
    });
    
    return {
      success: true,
      message: 'Support request created successfully'
    };
  } catch (error) {
    return {
      success: false,
      message: error.message
    };
  }
};

// Update support request status
export const updateRequestStatus = async (requestId, status) => {
  try {
    const result = await apiCall(`/support-requests/${requestId}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status })
    });
    
    return {
      success: true,
      message: 'Request status updated successfully'
    };
  } catch (error) {
    return {
      success: false,
      message: error.message
    };
  }
};

// Admin: Get all users
export const getAllUsers = async () => {
  try {
    const result = await apiCall('/admin/users');
    return {
      success: true,
      users: result.users
    };
  } catch (error) {
    return {
      success: false,
      message: error.message
    };
  }
};

// Admin: Get platform stats
export const getPlatformStats = async () => {
  try {
    const result = await apiCall('/admin/stats');
    return {
      success: true,
      stats: result.stats
    };
  } catch (error) {
    return {
      success: false,
      message: error.message
    };
  }
};

// Logout function
export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

// Check if user is authenticated
export const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  return !!token;
};
