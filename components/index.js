// === imports ===
import React from 'react';
//import frontend functions
import { View, Text, StyleSheet , TouchableOpacity } from 'react-native';
//import icons
import { Ionicons } from '@expo/vector-icons';
//import anims
import * as Animatable from 'react-native-animatable';

//function task list
export default function TaskList( {data, handleDelete}) {
    //app function
    return (
        <Animatable.View
        style={styles.container}
        animation="bounceIn"
        useNativeDriver
        >
            <TouchableOpacity onPress={ () => handleDelete(data) }>
                <Ionicons
                name="md-cart-outline"
                size={30}
                color="#121212" />               
            </TouchableOpacity>
            <View>
                <Text style={styles.task}> {data.task} </Text>
            </View>
        </Animatable.View>
    )
}

// === style tab ===
const styles = StyleSheet.create({
    //container tab
    container: {
        flex: 1,
        color: '#121212',
        margin: 8,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgb(230,230,230)',
        borderRadius: 5,
        padding: 7,
        elevation: 1.5,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 1,
            height: 3,
        }
    },
    //task tab
    task: {
        color: '#121212',
        fontSize: 20,
        paddingLeft: 10,
        paddingRight: 20,
    }
});