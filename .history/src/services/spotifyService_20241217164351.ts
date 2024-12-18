import axios from 'axios';

const token = localStorage.getItem('access_token');;

export const fetchPlaylists = async () => {
  try {
    debugger
    const response = await axios.get('https://api.spotify.com/v1/me/playlists', {
      headers: { Authorization: `Bearer ${token}` },
    });
    debugger
    return response.data;
  } catch (error) {
    console.error('Error fetching playlists:', error);
    throw error;
  }
};
