import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {
  LoginManager,
  GraphRequest,
  GraphRequestManager,
  AccessToken,
} from 'react-native-fbsdk';

export default props => {
  const loginExecute = () => {
    LoginManager.logInWithPermissions(['public_profile']).then(
      function(result) {
        if (result.isCancelled) {
          console.log('Login was cancelled');
        } else {
          console.log(
            'Login was successful with permissions: ' +
              result.grantedPermissions.toString(),
          );
          console.log(result);

          const infoRequest = new GraphRequest(
            '/me?fields=id,name,picture{url},email',
            null,
            (error, result) => {
              console.log(result);
            },
          );
          // Start the graph request.
          new GraphRequestManager().addRequest(infoRequest).start();
          AccessToken.getCurrentAccessToken().then(accessToken =>
            console.log(accessToken),
          );
        }
      },
      function(error) {
        console.log('Login failed with error: ' + error);
      },
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.view}>
        <Text>Running</Text>
      </View>
      <View style={styles.view}>
        <TouchableOpacity onPress={loginExecute} style={styles.button}>
          <Text style={styles.buttonText}>Logar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: '100%',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  view: {
    flex: 1,
  },
  button: {
    backgroundColor: '#995030',
    padding: 10,
  },
  buttonText: {
    color: '#FFFFFF',
  },
});
