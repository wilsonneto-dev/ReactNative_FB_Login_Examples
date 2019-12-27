import React from 'react';
import {View} from 'react-native';
import {
  LoginButton,
  GraphRequest,
  GraphRequestManager,
  AccessToken,
} from 'react-native-fbsdk';

export default () => {
  const alert = str => console.log(str);

  return (
    <View>
      <LoginButton
        publishPermissions={['email']}
        onLoginFinished={(error, result) => {
          if (error) {
            alert('Login failed with error: ' + error.message);
            console.log(result);
          } else if (result.isCancelled) {
            alert('Login was cancelled');
            console.log(result);
          } else {
            alert(
              'Login was successful with permissions: ' +
                result.grantedPermissions,
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
        }}
        onLogoutFinished={() => alert('User logged out')}
      />
    </View>
  );
};
