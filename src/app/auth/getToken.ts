import { jwtDecode } from 'jwt-decode';

export function decodeToken(token: string) {
  if (!token) {
    return;
  }
  const decoded: any = jwtDecode(token);
  return decoded.id;
}
