import { Link } from 'expo-router';
import { Text } from "./Themed";
import { Pressable, StyleSheet, Image } from 'react-native';
import { useQuery } from '@tanstack/react-query';

export function CoffeeListItem({ id, name, type }: { id: string, name: string, type: string }) {

  const { data: imageUrl } = useQuery({
    queryKey: ['coffee-image', id],
    queryFn: () => fetch(`https://coffee.alexflipnote.dev/random?id=${id}`).then(res => res.url),
  });

  return (
    <Link href={`/(app)/coffee/${id}`} asChild>
      <Pressable style={styles.container}>
        <Image 
          source={{ uri: imageUrl }}
          style={styles.image}
        />
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.type}>{type}</Text>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    width: "50%",
    alignItems: 'center',
  },
  image: {
    width: "100%",
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  type: {
    fontSize: 14,
    color: '#666',
  },
});

