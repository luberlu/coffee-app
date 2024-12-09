import { Alert } from "react-native";
import { router } from "expo-router";
import { exchangeCodeAsync } from "expo-auth-session";
import { AuthTokens } from '../contexts/AuthContext';

const clientId = `${process.env.EXPO_PUBLIC_COGNITO_CLIENT_ID}`;
const userPoolUrl = `https://${process.env.EXPO_PUBLIC_COGNITO_USER_POOL_DOMAIN}`;

export const login = async (
  exchangeTokenReq: any,
  discoveryDocument: any,
  setAuthTokens: (tokens: AuthTokens | null) => void
) => {
  try {
    const exchangeTokenResponse = await exchangeCodeAsync(
      exchangeTokenReq,
      discoveryDocument
    );
    setAuthTokens(exchangeTokenResponse);

    if (exchangeTokenResponse) {
      router.push("/welcome");
    }
  } catch (error) {
    console.error(error);
  }
};

export const logout = async (
  authTokens: AuthTokens | null,
  setAuthTokens: (tokens: AuthTokens | null) => void,
  callback: () => void
) => {
  try {
    if (!authTokens?.refreshToken) {
      throw new Error("Aucun token de rafraîchissement disponible");
    }

    const formData = new URLSearchParams({
      token: authTokens.refreshToken,
      client_id: clientId,
    });

    const response = await fetch(`${userPoolUrl}/oauth2/revoke`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
      },
      body: formData.toString(),
    });

    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }

    setAuthTokens(null);
    callback();
  } catch (error) {
    Alert.alert(
      "Erreur de déconnexion",
      "Un problème est survenu lors de la déconnexion"
    );
    console.error("Erreur lors de la révocation du token:", error);
  }
}; 