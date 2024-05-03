import { BASE_URL } from "../constants/base-url.constants";
import { CustomError } from "../errors/custom.error";
export interface LoginProps {
  userName: string;
  password: string;
}

export async function LoginCommon(dataToSend: LoginProps) {
  const response: Response = await fetch(`${BASE_URL}customer/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataToSend),
  });
  if (!response.ok) {
    const error = await response.json();
    console.log("This is Error in Login Common: ", error);
    throw new CustomError(error);
  }
  return await response.json();
}
