import { supabase } from "../supabase";
import { userState } from "../store";

interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  date_of_birth: string;
  weight: number;
}

interface LoginPayload {
  email: string;
  password: string;
}

const login = async (payload: LoginPayload) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: payload.email,
    password: payload.password,
  });

  if (error) throw error;

  if (data.user) {
    userState.id = data.user.id;
    userState.user_metadata = data.user.user_metadata as any;
  }

  return userState;
};

const register = async (payload: RegisterPayload) => {
  const { data, error } = await supabase.auth.signUp({
    email: payload.email,
    password: payload.password,
    options: {
      data: {
        name: payload.name,
        date_of_birth: payload.date_of_birth,
        weight: payload.weight,
      },
    },
  });

  if (error) throw error;

  if (data.user) {
    userState.id = data.user.id;
    userState.user_metadata = data.user.user_metadata as any;
  }

  return userState;
};

export default {
  register,
  login,
};
