import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { STORAGE_KEY } from './storage';

async function backupData() {
  try {
    // Recupera os dados salvos no AsyncStorage
    const data = await AsyncStorage.getItem(STORAGE_KEY);
    if (data) {
      // Define a pasta de backup
      const backupFolder = FileSystem.documentDirectory + 'backups/';
      const folderInfo = await FileSystem.getInfoAsync(backupFolder);
      if (!folderInfo.exists) {
        // Cria a pasta, se necessário
        await FileSystem.makeDirectoryAsync(backupFolder, { intermediates: true });
      }
      // Cria um nome de arquivo com timestamp
      const fileUri = backupFolder + `backup_${new Date().toISOString()}.json`;
      // Escreve os dados no arquivo
      await FileSystem.writeAsStringAsync(fileUri, data);
      // Abre a interface de compartilhamento para salvar/compartilhar o arquivo
      await Sharing.shareAsync(fileUri);
    } else {
      console.log("Nenhum dado para backup");
    }
  } catch (error) {
    console.error("Erro ao fazer backup: ", error);
  }
}

export default backupData;