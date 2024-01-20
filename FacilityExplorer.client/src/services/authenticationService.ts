const BASE_URL = "https://facilityexplorer.azurewebsites.net/"; //"https://localhost:5001/"

interface UserData {
  tokenType: string;
  accessToken: string;
  expiresIn: number;
  refreshToken: string;
}

const authenticationService = {
  accessToken: "",
  login: async (email: string, password: string): Promise<UserData | null> => {
    const loginObj = {
      email,
      password,
    };

    try {
      const response = await fetch(`${BASE_URL}login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginObj),
      });

      if (response.ok) {
        const loggedIn = await response.json();
        authenticationService.accessToken = loggedIn.accessToken;
        return {
          tokenType: loggedIn.tokenType,
          accessToken: loggedIn.accessToken,
          expiresIn: loggedIn.expiresIn,
          refreshToken: loggedIn.refreshToken,
        };
      } else {
        console.error("Not a valid email and/or password.");
        return null;
      }
    } catch (error) {
      console.error("Error trying to login:", error);
      return null;
    }
  },

  getRoles: async (email: string): Promise<string[]> => {
    try {
      const response = await fetch(`${BASE_URL}api/roles/${email}`, {
        method: "GET",
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching roles");
      return [];
    }
  },

  addAuthorizationHeader: (options: RequestInit): HeadersInit => {
    return {
      ...(options.headers as Record<string, string>),
      "Content-Type": "application/json",
      Authorization: `Bearer ${authenticationService.accessToken}`,
    };
  },
};

export default authenticationService;
