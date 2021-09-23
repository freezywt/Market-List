// === imports ===
import React, { useState, useCallback, useEffect } from 'react';
//asyncstorage
import AsyncStorage from '@react-native-async-storage/async-storage';
//import taskList
import TaskList from './components/index';
//import frontend functions
import { View, Text, StyleSheet, SafeAreaView, StatusBar, TouchableOpacity, FlatList, Modal, TextInput } from 'react-native';
//import icons
import { Ionicons } from '@expo/vector-icons';
//import anims
import * as Animatable from 'react-native-animatable';


//Animated Btn :c bad?! yes is bad.Srry for trash button,ohhhhh also i love u :3.
const AnimatedBtn = Animatable.createAnimatableComponent(TouchableOpacity);

//function for tasks and button
export default function App(){
  const [task, setTask] = useState([]);
  const [open, setOpen ] = useState(false);
  const [input, setInput ] = useState('');


  //loading cache
  useEffect(() => {
    async function loadTasks(){
      const taskStorage = await AsyncStorage.getItem('@task');

      //section two

      if(taskStorage){
        setTask(JSON.parse(taskStorage))
      }
    }

  loadTasks();
}, []);

  //saving cache
  useEffect(() => {
  async function saveTasks(){
    await AsyncStorage.setItem('@task', JSON.stringify(task));
  }
  saveTasks();
  },[task]);

 

//function 4add task
  function handleAdd(){
    if(input === '') return;
    const data = {
      key: input,
      task: input
    };

    setTask([...task, data]);
    setOpen(false);
    setInput('');
  }

   //delete task function
   const handleDelete = useCallback((data) => {
     const find = task.filter(r => r.key !== data.key);
     setTask(find);
   })


   /*    App Main tab  */

   return(
    //app code ( dont permission for comment //visual code used for edit code!)
     <SafeAreaView style={styles.container}>
       <StatusBar backgroundColor="#f0f0f0" barStyle="light-content" />
         <View style={styles.content}>
          <Text style={styles.title}>My Market List</Text>
           </View>
      <FlatList 
      marginHorizontal={10}
      showsHorizontalScrollIndicator={false}
      data={task}
      keyExtractor={ (item) => String(item.key) }
      renderItem={ ({item}) => <TaskList data={item} handleDelete={handleDelete} />}
      />
      <Modal
      animationType="slide"
      transparent={false}
      visible={open}
      >
      <SafeAreaView style={styles.modal}>
        <View style={styles.modalheader}>
          <TouchableOpacity onPress={ () => setOpen(false)}>
            <Ionicons style={
          /* style for icon */   
               {
                margin: 5,
                marginRight: 5        
               }
            }
            name="md-chevron-back-outline" 
            size={35} 
            color="#121212" />
          </TouchableOpacity>
          <Text style={styles.modalTitle}>My Market List</Text>
        </View>
        <Animatable.View styles={styles.modalbody} animation='fadeInUp' useNativeDriver>
         <TextInput
         multiline={true}
         placeholderTextColor="#909090"
         autoCorrect={false}
         placeholder="What do you need buy today?"
         style={styles.input}
         value={input}
         onChangeText={ (texto) => setInput(texto)}
         />
         <TouchableOpacity style={styles.handleAdd} onPress={handleAdd}>
         <Text style={styles.handleAddText}>Register</Text>
         </TouchableOpacity>
        </Animatable.View>
      </SafeAreaView>
      </Modal>
      <AnimatedBtn 
        style={styles.fab}
        useNativeDriver
        animation="bounceInUp"
        duration={1500}
        onPress={ () => setOpen(true) }
        >
          <Ionicons name="ios-add" size={35} color="#121212" />
        </AnimatedBtn>
     </SafeAreaView>
   )
  }

  //styles area

  const styles = StyleSheet.create({

    //container tab
    container: {
      flex: 1,
      backgroundColor: '#f0f0f0'
    },
    //title tab
    title: {
      marginTop: 10,
      paddingBottom: 10,
      fontSize: 25,
      textAlign: 'center',
      color: '#141414'
    },
    //fab tab
    fab: {
    position: 'absolute',
    width: 55,
    height: 55,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    right: 25,
    bottom: 25,
    elevation: 2,
    zIndex: 9,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 1,
      height: 3,     
     }
    },
    //modal tab
    modal: {
      flex: 1,
      backgroundColor: '#f0f0f0'
    },
    //modal header tab
    modalheader: {
      marginLeft: 10,
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    //modal title tab
    modalTitle: {
      marginLeft: 15,
      fontSize: 23,
      color: '#121212',
    },
    //modal body
    modalbody: {
      marginTop: 15,
    },
    //input Tab
    input: {
      fontSize: 15,
      marginLeft: 10,
      marginRight: 10,
      marginTop: 30,
      backgroundColor: '#dcdcdc',
      padding: 9,
      height: 85,
      textAlignVertical: 'top',
      color: '#121212',
      borderRadius: 5,
    },
    //handle add tab
    handleAdd: {
      backgroundColor: '#dcdcdc',
      marginTop: 10,
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: 10,
      marginRight: 10,
      height: 40,
      borderRadius: 5,
    },
    //handle Text tab
    handleAddText:{
      fontSize: 18,
      color: '#121212',
    }

  });