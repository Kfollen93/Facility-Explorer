const BASE_URL = "https://localhost:5001/";

const authenticationService = {
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
        const contentType = response.headers.get("content-type");

        if (contentType && contentType.includes("application/json")) {
          const loggedIn = await response.json();
          console.log("Successfully Logged In:", loggedIn);
        } else {
          console.error("Failed to login: Response does not contain JSON data");
        }
      } else {
        console.error("Failed to login:", response.statusText);
      }
    } catch (error) {
      console.error("Error trying to login:", error);
    }
  },
};

export default authenticationService;
