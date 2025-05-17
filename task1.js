import React from 'react';
import { ScrollView, StyleSheet, View,Image,Dimensions } from 'react-native';
const images=[
    'https://images.pexels.com/photos/220455/pexels-photo-220455.jpeg?cs=srgb&dl=pexels-pixabay-220455.jpg&fm=jpg',
   'https://media.istockphoto.com/id/1130123888/photo/little-stylish-kid-wearing-trendy-checked-shirt-and-jeans-is-having-fun-on-the-picnic-he-is.jpg?s=612x612&w=0&k=20&c=m408GaBf6qth5H8nxwJFNtLlIPHwQQu8RtRC0Mo5DFI=',
   'https://images.pexels.com/photos/35188/child-childrens-baby-children-s.jpg',
   'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXO10dpG8wRxxYPm9C0w8NoaUknh4PnQ8wXErz-FFvUSlSTA7gdMnqfsxr7wq9ddv8VwM&usqp=CAU',
   'https://www.mamasorganizedchaos.com/wp-content/uploads/2018/11/how-to-adjust-to-life-with-2-children.jpg',
   'https://images.pexels.com/photos/6779813/pexels-photo-6779813.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
]
export const Task1 = () => {
     const { width, height } = Dimensions.get('window'); 
    return (
         <ScrollView horizontal>
      {images.map((img, index) => (
        <Image key={index} style={{width, height}} source={{uri: img}}
          resizeMode="cover"
        />
      ))}
    </ScrollView>
    );
}

const styles = StyleSheet.create({})

export default Task1;
