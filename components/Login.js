import * as React from 'react'
import { TextInput, SafeAreaView, StyleSheet, Pressable, Text, View, Button} from "react-native";
import { useState, useContext } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { UserContext } from '../contexts/Contexts';


export default function Login({ navigation }) {
    const {user, setUser} = useContext(UserContext)
    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
          emailAddress: '',
          password: '',
        }
      });
      const onSubmit = data => console.log(data);
    
      return (
        <View>
          <Controller
            control={control}
            rules={{
             required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="Email Address"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="emailAddress"
          />
          {errors.emailAddress && <Text>This is required.</Text>}
    
          <Controller
            control={control}
            rules={{
             maxLength: 100,
             required: true
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                secureTextEntry={true}
                placeholder="Password"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="password"
          />
          {errors.password && <Text>This is required.</Text>}

        <Button title="Log In" onPress={handleSubmit(onSubmit)} />
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
});