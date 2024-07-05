import * as React from 'react'
import { TextInput, SafeAreaView, StyleSheet, Pressable, Text, View, Button} from "react-native";
import { useState, useContext } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { UserContext } from '../contexts/Contexts';
import { getUserByUsername } from '../api';


export default function Login({ navigation }) {
    const {user, setUser} = useContext(UserContext)
    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
          username: '',
          password: '',
        }
      });
      const onSubmit = (data) => {
        const loggedInUser = data.username
        getUserByUsername(loggedInUser)
        .then((result) => {
            console.log(result)
        })
        .catch((error) => {
          console.log(error, "ERROR in REGISTER")
        }) //up to here by thursday PM, line 17-25
      }
    
      return (
        <View style={styles.container}>
           <Text style={styles.heading}>Log In To Your Account</Text>
          <Text>Username</Text>
          <Controller
            control={control}
            rules={{
             required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="Username..."
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                style={styles.textInput}
              />
            )}
            name="username"
          />
          {errors.username && <Text>This is required.</Text>}

          <Text>Password</Text>
          <Controller
            control={control}
            rules={{
             maxLength: 100,
             required: true
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                secureTextEntry={true}
                placeholder="Password..."
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                style={styles.textInput}
              />
            )}
            name="password"
          />
          {errors.password && <Text>This is required.</Text>}

        <Pressable style={styles.button} title="Log In" onPress={handleSubmit(onSubmit)}>
          <Text style={styles.buttonText}> Log In</Text>
        </Pressable>
        </View>
      );
}

const styles = StyleSheet.create({
  container: {
      flex: 1, // makes sure the colour takes up the whole screen
      backgroundColor: "#CCFFCC", // Kate colour change
      alignItems: "center", // horizontal alex
      justifyContent: "center", // vertical alex
  },
  button: {
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 4,
      elevation: 3,
      backgroundColor: "#006400",
      width: "50%", // percentages need to be in in quotes alex
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
});