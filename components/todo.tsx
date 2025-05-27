
import { Alert, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { db, deleteDoc, doc, updateDoc} from "@/firebase";
import { useState } from "react";

interface props{
  title: string;
  id: string;
  isChecked: boolean;
  refetch: ()=> void;
}

const Todo = ({title, id, isChecked, refetch}:props) => {
  const [checked, setChecked] = useState(isChecked)

  const handleDelete=async()=>{
    await deleteDoc(doc(db, "todo", id)).then(()=>{
      refetch()
      return (Alert.alert('Todo deleted'))
  })
}


  const  updateChecked=async()=>{
   
    const checkRef = doc(db, "todo", id);
      await updateDoc(checkRef, {
        isChecked: !checked
      }).then(()=>{
        setChecked(!checked)
      })
  }
  return (
    <View className="flex w-full justify-center items-center mt-5">
        <View className="w-full  bg-[#D3D3D3] rounded-full flex flex-row p-5 items-center ">
                
            <TouchableOpacity onPress={updateChecked}>
                {
                  checked ? (<AntDesign name="checkcircle" size={24} color="black" />) : (<AntDesign name="checkcircleo" size={24} color="black" /> )
                }
            </TouchableOpacity>
            <Text className="ml-5 text-[#000]"> {title}</Text>
            <TouchableOpacity onPress={handleDelete} className="ml-auto">
              <MaterialIcons  name="delete" size={24} color="black" />
            </TouchableOpacity>
        </View>
    </View>
  )

}

export default Todo