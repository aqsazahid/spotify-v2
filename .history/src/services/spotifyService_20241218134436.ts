const client_id = process.env.VUE_APP_SPOTIFY_CLIENT_ID;
const client_secret = process.env.VUE_APP_SPOTIFY_CLIENT_SECRET;

const SpotifyService = {
  // Method to fetch Spotify Access Token
  async getAccessToken() {
    const url = 'https://accounts.spotify.com/api/token';
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Basic ' + btoa(`${client_id}:${client_secret}`),
    };

    const body = 'grant_type=client_credentials';

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers,
        body,
      });
      const data = await response.json();
      return data.access_token;
    } catch (error) {
      console.error('Error fetching access token:', error.message);
      return null;
    }
  },

  async getCategories(limit = 10, offset = 0) {
    const accessToken = await this.getAccessToken();
    if (!accessToken) return [];
  
    const url = `https://api.spotify.com/v1/browse/categories?limit=${limit}&offset=${offset}`;
  
    try {
      const response = await fetch(url, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const data = await response.json();
      return data.categories || { items: [] };
    } catch (error) {
      console.error('Error fetching categories:', error.message);
      return { items: [] };
    }
  },
  
  // Method to fetch paginated data for playlists or artists
  async searchForRegion(countryCode, type, offset = 0, limit = 8) {
    const accessToken = await this.getAccessToken();
    if (!accessToken) return [];

    const query = `Top ${countryCode} Hits`; // Generic search query
    const url = `https://api.spotify.com/v1/search?q=${encodeURIComponent(
      query
    )}&type=${type}&market=${countryCode}&limit=${limit}&offset=${offset}`;

    try {
      const response = await fetch(url, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const data = await response.json();

      if (type === 'playlist') return data.playlists?.items || [];
      if (type === 'artist') return data.artists?.items || [];
      return [];
    } catch (error) {
      console.error(`Error fetching ${type}:`, error.message);
      return [];
    }
  },
};

export default SpotifyService;
