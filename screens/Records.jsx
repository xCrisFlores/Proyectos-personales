import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity } from 'react-native';
import { getRecordsHour } from "../backend/getRecords";

export const Records = () => {
    const [id, setId] = useState('');
    const [records, setRecords] = useState([]);

    const fetchRecords = async () => {
        try {
            // Llama a la función para obtener los registros con el ID especificado
            const data = await getRecordsHour(id);
            setRecords(data);
        } catch (error) {
            console.error("Error al obtener los registros:", error);
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="ID"
                value={id}
                onChangeText={setId}
                keyboardType="numeric"
            />
            <Button title="Obtener Registros" onPress={fetchRecords} />
            <Text>Registros:</Text>
            {records.map((record, index) => (
                <View key={index} style={styles.record}>
                    <Text>ID: {record.id}</Text>
                    <Text>Tiempos: {record.tiempos}</Text>
                    <Text>Litros: {record.litros}</Text>
                    <Text>Consumo: {record.consumo}</Text>
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        width: 200,
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    record: {
        marginVertical: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
});

export default Records;
