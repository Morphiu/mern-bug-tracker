import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const CreateBug = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'open',
    priority: 'medium',
    assignedTo: null,
  });
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Authentication token not found');
        return;
      }

      console.log('Fetching users with token:', token.substring(0, 10) + '...');
      const response = await axios.get(`${import.meta.env.VITE_BASE_API_URL}/api/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Users fetched successfully:', response.data);
      setUsers(response.data);
    } catch (err) {
      console.error('Error details:', {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status,
      });
      setError(err.response?.data?.message || 'Failed to fetch users');
    }
  };

  const handleChange = (e) => {
    const value = e.target.name === 'assignedTo' && e.target.value === '' ? null : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `${import.meta.env.VITE_BASE_API_URL}/api/bugs`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate('/bugs');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create bug');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom align="center">
            Create New Bug
          </Typography>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              margin="normal"
              multiline
              rows={4}
              required
            />
            <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  name="status"
                  value={formData.status}
                  label="Status"
                  onChange={handleChange}
                >
                  <MenuItem value="open">Open</MenuItem>
                  <MenuItem value="in-progress">In Progress</MenuItem>
                  <MenuItem value="resolved">Resolved</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel>Priority</InputLabel>
                <Select
                  name="priority"
                  value={formData.priority}
                  label="Priority"
                  onChange={handleChange}
                >
                  <MenuItem value="high">High</MenuItem>
                  <MenuItem value="medium">Medium</MenuItem>
                  <MenuItem value="low">Low</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel>Assign To</InputLabel>
              <Select
                name="assignedTo"
                value={formData.assignedTo || ''}
                label="Assign To"
                onChange={handleChange}
              >
                <MenuItem value="">Unassigned</MenuItem>
                {users.map((user) => (
                  <MenuItem key={user._id} value={user._id}>
                    {user.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={loading}
                sx={{ minWidth: 120 }}
              >
                {loading ? 'Creating...' : 'Create Bug'}
              </Button>
            </Box>
          </form>
        </Paper>
      </Box>
    </Container>
  );
};

export default CreateBug; 