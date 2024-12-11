import { View, Text } from '@/components/Themed';
import { useLocalSearchParams } from 'expo-router';
import { coffees } from '@/components/CoffeeList';
import { StyleSheet, Image } from 'react-native';
import { useQuery } from '@tanstack/react-query';

export default function CoffeeDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const coffee = coffees.find(c => c.id === id);

  if (!coffee) {
    return (
      <View style={styles.container}>
        <Text>Café non trouvé</Text>
      </View>
    );
  }

  const { data: imageUrl } = useQuery({
    queryKey: ['coffee-image', id],
    queryFn: () => fetch(`https://coffee.alexflipnote.dev/random?id=${id}`).then(res => res.url),
  });

  return (
    <View style={styles.container}>
      <Image 
        source={{ uri: imageUrl }}
        style={styles.image}
      />  
      <Text style={styles.title}>{coffee.name}</Text>
      <View style={styles.detailsContainer}>
        <Text style={styles.detail}>Type: {coffee.type}</Text>
        <Text style={styles.detail}>Force: {coffee.strength}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  image: {
    width: "100%",
    height: 300,
    borderRadius: 10,
    marginBottom: 20,
  },
  detailsContainer: {
    width: '100%',
    padding: 16,
    borderRadius: 8,
  },
  detail: {
    fontSize: 18,
    marginBottom: 10,
  },
}); 