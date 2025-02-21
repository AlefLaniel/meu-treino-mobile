import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';
import * as DocumentPicker from 'expo-document-picker';

async function restoreData() {
  try {
    // Abre o seletor de documentos para escolher um arquivo JSON
    const result = await DocumentPicker.getDocumentAsync({ type: 'application/json' });
    if (!result.canceled) {
      // Lê o conteúdo do arquivo selecionado
      const fileContent = await FileSystem.readAsStringAsync(result.assets[0].uri);
      // Faz o parsing dos dados
      const data = JSON.parse(fileContent);
      // Armazena os dados no AsyncStorage
      await AsyncStorage.setItem('workout-sheets', JSON.stringify(data));
      console.log("Dados restaurados com sucesso");
    } else {
      console.log("Nenhum arquivo selecionado");
    }
  } catch (error) {
    console.error("Erro ao restaurar backup: ", error);
  }

}

export default restoreData;
