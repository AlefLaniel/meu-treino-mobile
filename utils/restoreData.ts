import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';
import * as DocumentPicker from 'expo-document-picker';
import { STORAGE_KEY } from './storage';
import * as Updates from 'expo-updates';

async function restoreData() {
  try {
    // Abre o seletor de documentos para escolher um arquivo JSON
    console.log("Iniciando o processo de restauração de dados");
    const result = await DocumentPicker.getDocumentAsync({ type: 'application/json' });
    if (!result.canceled) {
      // Lê o conteúdo do arquivo selecionado
      console.log("Arquivo selecionado:", result.assets[0].uri);
      const fileContent = await FileSystem.readAsStringAsync(result.assets[0].uri);
      // Faz o parsing dos dados
      console.log("Conteúdo do arquivo:", fileContent);
      const data = JSON.parse(fileContent);
      // Armazena os dados no AsyncStorage
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      console.log("Dados armazenados no AsyncStorage");
    } else {
      console.log("Nenhum arquivo selecionado");
    }
  } catch (error) {
    console.error("Erro ao restaurar backup: ", error);
  }

}

export default restoreData;
