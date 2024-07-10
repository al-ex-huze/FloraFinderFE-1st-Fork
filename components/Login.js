import * as React from "react";
import {
    TextInput,
    StyleSheet,
    Pressable,
    Text,
    View,
    ImageBackground,
    Alert,
    Image,
    ScrollView,
    Platform, //added YUSHA
    Dimensions, //added YUSHA
} from "react-native";
import { useContext } from "react";
import { useForm, Controller } from "react-hook-form";
import { UserContext } from "../contexts/Contexts";
import { postLogin } from "../api/apiFunctions";
const backgroundLeaf = require("../assets/backgroundtest.jpg");
const logo = require("../assets/FloraFinderLogo.png");

const { height } = Dimensions.get('window');  // getting screen height YUSHA

export default function Login() {
    const { user, setUser } = useContext(UserContext);
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            username: "",
            password: "",
        },
    });

    const onSubmit = (data) => {
        const { username, password } = data;
        console.log(username);
        console.log(password);
        handleLogin(username, password);
    };

    const handleLogin = (username, password) => {
        const credentials = { username, password };
        postLogin(credentials)
            .then((user) => {
                if (!user) {
                    throw new Error("Invalid response from server");
                }
                setUser(user);
                Alert.alert(
                    "You are logged in!",
                    `Welcome back, ${user.username}`
                );
            })
            .catch((error) => {
                console.error("Login Failed:", error);
                Alert.alert("Login Failed", "Invalid username or password.");
            });
    };

    return (
        <ScrollView
            contentContainerStyle={styles.background}
            showsVerticalScrollIndicator={false}
        >
            <ImageBackground
                source={backgroundLeaf}
                style={styles.background}
                resizeMode="cover"
            >
                <View style={styles.overlay}></View>
                <View style={styles.container}>
                    <View style={styles.logoContainer}>
                        <Image source={logo} style={styles.logo} />
                    </View>
                    <Text style={styles.heading}>Login</Text>
                    <Text style={styles.labelContainerText}>Username:</Text>
                    <Controller
                        control={control}
                        rules={{
                            required: true,
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                placeholder="Enter username here"
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                style={styles.textInput}
                            />
                        )}
                        name="username"
                    />
                    {errors.username && (
                        <Text style={styles.alertText}>This is required.</Text>
                    )}

                    <Text style={styles.labelContainerText}>Password:</Text>
                    <Controller
                        control={control}
                        rules={{
                            maxLength: 100,
                            required: true,
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                secureTextEntry={true}
                                placeholder="Enter password here"
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                style={styles.textInput}
                            />
                        )}
                        name="password"
                    />
                    {errors.password && (
                        <Text style={styles.alertText}>This is required.</Text>
                    )}

                    <Pressable
                        style={styles.button}
                        title="Login"
                        onPress={handleSubmit(onSubmit)}
                    >
                        <Text style={styles.buttonText}>Login</Text>
                    </Pressable>
                </View>
            </ImageBackground>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
    },
    logoContainer: {
        alignItems: "center", //YUSHA
        justifyContent: "center", //YUSHA
        marginBottom: Platform.OS === 'ios' ? 0 : 10, // Adjust margin for Android(right of :) after setting ios (left of :) YUSHA
        marginTop: Platform.OS === 'ios' ? height * 0.05 : height * 0.15, // Adjust top margin for ios on left and android on right again YUSHA
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        alignItems: "center",
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(255, 255, 255, 0.8)",
    },
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingTop: 20, 
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
    heading: {
        color: "#006400",
        marginBottom: 10,
        fontFamily: "Inter_900Black",
        fontSize: 25,
        textAlign: 'centre', //added YUSHA
    },
    buttonText: {
        color: "white",
    },
    labelContainerText: {
        fontWeight: "bold",
        alignSelf: "flex-start",
        marginLeft: 60,
        marginTop: 10,
        marginBottom: -4,
    },
    logo: {
        height: height * 0.3, // Adjust height based on screen size YUSHA
        resizeMode: "contain",
    },
    alertText: {
        color: "red",
    },
});
