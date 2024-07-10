import React, { useEffect, useState, useContext } from "react";
import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
    Image,
    TouchableOpacity,
    Alert,
    Pressable,
    ActivityIndicator,
    ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getUserByUsername, deleteUser } from "../api/apiFunctions";
import { UserContext } from "../contexts/Contexts";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faUserXmark, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
const backgroundLeaf = require("../assets/backgroundtest.jpg");

export default function ProfilePage() {
    const { user, setUser } = useContext(UserContext);
    const { err, setErr } = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(true);
    const navigation = useNavigation();

    useEffect(() => {
        getUserByUsername(user.username)
            .then((fetchedUser) => {
                setUser(fetchedUser);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching profile", error);
                Alert.alert(
                    err.status,
                    err.msg,
                    "Failed to load profile. Please try again."
                );
                setIsLoading(false);
            });
    }, [user.username]);
    const handleDeleteUser = () => {
        Alert.alert(
            "Delete Account",
            `Are you sure you want to delete your account, ${user.username}?`,
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                {
                    text: "OK",
                    onPress: () => {
                        deleteUser(user.username)
                            .then(() => {
                                setUser({});
                                //   navigation.navigate("LoginRegister");
                            })
                            .catch((error) => {
                                console.error("Error deleting user:", error);
                                Alert.alert(
                                    err.status,
                                    err.msg,
                                    "Failed to delete user. Please try again."
                                );
                            });
                    },
                },
            ]
        );
    };
    const handleLogout = () => {
        setUser({});
        // navigation.navigate("LoginRegister");
    };

    if (isLoading) {
        return (
            <ImageBackground
                source={backgroundLeaf}
                style={styles.imageBackground}
                resizeMode="cover"
            >
                <View style={styles.overlay} />
                <View style={styles.activity_indicator_background}>
                    <ActivityIndicator size="large" color="#006400" />
                    <Text>Loading...</Text>
                </View>
            </ImageBackground>
        );
    }

    return (
        <ImageBackground
            source={backgroundLeaf}
            style={styles.imageBackground}
            resizeMode="cover"
        >
            <ScrollView contentContainerStyle={styles.scrollViewContainer}>
                <Text style={styles.heading}>My Profile</Text>
                {user ? (
                    <View style={styles.profileCard}>
                        {user.avatar ? (
                            <View style={styles.avatarContainer}>
                                <Image
                                    source={{ uri: user.avatar }}
                                    style={styles.avatar}
                                />
                                <Text style={styles.avatarLabel}>Avatar</Text>
                            </View>
                        ) : (
                            <Text>No avatar available!</Text>
                        )}
                        <View style={styles.userInfo}>
                            <Text style={styles.label}>Username:</Text>
                            <Text style={styles.value}>{user.username}</Text>
                            <Text style={styles.label}>Email:</Text>
                            <Text style={styles.value}>{user.email}</Text>
                            <Text style={styles.label}>Name:</Text>
                            <Text style={styles.value}>{user.name}</Text>
                            <Text style={styles.label}>Total Score:</Text>
                            <Text style={styles.value}>{user.total_score}</Text>
                        </View>
                        <Pressable
                            style={styles.logoutButton}
                            onPress={handleLogout}
                        >
                            <Text style={styles.logoutButtonText}>Logout</Text>
                            <FontAwesomeIcon
                                icon={faSignOutAlt}
                                color={"white"}
                                size={25}
                            />
                        </Pressable>
                        <Pressable
                            style={styles.deleteButton}
                            onPress={handleDeleteUser}
                        >
                            <Text style={styles.deleteButtonText}>
                                Delete Account
                            </Text>
                            <FontAwesomeIcon
                                icon={faUserXmark}
                                color={"white"}
                                size={25}
                            />
                        </Pressable>
                    </View>
                ) : (
                    <Text>Loading...</Text>
                )}
            </ScrollView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        paddingTop: 30,
    },
    scrollViewContainer: {
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 16,
        backgroundColor: "rgba(255, 255, 255, 0.8)",
    },
    // loadingContainer: {
    //     flex: 1,
    //     justifyContent: "center",
    //     alignItems: "center",
    //     backgroundColor: "#CCFFCC",
    // },
    imageBackground: {
        flex: 1,
        ...StyleSheet.absoluteFillObject,
    },
    heading: {
        justifyContent: "flex-start",
        alignItems: "center",
        paddingTop: 10,
        color: "#006400",
        marginBottom: 20,
        fontFamily: "Inter_900Black",
        fontSize: 25,
        textAlign: "center",
    },
    profileCard: {
        backgroundColor: "white",
        padding: 20,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 5,
        alignItems: "center",
        marginBottom: 20,
    },
    userInfo: {
        marginTop: 20,
        alignItems: "flex-start",
        width: "100%",
    },
    avatarContainer: {
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 2,
        borderColor: "#006400",
        borderRadius: 10,
        padding: 20,
        marginBottom: 20,
        width: 150,
        height: 300,
    },
    avatar: {
        width: "100%",
        height: "100%",
    },
    avatarLabel: {
        marginTop: 10,
        color: "#006400",
        fontSize: 16,
        textAlign: "center",
    },
    label: {
        color: "#006400",
        fontWeight: "bold",
        fontSize: 16,
        marginTop: 10,
    },
    value: {
        color: "#006400",
        fontSize: 16,
        marginBottom: 5,
    },
    logoutButton: {
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: "#006400",
        width: "80%",
        marginTop: 20,
        flexDirection: "row",
    },
    logoutButtonText: {
        color: "white",
        marginRight: 10,
        textAlign: "center",
        flex: 1,
    },
    deleteButton: {
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: "#8B0000",
        width: "80%",
        marginTop: 20,
        flexDirection: "row",
    },
    deleteButtonText: {
        color: "white",
        marginRight: 10,
        textAlign: "center",
        flex: 1,
    },
    activity_indicator_background: {
        backgroundColor: "transparent",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    imageBackground: {
        flex: 1,
        width: "100%",
        height: "100%",
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(255, 255, 255, 0.8)",
    },
});
