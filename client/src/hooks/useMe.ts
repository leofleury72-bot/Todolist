import { useEffect, useState } from "react";
import ApiFetch, { ApiFetchError } from "./ApiFetch";

export type User = {
  id: number;
  email: string;
};

const useMe = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      setError(null);
      try {
        const data = (await ApiFetch("/api/me")) as Partial<User>;

        if (typeof data.id !== "number" || typeof data.email !== "string") {
          setUser(null);
          return;
        }

        setUser({ id: data.id, email: data.email });
      } catch (requestError) {
        setUser(null);

        if (
          requestError instanceof ApiFetchError &&
          requestError.status === 401
        ) {
          return;
        }

        setError(
          requestError instanceof Error
            ? requestError.message
            : "Impossible de récupérer l'utilisateur.",
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  return { user, isLoading, error };
};

export default useMe;
