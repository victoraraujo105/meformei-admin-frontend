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
    return API.get("auth/me"); 
  },

  async resetPassword(data: {token: string | null, password: string, passwordConfirmation: string}) {
    const { token, password, passwordConfirmation} = data
    if(!token) return Promise.reject()
    return API.post(`auth/reset-password/${token}`, { password, passwordConfirmation }); 
  },

  async changePassword(data: { userId: string, password: string, passwordConfirmation: string}) {
    const { userId, password, passwordConfirmation} = data
    return API.post(`auth/${userId}/change-password`, { password, passwordConfirmation }); 
  },

  async sendRecoverPassword(data: {email: string}){
    return API.post(`auth/send-recover-email`, { email: data.email }); 
  }
};
