import { FlatList } from 'react-native';
import { View, Text } from "./Themed";
import { useFilterStore } from "@/stores/useFilterStore";
import { CoffeeListItem } from './CoffeeListItem';

export function CoffeeList() {
  const { selectedCoffeeType, selectedCoffeeStrength, searchQuery } = useFilterStore();

  const coffees = [
    { id: '1', name: 'Le Réveil Enchanté', type: 'Espresso', strength: 'Mild' },
    { id: '2', name: 'Douceur Nuageuse', type: 'Cappuccino', strength: 'Medium' },
    { id: '3', name: 'Velours de Moka', type: 'Moka', strength: 'Strong' },
    { id: '4', name: 'L\'Éveil des Sens', type: 'Espresso', strength: 'Extra Strong' },
    { id: '5', name: 'La Pause Crémeuse', type: 'Latte', strength: 'Mild' },
    { id: '6', name: 'Symphony Lactée', type: 'Cappuccino', strength: 'Medium' },
    { id: '7', name: 'L\'Or Noir', type: 'Espresso', strength: 'Strong' },
    { id: '8', name: 'Caresse Vanillée', type: 'Latte Macchiato', strength: 'Mild' },
    { id: '9', name: 'Le Rêveur Italien', type: 'Ristretto', strength: 'Mild' },
    { id: '10', name: 'Danse Arabica', type: 'Americano', strength: 'Medium' }
  ];

  const filteredCoffees = coffees.filter(coffee => {
    // Filtre par type de café si sélectionné
    const typeMatch = !selectedCoffeeType || coffee.type === selectedCoffeeType;

    // Filtre par force de café si sélectionné
    const strengthMatch = !selectedCoffeeStrength || coffee.strength === selectedCoffeeStrength;

    // Filtre par recherche textuelle
    const searchMatch = !searchQuery || 
      coffee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      coffee.type.toLowerCase().includes(searchQuery.toLowerCase());

    return typeMatch && strengthMatch && searchMatch;
  });

  return (
    <FlatList
      data={filteredCoffees}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <CoffeeListItem name={item.name} type={item.type} />
      )}
    />
  );
} 