import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { linearReg, knn } from "../backend/ml_modules";

export const Home = () => {
  const [tiempo, setTiempo] = useState('');
  const [consumoPredicho, setConsumoPredicho] = useState(null);
  const [etiquetaPredicha, setEtiquetaPredicha] = useState(null);

  const handlePredict = async () => {
    // Verifica si el tiempo es un número válido
    if (!isNaN(tiempo) && tiempo !== '') {
      // Calcula el consumo predicho utilizando la regresión lineal
      const coeficientes = await linearReg();
      const consumoPredicho = coeficientes.m * parseFloat(tiempo) + coeficientes.b;
      setConsumoPredicho(consumoPredicho.toFixed(2)); // Redondea el consumo predicho a 2 decimales
      
      // Predice la etiqueta de consumo utilizando k-NN
      const etiquetaPredicha = await knn(3, parseFloat(tiempo));
      setEtiquetaPredicha(etiquetaPredicha);
    } else {
      setConsumoPredicho(null);
      setEtiquetaPredicha(null);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Tiempo"
        keyboardType="numeric"
        value={tiempo}
        onChangeText={setTiempo}
      />
      <TouchableOpacity
        style={styles.boton}
        onPress={handlePredict}>
          <Text style={styles.texto}>Calcular</Text>
      </TouchableOpacity>
      {consumoPredicho !== null && (
        <Text style={styles.texto}>Consumo predicho: {consumoPredicho}</Text>
      )}
      {etiquetaPredicha !== null && (
        <Text style={styles.texto}>Etiqueta predicha: {etiquetaPredicha}</Text>
      )}
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#17252b'
  },
  input: {
    width: 200,
    height: 40,
    borderColor: '#45626e',
    backgroundColor: '#b8ebff',
    borderWidth: 3,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 30,
  },
  texto:{
    fontSize: 15,
    color: 'white',
  },
  boton: {
    alignItems: 'center',
    paddingTop: 8,
    width: 150,
    height:40,
    borderColor: 'black',
    color: 'white',
    backgroundColor: '#45626e',
    borderWidth: 3,
    borderRadius: 30,
  },
});

