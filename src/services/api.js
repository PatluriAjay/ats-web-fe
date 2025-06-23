// Example API service
export const login = async (username, password) => {
  // TODO: Implement real API call
  if (username === "admin" && password === "admin") {
    return { token: "fake-jwt-token" };
  }
  throw new Error("Invalid credentials");
}; 