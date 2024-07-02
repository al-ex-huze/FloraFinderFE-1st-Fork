import * as React from 'react'
import { TextInput, SafeAreaView, StyleSheet, Pressable, Text, View, Button} from "react-native";
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';



export default function Register() {
    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
          emailAddress: '',
          password: '',
          username: '',
          firstName: '',
          lastName: ''
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
              />
            )}
            name="username"
          />
          {errors.username && <Text>This is required.</Text>}
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
              />
            )}
            name="firstName"
          />
          {errors.firstName && <Text>This is required.</Text>}
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
              />
            )}
            name="lastName"
          />
          {errors.lastName && <Text>This is required.</Text>}
    
          <Button title="Submit" onPress={handleSubmit(onSubmit)} />
        </View>
      );
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        marginBottom: 10,
        backgroundColor: '#fff',
    },
    button: {
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: "black",
        width: "50%", // percentages need to be in in quotes alex
        margin: 12,
    },
    text: {
        color: "#fff"
    }
  });