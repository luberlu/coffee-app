import { useMemo, useEffect } from "react";
import { Text, View, Alert, Pressable, StyleSheet } from "react-native";
import { useAuthRequest, ResponseType } from "expo-auth-session";
import { useAuth } from "../contexts/AuthContext";
import { login } from "../utils/authUtils";
import * as Linking from "expo-linking";

const clientId = `${process.env.EXPO_PUBLIC_COGNITO_CLIENT_ID}`;
const userPoolUrl = `https://${process.env.EXPO_PUBLIC_COGNITO_USER_POOL_DOMAIN}`;
/** needs to be setup in aws cognito */
const redirectUri = Linking.createURL("/welcome");

export default function SignIn() {
  const { setAuthTokens } = useAuth();
  const discoveryDocument = useMemo(
    () => ({
      authorizationEndpoint: userPoolUrl + "/oauth2/authorize",
      tokenEndpoint: userPoolUrl + "/oauth2/token",
      revocationEndpoint: userPoolUrl + "/oauth2/revoke",
    }),
    []
  );

  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId,
      responseType: ResponseType.Code,
      redirectUri,
      usePKCE: true,
    },
    discoveryDocument
  );

  useEffect(() => {
    if (response) {
      if (response.type === "error") {
        Alert.alert(
          "Erreur d'authentification",
          response.params.error_description || "Une erreur est survenue"
        );
        return;
      }
      if (response.type === "success") {
        login(
          {
            clientId,
            code: response.params.code,
            redirectUri,
            extraParams: {
              code_verifier: request!.codeVerifier,
            },
          },
          discoveryDocument,
          setAuthTokens
        );
      }
    }
  }, [discoveryDocument, request, response]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign in</Text>
      <Pressable onPress={() => promptAsync()}>
        <Text style={styles.button}>Connect with AWS</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    gap: 40,
  },
  button: {
    backgroundColor: "white",
    color: "black",
    padding: 15,
    paddingLeft: 25,
    paddingRight: 25,
    borderRadius: 5,
    fontSize: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});
