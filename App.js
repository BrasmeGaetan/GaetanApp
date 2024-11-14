import { StyleSheet, Text, View, Button, TextInput, Alert } from 'react-native';
import { useState } from 'react';

export default function App() {
  const [count, setCount] = useState(0);
  const [num, setNum] = useState(0);
  const [number, setNumber] = useState('');
  const [attempts, setAttempts] = useState(5); 
  const [feedback, setFeedback] = useState(''); 


  const randomNumberInRange = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

 
  const handleGenerateNumber = () => {
    const generatedNum = randomNumberInRange(1, 50);
    setNum(generatedNum); 
    setNumber(''); 
    setAttempts(5); 
    setFeedback(''); 
  };

  // Vérifier la réponse de l'utilisateur
  const handleGuess = () => {
    if (attempts <= 1) {
      Alert.alert('Game Over', `Dommage, vous avez perdu ! Le nombre était ${num}`);
      return; // Fin du jeu si plus d'essais
    }

    const userGuess = parseInt(number);

    if (userGuess === num) {
      Alert.alert('Bravo, Vous avez deviné le bon nombre');
      setAttempts(0); // Fin du jeu après une bonne réponse
      setFeedback(''); // Réinitialise le feedback
    } else {
      const newAttempts = attempts - 1;
      setAttempts(newAttempts);

      // Donner un feedback chaud/froid
      if (Math.abs(userGuess - num) <= 5) {
        setFeedback('Chaud!');
      } else if (Math.abs(userGuess - num) <= 10) {
        setFeedback('Tiède...');
      } else {
        setFeedback('Froid...');
      }

      // Si le nombre d'essais reste à 0
      if (newAttempts === 0) {
        Alert.alert(`Dommage vous avez perdu, Le nombre était ${num}`);
      }
    }
  };

  
  const incrementCount = () => {
    setCount(count + 1);
  };

  const decrementCount = () => {
    setCount(count - 1);
  };

  return (
    <View style={styles.container}>
      
      <Button onPress={incrementCount} title="Ajouter points" color="#841584" />
      <Button onPress={decrementCount} title="Retirer points" color="#841584" />
      <Text style={styles.paragraph}>{count}</Text>

      {/* Section pour générer un nombre aléatoire */}
      <Button onPress={handleGenerateNumber} title="Générer un nombre aléatoire" color="#841584" />
      <Text style={styles.paragraph}>{num}</Text>

      {/* Section pour l'input de l'utilisateur */}
      <TextInput
        style={styles.input}
        value={number}
        onChangeText={setNumber} 
        keyboardType="numeric"
        placeholder="Entrez votre nombre"
      />
      
      {/* Affichage du feedback (chaud, tiède, froid) */}
      <Text style={styles.feedback}>{feedback}</Text>

      {/* Bouton de validation de la réponse */}
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
    width: 200, // Ajouter une largeur pour le champ de texte
  },
  feedback: {
    fontSize: 20,
    color: 'red',
    marginTop: 10,
  },
});