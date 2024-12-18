import axios from 'axios';

const token = 'YOUR_SPOTIFY_TOKEN';

export const fetchPlaylists = async () => {
  try {
    const response = await axios.get('https://api.spotify.com/v1/me/playlists', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching playlists:', error);
    throw error;
  }
};
