import cn from "clsx";
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { FlatList, Platform, Text, TouchableOpacity } from 'react-native';
import { Models } from 'react-native-appwrite';


export interface Category extends Models.Document {
  name: string;
  description: string;
}

const Filter = ({ categories }: { categories: Category[] }) => {
  const searchParams = useLocalSearchParams();
  const [active, setActive] = useState(searchParams.category || '');


const handlePress = (id: string): void =>{
    setActive(id);

    if(id === 'all') router.setParams({category:undefined})
        else router.setParams({category:id})
}

  const filterData: (Category | { $id: string; name: string })[] = categories
    ? [{ $id: 'all', name: 'All' }, ...categories]
    : [{ $id: 'all', name: 'All' }];


  return (
    <FlatList
      data={filterData} 
      keyExtractor={(item) => item.$id}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerClassName='gap-x-2 pb-3 mt-5'
      renderItem={({item}) => (
        <TouchableOpacity key={item.$id} className={cn('filter', active === item.$id ? 'bg-amber-600' : 'bg-white-100')} 
            style={Platform.OS === 'android' ? {elevation:5, shadowColor:"#878787"}: {}}
            onPress={() => handlePress(item.$id)}
        >
            <Text className={cn('body-medium',active === item.$id ? 'text-white' : 'text-gray-200' )}>{item.name}</Text>
        </TouchableOpacity>
      )}
    />
  );
};

export default Filter;
