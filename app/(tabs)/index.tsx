import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { UpdateChecker } from '@/components/UpdateChecker';
import * as Updates from 'expo-updates';
import { useEffect, useState } from 'react';

export default function HomeScreen() {

  const [updateInfo, setUpdateInfo] = useState<any>();
  const [formattedInfo, setFormattedInfo] = useState<Array<{key: string, value: any, description: string}>>([]);

  useEffect(() => {
    const info = {
      channel: Updates.channel,
      checkAutomatically: Updates.checkAutomatically,
      isEnabled: Updates.isEnabled,
      createdAt: Updates.createdAt,
      isUsingEmbeddedAssets: Updates.isUsingEmbeddedAssets,
      emergencyLaunchReason: Updates.emergencyLaunchReason,
      isEmbeddedLaunch: Updates.isEmbeddedLaunch,
      isEmergencyLaunch: Updates.isEmergencyLaunch,
      latestContext: Updates.latestContext,
      launchDuration: Updates.launchDuration,
      manifest: Updates.manifest,
      runtimeVersion: Updates.runtimeVersion,
      updateId: Updates.updateId,
    };
    
    setUpdateInfo(info);
    
    // 格式化信息，添加中文说明
    const formatted = [
      { key: 'channel', value: info.channel, description: '更新通道：指定应用接收更新的渠道' },
      { key: 'checkAutomatically', value: info.checkAutomatically, description: '自动检查更新：是否在应用启动时自动检查更新' },
      { key: 'isEnabled', value: info.isEnabled, description: '更新功能是否启用：控制应用是否可以使用更新功能' },
      { key: 'createdAt', value: info.createdAt ? new Date(info.createdAt).toLocaleString() : null, description: '创建时间：当前更新包的创建时间' },
      { key: 'isUsingEmbeddedAssets', value: info.isUsingEmbeddedAssets, description: '使用内置资源：是否使用应用内置的资源文件' },
      { key: 'emergencyLaunchReason', value: info.emergencyLaunchReason, description: '紧急启动原因：如果应用以紧急模式启动，这里会显示原因' },
      { key: 'isEmbeddedLaunch', value: info.isEmbeddedLaunch, description: '是否使用内置启动：应用是否使用内置的启动配置' },
      { key: 'isEmergencyLaunch', value: info.isEmergencyLaunch, description: '是否紧急启动：应用是否以紧急模式启动' },
      { key: 'latestContext', value: JSON.stringify(info.latestContext), description: '最新上下文：包含应用的最新运行环境信息' },
      { key: 'launchDuration', value: info.launchDuration, description: '启动持续时间：应用启动所需的时间（毫秒）' },
      { key: 'manifest', value: JSON.stringify(info.manifest), description: '清单文件：包含应用的配置信息和资源列表' },
      { key: 'runtimeVersion', value: info.runtimeVersion, description: '运行时版本：应用运行时的版本号' },
      { key: 'updateId', value: info.updateId, description: '更新ID：当前更新包的唯一标识符' },
    ];
    
    setFormattedInfo(formatted);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello chengzongxin</Text>
      <UpdateChecker />
      
      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>更新信息:</Text>
        <ScrollView style={styles.scrollView}>
          {formattedInfo.map((item, index) => (
            <View key={index} style={styles.infoItem}>
              <Text style={styles.infoKey}>{item.key}:</Text>
              <Text style={styles.infoDescription}>{item.description}</Text>
              <Text selectable style={styles.infoValue}>
                {typeof item.value === 'boolean' 
                  ? (item.value ? '是' : '否') 
                  : item.value === null || item.value === undefined 
                    ? '无数据' 
                    : item.value}
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  infoContainer: {
    width: '100%',
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  scrollView: {
    maxHeight: 400,
    width: '100%',
  },
  infoItem: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
  },
  infoKey: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  infoDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
    marginBottom: 5,
  },
  infoValue: {
    fontSize: 14,
    color: '#0066cc',
    marginTop: 5,
  },
});
