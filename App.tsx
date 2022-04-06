import "react-native-gesture-handler";
import "react-native-get-random-values";

import { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

import useCachedResources from "./src/hooks/useCachedResources";
import Navigation from "./src/navigation";

import { StreamChat } from "stream-chat";
import { OverlayProvider, Chat, Theme, DeepPartial } from "stream-chat-expo";
import AuthContext from "./src/contexts/AuthContext";
import { StreamColors } from "./src/constants/Colors";
import { Amplify, Auth } from "aws-amplify";
import { withAuthenticator, AmplifyTheme } from "aws-amplify-react-native";
import awsconfig from "./src/aws-exports";

Amplify.configure({ ...awsconfig, Analytics: { disabled: true } });

const API_KEY = "qu532xtsumse";
const client = StreamChat.getInstance(API_KEY);

const theme: DeepPartial<Theme> = {
  colors: StreamColors,
};

function App() {
  const isLoadingComplete = useCachedResources();


  useEffect(() => {
    return () => {
      client.disconnectUser();
    };
  }, []);

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <AuthContext client={client}>
          <OverlayProvider value={{ style: theme }}>
            <Chat client={client}>
              <Navigation colorScheme={"dark"} />
            </Chat>
          </OverlayProvider>
        </AuthContext>
        <StatusBar style="light" />
      </SafeAreaProvider>
    );
  }
}

export default withAuthenticator(App);
