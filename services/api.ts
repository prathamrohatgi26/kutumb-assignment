import axios from "axios";

const BASE_URL = "https://assignment.stage.crafto.app";
const MEDIA_URL = "https://crafto.app/crafto/v1.0/media/assignment";

export const apiService = {
  login: async (username: string, otp: string) => {
    try {
      const response = await axios.post(`${BASE_URL}/login`, {
        username,
        otp,
      });
      return response.data;
    } catch (error) {
      console.error("Login failed", error);
      throw error;
    }
  },

  uploadMedia: async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(`${MEDIA_URL}/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response?.data?.[0]?.url;
    } catch (error) {
      console.error("Media upload failed", error);
      throw error;
    }
  },

  createQuote: async (text: string, mediaUrl: string, token: string) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/postQuote`,
        { text, mediaUrl },
        { headers: { Authorization: token } }
      );

      //   console.log("response create quote", response);
      return response.data;
    } catch (error) {
      console.error("Quote creation failed", error);
      throw error;
    }
  },

  getQuotes: async (token: string, limit = 20, offset = 0) => {
    try {
      const response = await axios.get(`${BASE_URL}/getQuotes`, {
        params: { limit, offset },
        headers: { Authorization: token },
      });
      return response.data;
    } catch (error) {
      console.error("Fetching quotes failed", error);
      throw error;
    }
  },
};
