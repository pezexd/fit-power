// store.js
import { User } from "@supabase/supabase-js";
import { reactive } from "vue";

interface ExtendedUser extends Partial<User> {
  id: string;
  user_metadata: {
    name: string;
    date_of_birth: string;
    weight: string;
  };
}

export const userState = reactive<ExtendedUser>({
  id: "",
  user_metadata: {
    name: "",
    date_of_birth: "",
    weight: "",
  },
});
