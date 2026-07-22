const ApiFetch = async (endpoint: string, options: RequestInit = {}) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}${endpoint}`, {
      credentials: "include",
      ...options,
    });

    if (!response.ok) {
      const errorBody = (await response.json().catch(() => null)) as {
        message?: string;
      } | null;
      throw new Error(errorBody?.message ?? `Erreur HTTP ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export default ApiFetch;
