import * as React from 'react'
import { TextInput, SafeAreaView, StyleSheet, Pressable, Text, View, Button, Alert} from "react-native";
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { postNewUser } from '../api';





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
        console.log(data, "data")
        const newUser = {username: data.username, name: data.firstName + " " + data.lastName, email: data.emailAddress, password: data.password};
        console.log(newUser);
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
          console.log(error)
          Alert.alert('Registration Failed!', `${error}`)
        })
      };

     
   

return (
        <View style={styles.container}>
          <Text style={styles.heading}>Create An Account</Text>
          <Text>Enter your email address:</Text>
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
          {errors.emailAddress?.type === 'pattern' && <Text style={styles.errorText}>Invalid Email Address.</Text>}
          {errors.emailAddress?.type === 'required' && <Text style={styles.errorText}>Email Address is required.</Text>}

          <Text>Create a password:</Text>
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
          {errors.password?.type === 'required' && <Text style={styles.errorText}>Password is required. </Text>}
          {errors.password?.type === 'minLength' && <Text style={styles.errorText}>Password must be 5 or more characters. </Text>}
          {errors.password?.type === 'maxLength' && <Text style={styles.errorText}>Password must be no more than 20 characters. </Text>}
          {errors.password?.type === 'pattern' && <Text style={styles.errorText}>Password must contain only letters, digits or. </Text>}
          <Text>Enter a username:</Text>
          <Controller
            control={control}
            rules={{
             maxLength: 20,
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
          {errors.username?.type === 'required' && <Text style={styles.errorText}>This is required.</Text>}
          {errors.username?.type === 'maxLength' && <Text style={styles.errorText}>No more than 20 characters.</Text>}
          <Text>Enter your first name:</Text>
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
          <Text>Enter your last name:</Text>
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
      );
}

const styles = StyleSheet.create({
  container: {
      flex: 1, 
      backgroundColor: "#CCFFCC", 
      alignItems: "center", 
      justifyContent: "center", 
  },
  button: {
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 4,
      elevation: 3,
      backgroundColor: "#006400",
      width: "50%", 
      margin: 12,
  },
  text: {
      fontSize: 16,
      lineHeight: 21,
      fontWeight: "bold",
      letterSpacing: 0.25,
      color: "white",
  },
  image: {
      width: '80%', 
      resizeMode: 'contain',
  },
  buttonText : {
    color: "white",
},
heading: {
  fontSize: 25,
  fontWeight: "bold",
  color: "#006400",
  margin: 12,
},
textInput: {
backgroundColor: "white",
height: 25,
width: 200,
borderWidth: 2,
borderRadius: 5,
borderStyle: "solid",
borderColor: "#006400",
},
buttonText : {
  color: "white",
},
errorText: {
  color: "red"
}
});