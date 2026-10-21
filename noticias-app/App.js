import 'react-native-gesture-handler';
import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

import CardNoticia from './src/CardNoticia';
import Detalhes from './src/Detalhes';
import Sobre from './src/Sobre';
import { noticiasTecnologia, noticiasEsportes } from './src/dados';

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function Lista({ navigation, dados }) {
  return (
    <FlatList
      data={dados}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <CardNoticia
          noticia={item}
          onPress={() => navigation.navigate('Detalhes', { noticia: item })}
        />
      )}
      contentContainerStyle={{ paddingVertical: 10 }}
    />
  );
}

function TecnologiaStack() {
  return (
    <Stack.Navigator screenOptions={{ headerTitleStyle: { fontWeight: '700' } }}>
      <Stack.Screen name="Tecnologia" options={{ title: 'Tecnologia' }}>
        {(props) => <Lista {...props} dados={noticiasTecnologia} />}
      </Stack.Screen>
      <Stack.Screen name="Detalhes" component={Detalhes} />
    </Stack.Navigator>
  );
}

function EsportesStack() {
  return (
    <Stack.Navigator screenOptions={{ headerTitleStyle: { fontWeight: '700' } }}>
      <Stack.Screen name="Esportes" options={{ title: 'Esportes' }}>
        {(props) => <Lista {...props} dados={noticiasEsportes} />}
      </Stack.Screen>
      <Stack.Screen name="Detalhes" component={Detalhes} />
    </Stack.Navigator>
  );
}

function AbasNoticias() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#8E8E93',
      }}
    >
      <Tab.Screen
        name="TecnologiaTab"
        component={TecnologiaStack}
        options={{
          tabBarLabel: 'Tecnologia',
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? 'hardware-chip' : 'hardware-chip-outline'}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="EsportesTab"
        component={EsportesStack}
        options={{
          tabBarLabel: 'Esportes',
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? 'trophy' : 'trophy-outline'}
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaProvider style={styles.container}>
      <NavigationContainer>
        <StatusBar style="dark" />
        <Drawer.Navigator
          screenOptions={{
            headerTitleAlign: 'center',
            drawerActiveTintColor: '#007AFF',
          }}
        >
          <Drawer.Screen
            name="Notícias"
            component={AbasNoticias}
            options={{
              drawerIcon: ({ focused, color, size }) => (
                <Ionicons
                  name={focused ? 'newspaper' : 'newspaper-outline'}
                  size={size}
                  color={color}
                />
              ),
            }}
          />
          <Drawer.Screen
            name="Sobre"
            component={Sobre}
            options={{
              drawerIcon: ({ focused, color, size }) => (
                <Ionicons
                  name={focused ? 'information-circle' : 'information-circle-outline'}
                  size={size}
                  color={color}
                />
              ),
            }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
