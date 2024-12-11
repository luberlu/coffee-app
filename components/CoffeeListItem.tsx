import { Link } from 'expo-router';
import { Text, View } from "./Themed";
import { Pressable, StyleSheet, Image } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { constants } from '@/constants/Colors';

export function CoffeeListItem({ id, name, type, price }: { id: string, name: string, type: string, price: number }) {

  const { data: imageUrl } = useQuery({
    queryKey: ['coffee-image', id],
    queryFn: () => fetch(`https://coffee.alexflipnote.dev/random?id=${id}`).then(res => res.url),
  });

  return (
    <Link href={`/(app)/coffee/${id}`} asChild>
      <Pressable style={styles.container}>
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: imageUrl }}
            style={styles.image}
          />
        </View>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.type}>{type}</Text>
        <Text style={styles.price}>{price}$</Text>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "50%",
    maxWidth: "50%",
    marginBottom: 24,
    padding: 8,
    backgroundColor: constants.grey.darker,
    borderRadius: 16,
    paddingBottom: 16,
  },
  imageContainer: {
    width: "100%",
    height: 128,
    borderRadius: 10,
    marginBottom: 10,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  type: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
});

