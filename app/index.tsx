import { KeyboardAvoidingView, SafeAreaView, Text, View, Platform, ScrollView, FlatList, ActivityIndicator } from "react-native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import Todo from "@/components/todo";
import InputComponent from "@/components/inputComponent";
import { db, collection, getDocs} from "@/firebase";
import { useEffect, useState } from "react";
import CustomKeyboardView from "@/components/customKeyboardView";


export default function Index() {

  const [todoList, setTodoList] = useState<any>([])
  const [loading, setLoading] = useState(false)

  const getData=async()=>{
      setLoading(true)
      const querySnapshot = await getDocs(collection(db, "todo"));
      const result = querySnapshot.docs.map((doc)=>({...doc.data(),id: doc.id}));
      setTodoList(result)
      setLoading(false)
  }

  useEffect(() => {
    getData()
  }, [])
  
 
  return (
    <CustomKeyboardView>
      <SafeAreaView
      className="flex w-full h-full p-5 mt-5 flex-col"
      >
            <View className="flex flex-row w-full items-center">
                <Text className="text-2xl font-extrabold">My Todo List</Text>
                <Text className="text-lg font-medium ml-5">{todoList.length}</Text>
            </View>

            <FlatList
            data={todoList} 
            horizontal={false}
            renderItem={({item})=> (<Todo title={item.title} isChecked={item.isChecked} id={item.id} refetch={getData}/>)}
            keyExtractor={item=> item.id}
            ListEmptyComponent={
              loading?<ActivityIndicator size='large'/>: <Text>List empty</Text>
              
            }
            />

            
              <View className=" mt-auto  ">
                <InputComponent/>
              </View>
      </SafeAreaView>
  </CustomKeyboardView>
  // {/* </ScrollView> */}
  );
}
