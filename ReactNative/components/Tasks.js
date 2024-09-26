// components/Tasks.js
import React, { useEffect, useState } from 'react';
import { View, Text, Button, TextInput, FlatList, StyleSheet } from 'react-native';
import { auth, db } from '../firebaseConfig';
import { signOut } from 'firebase/auth';
import { collection, addDoc, query, where, onSnapshot, deleteDoc, doc } from 'firebase/firestore';

const Tasks = ({ navigation }) => {
    const [tasks, setTasks] = useState([]);
    const [task, setTask] = useState('');

    useEffect(() => {
        const user = auth.currentUser;

        if (user) {
            const q = query(collection(db, "tasks"), where("userId", "==", user.uid));
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                const tasksArray = [];
                querySnapshot.forEach((doc) => {
                    tasksArray.push({ id: doc.id, ...doc.data() });
                });
                setTasks(tasksArray);
            });

            return () => unsubscribe();
        }
    }, []);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigation.navigate('Login');
        } catch (error) {
            console.error(error);
        }
    };

    const addTask = async () => {
        if (task) {
            try {
                const user = auth.currentUser;
                await addDoc(collection(db, "tasks"), {
                    text: task,
                    userId: user.uid,
                });
                setTask('');
            } catch (error) {
                console.error("Error adding task: ", error);
            }
        }
    };

    const removeTask = async (id) => {
        try {
            await deleteDoc(doc(db, "tasks", id));
        } catch (error) {
            console.error("Error removing task: ", error);
        }
    };

    return (
        <View style={styles.container}>
            <Button title="Logout" onPress={handleLogout} color="#FF6347" />
            <TextInput
                style={styles.input}
                placeholder="Nova Tarefa"
                value={task}
                onChangeText={setTask}
            />
            <Button title="Adicionar Tarefa" onPress={addTask} color="#4682B4" />
            <FlatList
                data={tasks}
                renderItem={({ item }) => (
                    <View style={styles.taskContainer}>
                        <Text style={styles.taskText}>{item.text}</Text>
                        <Button title="Remover" onPress={() => removeTask(item.id)} color="#DC143C" />
                    </View>
                )}
                keyExtractor={item => item.id}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
    },
    taskContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 5,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 2,
    },
    taskText: {
        fontSize: 16,
    },
});

export default Tasks;
