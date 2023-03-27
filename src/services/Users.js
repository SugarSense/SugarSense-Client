// Fetch with axios
import axios from 'axios';

// Get all users
export const getUsers = async () => {
    const res = await axios.get('monLiens.zebi');
    return res.data;
}