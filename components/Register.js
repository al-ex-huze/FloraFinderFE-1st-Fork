import * as React from 'react';
import { TextInput, StyleSheet, Pressable, Text, View, ImageBackground, Alert, Image, ScrollView } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { postNewUser } from '../api';

const backgroundLeaf = require('../assets/backgroundtest.jpg');
const logo = require('../assets/FloraFinderLogo.png');

export default function Register({ navigation }) {
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      emailAddress: '',
      password: '',
      username: '',
      firstName: '',
      lastName: ''
    }
  });

  const onSubmit = (data) => {
    const newUser = {
      username: data.username,
      name: data.firstName + ' ' + data.lastName,
      email: data.emailAddress,
      password: data.password
    };

    postNewUser(newUser)
      .then((user) => {
        Alert.alert('Registration complete!', 'Please login to your account.', [
          {
            text: 'Login',
            onPress: () => navigation.navigate('Login'),
            style: 'default',
          },
        ]);
      })
      .catch((error) => {
        console.log(error, 'Registration Failed');
      });
  };

  return (
    <ScrollView
      contentContainerStyle={styles.background}
      showsVerticalScrollIndicator={false}
      
    >
      <ImageBackground
        source={backgroundLeaf}
        style={styles.backgroundImage}
        resizeMode="stretch"
      >
        <View style={styles.overlay}></View>
        <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image source={logo} style={styles.logo} />
        </View>
          <Text style={styles.heading}>Register</Text>

          <Text style={styles.labelContainerText}>Enter your email address:</Text>
          <Controller
            control={control}
            rules={{
              required: true,
              pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="Email Address"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                style={styles.textInput}
              />
            )}
            name="emailAddress"
          />
          {errors.emailAddress && <Text style={styles.errorText}>Invalid Email Address.</Text>}

          <Text style={styles.labelContainerText}>Create a password:</Text>
          <Controller
            control={control}
            rules={{
              maxLength: 20,
              minLength: 5,
              required: true,
              pattern: /\w/
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                secureTextEntry={true}
                placeholder="Password"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                style={styles.textInput}
              />
            )}
            name="password"
          />
          {errors.password && <Text style={styles.errorText}>Password must be 5-20 characters long and only contain numbers, letters and underscores. </Text>}

          <Text style={styles.labelContainerText}>Enter a username:</Text>
          <Controller
            control={control}
            rules={{
              maxLength: 100,
              required: true
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="Username"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                style={styles.textInput}
              />
            )}
            name="username"
          />
          {errors.username && <Text style={styles.errorText}>This is required.</Text>}

          <Text style={styles.labelContainerText}>Enter your first name:</Text>
          <Controller
            control={control}
            rules={{
              maxLength: 100,
              required: true
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="First Name"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                style={styles.textInput}
              />
            )}
            name="firstName"
          />
          {errors.firstName && <Text style={styles.errorText}>This is required.</Text>}

          <Text style={styles.labelContainerText}>Enter your last name:</Text>
          <Controller
            control={control}
            rules={{
              maxLength: 100,
              required: true
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="Last Name"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                style={styles.textInput}
              />
            )}
            name="lastName"
          />
          {errors.lastName && <Text style={styles.errorText}>This is required.</Text>}

          <Pressable style={styles.button} title="Submit" onPress={handleSubmit(onSubmit)}>
            <Text style={styles.buttonText}>Create An Account</Text>
          </Pressable>
        </View>
      </ImageBackground>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  logo: {
    height: 250,
    resizeMode: 'contain',
  },
  background: {
    flexGrow: 1,
  },
  backgroundImage: {
    flexGrow: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  
    overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
  },

  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#006400',
    width: '50%', // percentages need to be in quotes
    margin: 12,
  },
  heading: {
    color: "#006400",
    marginBottom: 10,
    fontFamily: 'Inter_900Black', 
    fontSize: 25,
    paddingTop: 150,
},
  textInput: {
    backgroundColor: "white",
    height: 40,
    width: 250,
    borderWidth: 2,
    borderRadius: 5,
    borderStyle: "solid",
    borderColor: "#006400",
    marginVertical: 10,
    paddingHorizontal: 10,
},
  buttonText: {
    color: 'white',
  },
  errorText: {
    color: 'red',
  },
  labelContainerText: {
    // backgroundColor: "white",
    // borderWidth: 2,
    // borderRadius: 5,
    // borderStyle: "solid",
    // borderColor: "#006400",
    // padding: 5,
    fontWeight: "bold",
    alignSelf: 'flex-start',
    marginTop: 10,
    marginBottom: -4,
},
});
