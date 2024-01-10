const BASE_URL = "https://localhost:5001/";

const authenticationService = {
  accessToken: "",
  login: async (email: string, password: string): Promise<void> => {
    const loginObj = {
      email,
      password,
    };

    try {
      // Using bearer token, but can change to cookies with query `login?useCookies=true`
      const response = await fetch(`${BASE_URL}login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginObj),
      });

      console.log("Full Response:", response);

      if (response.ok) {
        const loggedIn = await response.json();
        authenticationService.accessToken = loggedIn.accessToken;
      } else {
        console.error("Failed to login:", response.statusText);
      }
    } catch (error) {
      console.error("Error trying to login:", error);
    }
  },

  addAuthorizationHeader: (options: RequestInit): HeadersInit => {
    return {
      ...(options.headers as Record<string, string>),
      Authorization: `Bearer ${authenticationService.accessToken}`,
    };
  },
};

export default authenticationService;
