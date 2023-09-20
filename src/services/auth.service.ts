import API from "../config/API";
import { UserAdmin } from "./../config/Auth";

export const AuthService = {
  async signIn({ username, password }: signIn) {
    return await API.post(`auth/signin`, {
      username: username,
      password: password,
    });
  },
  async getSession(): Promise<{ session: { session: boolean } }> {
    const { data } = await API.get("auth/session");
    return { session: data };
  },
  async me(): Promise<UserAdmin> {
    return API.get("auth/me").then((response) => response.data); // implementar no backend
  },
};

interface signIn {
  username: string;
  password: string;
}
