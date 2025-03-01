import axios from 'axios';

const API_URL = 'http://localhost:8000/api/v1';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add authorization token to requests if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Auth services
export const authService = {
  login: async (employeeId, password) => {
    const formData = new FormData();
    formData.append('username', employeeId);
    formData.append('password', password);
    
    try {
      const response = await axios.post(`${API_URL}/auth/login`, formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
      
      // Store token in localStorage
      if (response.data.access_token) {
        localStorage.setItem('token', response.data.access_token);
      }
      
      return response.data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },
  
  logout: () => {
    localStorage.removeItem('token');
  },
  
  isAuthenticated: () => {
    return localStorage.getItem('token') !== null;
  }
};

// Project services
export const projectService = {
  getProjects: async () => {
    try {
      const response = await api.get('/projects');
      return response.data;
    } catch (error) {
      console.error('Error fetching projects:', error);
      throw error;
    }
  },
  
  getProject: async (projectId) => {
    try {
      const response = await api.get(`/projects/${projectId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching project ${projectId}:`, error);
      throw error;
    }
  },
  
  getRole: async (projectId, roleId) => {
    try {
      const response = await api.get(`/projects/${projectId}/roles/${roleId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching role ${roleId}:`, error);
      throw error;
    }
  }
};

// Analysis services
export const analysisService = {
  analyzeResume: async (projectId, roleId, file) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await api.post(`/analysis/upload/${projectId}/${roleId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      return response.data;
    } catch (error) {
      console.error('Error analyzing resume:', error);
      throw error;
    }
  },
  
  getLearningPath: async (projectId, roleId) => {
    try {
      const response = await api.get(`/analysis/learning-path/${projectId}/${roleId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching learning path:', error);
      throw error;
    }
  }
};

export default {
  auth: authService,
  projects: projectService,
  analysis: analysisService
};