import { StyleSheet, Text, View, Button, TextInput, Alert } from 'react-native';
import { useState } from 'react';
const num = Math.floor(Math.random() * 10);
export default function App() {
    
    const [count, setCount] = useState(0);
    const [number, setNumber] = useState('');
    const [attempts, setAttempts] = useState(5);
    const [feedback, setFeedback] = useState('');


    const handleGuess = () => {
        if (attempts <= 1) {
            Alert.alert('Game Over', `Dommage, vous avez perdu ! Le nombre était ${num}`);
            return;
        }
        const userGuess = parseInt(number);

        if (userGuess === num) {
            Alert.alert('Bravo, Vous avez deviné le bon nombre');
            setAttempts(0);
            setFeedback('');
        } else {
            const newAttempts = attempts - 1;
            setAttempts(newAttempts);
            if (Math.abs(userGuess - num) <= 5) {
                setFeedback('Chaud');
            } else if (Math.abs(userGuess - num) <= 10) {
                setFeedback('Tiède');
            } else {
                setFeedback('Froid');
            }

            if (newAttempts === 0) {
                Alert.alert(`Dommage vous avez perdu, Le nombre était ${num}`);
            }
        }
    };


    const incrementCount = () => { setCount(count + 1); };

    const decrementCount = () => { setCount(count - 1); };

    return (
        <View style={styles.container}>

            <Button onPress={incrementCount} title="Ajouter points" color="#841584" />
            <Button onPress={decrementCount} title="Retirer points" color="#841584" />
            <Text style={styles.paragraph}>{count}</Text>

            <Text>{num}</Text>

            


            <TextInput
                style={styles.input}
                value={number}
                onChangeText={setNumber}
                keyboardType="numeric"
                placeholder="Entrez votre nombre"
            />


            <Text style={styles.feedback}>{feedback}</Text>


            <Button onPress={handleGuess} title="Valider ma réponse" color="#841584" />
            <Text>Essais restants : {attempts}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paragraph: {
        width: 60,
        height: 50,
        color: "green",
        fontWeight: "bold",
        fontSize: 17,
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        width: 200,
    },
    feedback: {
        fontSize: 20,
        color: 'red',
        marginTop: 10,
    },
});