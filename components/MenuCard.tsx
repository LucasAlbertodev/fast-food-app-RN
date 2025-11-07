import { Image, Platform, Text, TouchableOpacity } from 'react-native';
import { Models } from "react-native-appwrite";

export interface MenuItem extends Models.Document {
    name: string;
    price: number;
    image_url: string;
    description: string;
    calories: number;
    protein: number;
    rating: number;
    type: string;
}

const MenuCard = ({item:{name,price,image_url}} : {item: MenuItem}) => {
    const imageUrl = `${image_url}`;
  
  return (
    <TouchableOpacity className='menu-card' style={Platform.OS === 'android' ?{elevation:10, shadowColor:'#878787'} : {}}>
      <Image  source={{uri: imageUrl}} className="size-32 absolute -top-10" resizeMode="contain" />
            <Text className="text-center base-bold text-dark-100 mb-2" numberOfLines={1}>{name}</Text>
            <Text className="body-regular text-gray-200 mb-4">From ${price}</Text>
            <TouchableOpacity onPress={() =>{}}>
                <Text className='text-primary paragraph-bold'>
                    Add to Cart +
                </Text>
            </TouchableOpacity>
    </TouchableOpacity>
  )
}

export default MenuCard