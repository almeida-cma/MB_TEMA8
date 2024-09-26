// screens/Register.js
import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { auth } from '../firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const Register = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleRegister = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            navigation.navigate('Login');
        } catch (error) {
            setError("Erro ao registrar. Verifique os dados.");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Registrar</Text>
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Senha"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <Button title="Registrar" onPress={handleRegister} color="#4682B4" />
            <Text style={styles.linkText}>
                Já tem conta?{' '}
                <Text onPress={() => navigation.navigate('Login')} style={styles.link}>
                    Faça login aqui.
                </Text>
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#f5f5f5',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
        backgroundColor: '#fff',
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
        textAlign: 'center',
    },
    linkText: {
        marginTop: 10,
        textAlign: 'center',
    },
    link: {
        color: '#4682B4',
        fontWeight: 'bold',
    },
});

export default Register;
