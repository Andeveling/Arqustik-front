import axios from "axios";
import { Session } from "next-auth";

export const getJWT = async () => {
  try {
    const response = await axios.get<Session>("/api/auth/session");
    const jwt = response.data.user.jwt;
    return jwt;
  } catch (error) {
    return error;
  }
};
