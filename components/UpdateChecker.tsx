import React, { useState } from 'react';
import { StyleSheet, Alert, Platform, TouchableOpacity, View, Text } from 'react-native';
import * as Updates from 'expo-updates';

export function UpdateChecker() {
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  // 检查更新
  const checkForUpdates = async () => {
    try {
      setIsChecking(true);
      
      // 检查是否支持更新
      if (!Updates.isEnabled) {
        Alert.alert('提示', '当前环境不支持更新功能');
        return;
      }

      // 获取当前更新信息
      const update = await Updates.checkForUpdateAsync();
      console.log('更新检查结果:', update);
      
      setUpdateAvailable(update.isAvailable);
      
      if (update.isAvailable) {
        Alert.alert(
          '发现新版本',
          '是否现在更新？',
          [
            {
              text: '稍后',
              style: 'cancel',
            },
            {
              text: '更新',
              onPress: async () => {
                try {
                  setIsUpdating(true);
                  // 下载更新
                  await Updates.fetchUpdateAsync();
                  // 应用更新
                  await Updates.reloadAsync();
                } catch (error) {
                  console.error('更新失败:', error);
                  Alert.alert('更新失败', '请稍后重试');
                } finally {
                  setIsUpdating(false);
                }
              },
            },
          ]
        );
      } else {
        Alert.alert('提示', '当前已是最新版本');
      }
    } catch (error) {
      console.error('检查更新失败:', error);
      Alert.alert('检查更新失败', '请稍后重试');
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={[styles.button, isChecking && styles.buttonDisabled]}
        onPress={checkForUpdates}
        disabled={isChecking || isUpdating}
      >
        <Text style={styles.buttonText}>
          {isChecking ? '检查中...' : isUpdating ? '更新中...' : '检查更新'}
        </Text>
      </TouchableOpacity>
      {updateAvailable && (
        <Text style={styles.updateText}>有新版本可用</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    alignItems: 'center',
    gap: 10,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    minWidth: 120,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#999',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  updateText: {
    color: '#007AFF',
    fontSize: 14,
  },
}); 