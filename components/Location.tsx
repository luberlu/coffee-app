import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import { Text, View } from './Themed';
import * as ExpoLocation from 'expo-location';
import { Ionicons } from '@expo/vector-icons';
import { constants } from '@/constants/Colors';
import { Link } from 'expo-router';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useLocationStore } from '@/stores/useLocationStore';
import ArrowDown from '@/assets/icons/arrow-down.svg';
import fonts from '@/constants/Font';

const CITIES = [
  { name: 'Paris', coords: { latitude: 48.8566, longitude: 2.3522 } },
  { name: 'London', coords: { latitude: 51.5074, longitude: -0.1278 } },
  { name: 'Lisboa', coords: { latitude: 38.7223, longitude: -9.1393 } },
  { name: 'Barcelona', coords: { latitude: 41.3851, longitude: 2.1734 } },
];

interface LocationProps {
  onLocationChange?: (location: string) => void;
}

export default function Location({ onLocationChange }: LocationProps = {}) {
  const { location, setLocation: setGlobalLocation } = useLocationStore();

  useEffect(() => {
    requestLocation();
  }, []);

  const updateLocation = (newLocation: string) => {
    setGlobalLocation(newLocation);
    onLocationChange?.(newLocation);
  };

  const requestLocation = async () => {
    try {
      const { status } = await ExpoLocation.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        return;
      }

      const location = await ExpoLocation.getCurrentPositionAsync({});
      const nearestCity = findNearestCity(location.coords);
      updateLocation(nearestCity);
    } catch (error) {
      return;
    }
  };

  const findNearestCity = (coords: { latitude: number; longitude: number }) => {
    let nearest = CITIES[0];
    let minDistance = calculateDistance(coords, CITIES[0].coords);

    CITIES.forEach(city => {
      const distance = calculateDistance(coords, city.coords);
      if (distance < minDistance) {
        minDistance = distance;
        nearest = city;
      }
    });

    return nearest.name;
  };

  const calculateDistance = (coords1: { latitude: number; longitude: number }, coords2: { latitude: number; longitude: number }) => {
    return Math.sqrt(
      Math.pow(coords1.latitude - coords2.latitude, 2) +
      Math.pow(coords1.longitude - coords2.longitude, 2)
    );
  };

  return (
    <View style={styles.container}>
      <Link href="/location" asChild>
        <TouchableOpacity style={styles.locationContainer}>
          <Text style={styles.text}>Location</Text>
          <View style={styles.locationTextContainer}>
            <Text style={styles.textLocation}>{location || 'Choose a city'}</Text>
            <ArrowDown style={styles.arrowDown} fill={ constants.grey.light }/>
          </View>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
    paddingBottom: 14
  },
  locationContainer: {
    justifyContent: 'space-between',
  },
  text: {
    fontSize: fonts.fontSize.xs,
    color: constants.grey.medium,
    fontWeight: '500',
  },
  locationTextContainer: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: "transparent",
  },
  textLocation: {
    fontSize: fonts.fontSize.sm,
    color: constants.grey.light,
    fontWeight: '700',
    marginRight: 6,
  },
  arrowDown: {
    width: 16,
    height: 16,
  }
}); 
