import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

export default function Sobre({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Sobre</Text>
      <Image
        source={require('../assets/newspaper.png')}
        style={styles.imagem}
        resizeMode="contain"
      />
      <View style={styles.divisor} />

      <Text style={styles.texto}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </Text>
      <Text style={styles.texto}>
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
        dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
        proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </Text>

      <View style={{ flex: 1 }} />
      <TouchableOpacity
        style={styles.botao}
        onPress={() => navigation.navigate('Notícias')}
        activeOpacity={0.8}
      >
        <Text style={styles.botaoTexto}>VOLTAR</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    padding: 24,
  },
  titulo: {
    fontSize: 24,
    fontWeight: '800',
    color: '#0f172a',
    textAlign: 'center',
    marginBottom: 16,
  },
  imagem: {
    width: 130,
    height: 130,
    alignSelf: 'center',
  },
  divisor: {
    height: 1.5,
    backgroundColor: '#334155',
    marginVertical: 20,
  },
  texto: {
    fontSize: 16,
    color: '#1e293b',
    marginBottom: 6,
    lineHeight: 22,
  },
  topicos: {
    marginTop: 6,
  },
  item: {
    fontSize: 15,
    color: '#334155',
    lineHeight: 26,
    marginLeft: 6,
  },
  botao: {
    backgroundColor: '#1e90ff',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
  },
  botaoTexto: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
});
