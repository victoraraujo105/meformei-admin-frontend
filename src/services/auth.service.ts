import API from "@/config/API";
import { UserAdmin } from "./../contexts/AuthContext";

interface signIn {
  username: string;
  password: string;
}
export const AuthService = {
  async signIn({ username, password }: signIn) {
    return await API.post(`auth/signin`, {
      username: username,
      password: password,
    });
  },
  async getSession({
    token,
  }: {
    token: string | null;
  }): Promise<{ session: { session: boolean } }> {
    if (token) {
      const { data } = await API.get("auth/session");
      return { session: data };
    }
    const { data } = await API.get("auth/session");
    return { session: data };
  },

  async me(): Promise<UserAdmin> {
    return API.get("auth/me"); // implementar no backend
  },
};
