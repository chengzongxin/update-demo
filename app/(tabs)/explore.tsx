import { StyleSheet, Image, Platform, View, Text, ScrollView, Button } from 'react-native';
import { UpdateChecker } from '../../components/UpdateChecker';
import * as Updates from 'expo-updates';
import { useEffect, useState } from 'react';

export default function ExploreScreen() {

  const [updateInfo, setUpdateInfo] = useState<any>();

  const [checkInfo, setCheckInfo] = useState<any>();

  useEffect(() => {
    setUpdateInfo({
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
    });
  }, []);

  return (
    <View style={styles.container}>
      <Button title="检查更新" onPress={() => {
        Updates.checkForUpdateAsync().then((update) => {
          setCheckInfo(update);
        });
      }} />

      <Text>{JSON.stringify(checkInfo?.manifest || '没有更新')}</Text>
      <Text>{JSON.stringify(checkInfo || '')}</Text>

      <Text>{'testtesttest'}</Text>

      <UpdateChecker />
      
      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>更新信息:</Text>
        <ScrollView style={styles.scrollView}>
          <Text selectable style={styles.infoText}>
            {JSON.stringify(updateInfo, null, 2)}
          </Text>
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
    maxHeight: 300,
    width: '100%',
  },
  infoText: {
    fontSize: 14,
    lineHeight: 20,
  },
});
