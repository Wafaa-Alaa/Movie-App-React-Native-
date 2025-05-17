import React, { useState } from 'react';
import { Pressable, StyleSheet, View, Text, TextInput, ScrollView } from 'react-native';
import Checkbox from 'expo-checkbox';

const TODO = () => {
    const [tasks, setTasks] = useState([]);
    const [input, setInput] = useState('');
    const [doneCount, setDoneCount] = useState(0);

    const handleInput = (text) => {
        setInput(text);
    };

    const pushHandler = () => {
        if (input.trim()) {
            setTasks([...tasks, { 
                text: input, 
                completed: false,
                deleted: false 
            }]);
            setInput('');
        }
    };

    const handleDone = (index) => {
        const updatedTasks = [...tasks];
        updatedTasks[index].completed = !updatedTasks[index].completed;
        setTasks(updatedTasks);
        setDoneCount(updatedTasks.filter(task => task.completed).length);
    };

    const handleDelete = (index) => {
        const updatedTasks = [...tasks];
        if (updatedTasks[index].completed) {
            setDoneCount(prev => prev - 1);
        }
        updatedTasks.splice(index, 1);
        setTasks(updatedTasks);
    };

    return (
        <View style={styles.container}>
            <Pressable style={styles.header}>
                <Text style={styles.headerText}>My ToDo List</Text>
            </Pressable>
            
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.textinput}
                    value={input}
                    onChangeText={handleInput}
                    placeholder="Enter a task"
                />
                <Pressable style={styles.btn} onPress={pushHandler}>
                    <Text style={styles.btnText}>ADD</Text>
                </Pressable>
            </View>

            <View style={styles.statsContainer}>
                <Text style={styles.stats}>
                    {doneCount} done of {tasks.length} tasks
                </Text>
            </View>

            <ScrollView style={styles.scrollContainer}>
                <View style={styles.tasksContainer}>
                    {tasks.map((task, index) => (
                        <View key={index} style={styles.taskItem}>
                            <Text 
                                style={[
                                    styles.taskText,
                                    task.completed && styles.completedTask
                                ]}
                                numberOfLines={1}
                                ellipsizeMode="tail"
                            >
                                {task.text}
                            </Text>
                            <View style={styles.controls}>
                                <View style={styles.actionContainer}>
                                    <Checkbox 
                                        value={task.completed}
                                        onValueChange={() => handleDone(index)}
                                        color={'#FF1493'}
                                        style={styles.checkbox}
                                    />
                                    <Text style={styles.actionLabel}>Done</Text>
                                </View>
                                <View style={styles.actionContainer}>
                                    <Checkbox 
                                        value={false}
                                        onValueChange={() => handleDelete(index)}
                                        color={'#FF1493'}
                                        style={styles.checkbox}
                                    />
                                    <Text style={styles.actionLabel}>Delete</Text>
                                </View>
                            </View>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    header: {
        backgroundColor: '#FF1493',
        padding: 20,
        borderRadius: 10,
        marginBottom: 20,
        marginTop: 40,
        alignItems: 'center',
    },
    headerText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
    inputContainer: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    textinput: {
        flex: 1,
        borderBottomColor: '#FF1493',
        borderBottomWidth: 1,
        padding: 10,
        marginRight: 10,
    },
    btn: {
        backgroundColor: '#FF1493',
        padding: 15,
        borderRadius: 5,
        justifyContent: 'center',
    },
    btnText: {
        color: 'white',
        fontWeight: 'bold',
    },
    statsContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    stats: {
        color: '#FF1493',
        fontSize: 16,
    },
    scrollContainer: {
        flex: 1,
    },
    tasksContainer: {
        marginTop: 10,
    },
    taskItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 20,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 2,
    },
    taskText: {
        flex: 1,
        marginRight: 10,
    },
    completedTask: {
        textDecorationLine: 'line-through',
        color: '#999',
    },
    controls: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    actionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 15,
    },
    checkbox: {
        borderColor: '#FF1493',
        borderRadius: 4,
    },
    actionLabel: {
        marginLeft: 5,
        color: 'black',
    },
});

export default TODO;