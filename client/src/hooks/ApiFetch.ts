const ApiFetch = async (endpoint: string, options: RequestInit = {}) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}${endpoint}`,
      options,
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export default ApiFetch;
