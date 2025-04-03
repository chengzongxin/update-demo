import { StyleSheet, View, Text } from 'react-native';
import { UpdateChecker } from '@/components/UpdateChecker';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text>Hello chengzongxin</Text>
      <Text>Hello chengzongxin</Text>
      <Text>Hello chengzongxin</Text>
      <UpdateChecker />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});
