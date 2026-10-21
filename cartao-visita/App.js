import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  TextInput,
  Switch,
  TouchableOpacity,
  Modal,
  Alert,
  StyleSheet,
  Platform,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

const lembretes = [
  'Lembrete: Hidrate-se! 💧',
  'Respire fundo e continue. 🌬️',
  'Dica: Faça uma pausa breve. ⏱️',
  'Mantenha a postura ereta! 🧘',
  'Hora de esticar o corpo! 🚶',
];

export default function App() {
  const [bio, setBio] = useState('');
  const [bioTemp, setBioTemp] = useState('');
  const [modalVisivel, setModalVisivel] = useState(false);
  const [notificacoes, setNotificacoes] = useState(false);
  const [notificacao, setNotificacao] = useState(null);

  useEffect(() => {
    if (!notificacoes) {
      setNotificacao(null);
      return;
    }

    const sortear = () => {
      const idx = Math.floor(Math.random() * lembretes.length);
      setNotificacao(lembretes[idx]);
    };

    sortear();
    const timer = setInterval(sortear, 5000);
    return () => clearInterval(timer);
  }, [notificacoes]);

  const abrirModal = () => {
    setBioTemp(bio);
    setModalVisivel(true);
  };

  const salvarBio = () => {
    setBio(bioTemp);
    setModalVisivel(false);
    alerta('Sucesso', 'Bio atualizada!');
  };

  const salvarDados = () => {
    alerta('Sucesso', 'Dados salvos com sucesso!');
  };

  const alerta = (titulo, mensagem) => {
    if (Platform.OS === 'web') {
      window.alert(`${titulo}\n\n${mensagem}`);
    } else {
      Alert.alert(titulo, mensagem);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.scroll}>
        <Image source={require('./assets/avatar.png')} style={styles.avatar} />
        <Text style={styles.nome}>Robert Lentilha</Text>

        <View style={styles.card}>
          <Text style={styles.cardTitulo}>Bio</Text>
          <View style={styles.bioBox}>
            <Text style={styles.bioTexto}>{bio}</Text>
          </View>
          <TouchableOpacity style={styles.botaoPequeno} onPress={abrirModal}>
            <Text style={styles.botaoTexto}>Editar bio</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitulo}>Configurações</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Receber Notificações</Text>
            <Switch
              value={notificacoes}
              onValueChange={setNotificacoes}
              trackColor={{ false: '#cbd5e1', true: '#93c5fd' }}
              thumbColor={notificacoes ? '#2563eb' : '#f8fafc'}
            />
          </View>
        </View>

        <TouchableOpacity style={styles.botaoPrincipal} onPress={salvarDados}>
          <Text style={styles.botaoTexto}>Salvar</Text>
        </TouchableOpacity>
      </ScrollView>

      {notificacao && (
        <View style={styles.banner}>
          <Text style={styles.bannerTexto}>{notificacao}</Text>
        </View>
      )}

      <Modal visible={modalVisivel} transparent animationType="fade">
        <View style={styles.modalFundo}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitulo}>Editar Bio</Text>
            <TextInput
              style={styles.input}
              value={bioTemp}
              onChangeText={setBioTemp}
              multiline
              placeholder="Digite sua bio..."
            />
            <View style={styles.modalBotoes}>
              <TouchableOpacity
                style={styles.botaoCancelar}
                onPress={() => setModalVisivel(false)}
              >
                <Text style={styles.botaoCancelarTexto}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.botaoModalSalvar} onPress={salvarBio}>
                <Text style={styles.botaoTexto}>Salvar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    height: '100%',
  },
  scroll: {
    paddingVertical: 20,
    paddingBottom: 70,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignSelf: 'center',
    marginBottom: 12,
  },
  nome: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0f172a',
    textAlign: 'center',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  cardTitulo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 12,
  },
  bioBox: {
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 10,
    padding: 12,
    minHeight: 90,
    marginBottom: 12,
  },
  bioTexto: {
    fontSize: 14,
    color: '#334155',
    lineHeight: 20,
  },
  botaoPequeno: {
    backgroundColor: '#2563eb',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  botaoPrincipal: {
    backgroundColor: '#2563eb',
    marginHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  botaoTexto: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: 15,
    color: '#334155',
  },
  banner: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    backgroundColor: '#0f172a',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  bannerTexto: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  modalFundo: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    padding: 20,
  },
  modalCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
  },
  modalTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 10,
    padding: 12,
    fontSize: 14,
    minHeight: 90,
    textAlignVertical: 'top',
    backgroundColor: '#f8fafc',
    marginBottom: 16,
  },
  modalBotoes: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
  },
  botaoCancelar: {
    backgroundColor: '#e2e8f0',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  botaoCancelarTexto: {
    color: '#334155',
    fontSize: 14,
    fontWeight: 'bold',
  },
  botaoModalSalvar: {
    backgroundColor: '#2563eb',
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 8,
  },
});
