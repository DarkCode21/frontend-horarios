export function decodeToken() {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const payloadBase64 = token.split(".")[1];
        const payloadJson = atob(payloadBase64);
        const payload = JSON.parse(payloadJson);

        return payload;
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }
  return null;
}

export function getUserData() {
  const payload = decodeToken();
  if (payload && payload["0"]) {
    return payload["0"];
  }
  return null;
}

export function getUserRole(): number | null {
  const user = getUserData();
  if (user?.rol_usuario?.id) {
    return user.rol_usuario.id;
  }
  return null;
}
