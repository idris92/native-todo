import { View, Text, Image, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import Feather from '@expo/vector-icons/Feather';
import { db, collection, addDoc  } from "@/firebase";


const InputComponent = () => {
    const [input, setInput] = useState('')

    const addTodo = async()=>{
      if(input.length < 5) {
        Alert.alert("Input is less than 5 digit.")
      }else{

        try {
            const docRef = await addDoc(collection(db, "todo"), {
              title: input,
              isChecked: false
            });
            setInput('')
            Alert.alert("Todo Saved.", docRef.id)
    
          } catch (e) {
            Alert.alert("Oops something went wrong")
            console.log(e)
          }
      }
    
    }

  return (
    <View className='flex flex-row items-center justify-between w-full px-4 rounded-lg bg-accent-100 border border-primary-100 mt-5 py-2'>
        <View className='flex flex-1 flex-row items-center justify-start z-50'>
            <TextInput value={input} onChangeText={(item)=>setInput(item)} placeholder='Enter your todo' className='text-sm font-rubik text-black-300 ml-2 flex-1'/>
            <TouchableOpacity onPress={addTodo}>
                <Feather name="send" size={24} color="black"  />
            </TouchableOpacity>
        </View>
    </View>
  )
}

export default InputComponent