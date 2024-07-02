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
        <Button title="Temp Login" onPress={navigation.navigate("ProfileScreen")} />
        </View>
      );
}