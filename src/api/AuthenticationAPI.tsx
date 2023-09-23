import API from '../config/API.jsx';
import { LoginRequestBody, LoginResponse } from '../schemas/api/authentication.schemas.js';


export async function signin(body: LoginRequestBody): Promise<LoginResponse> {
  try {
    const response = await API.post<LoginResponse>('/auth/signin', body);
    return response.data;
  } catch (error) {
    // console.log(error);
    throw new Error('Usuário ou senha inválidos');
  }
}