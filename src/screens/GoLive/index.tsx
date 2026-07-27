import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
import { GoLiveSignalIcon } from '../../components/Icons';

export const GoLiveScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Mock Live Stream Camera Preview */}
        <View style={styles.cameraPreview}>
          <View style={styles.topBar}>
            <View style={styles.liveTag}>
              <View style={styles.dot} />
              <Text style={styles.liveTagText}>GO LIVE READY</Text>
            </View>
          </View>

          <View style={styles.centerContent}>
            <View style={styles.iconCircle}>
              <GoLiveSignalIcon size={44} color="#68C700" />
            </View>
            <Text style={styles.title}>Start Broadcast</Text>
            <Text style={styles.subtitle}>Share your moments, interact with fans and earn rewards in real time!</Text>
          </View>

          <TouchableOpacity style={styles.startLiveButton} activeOpacity={0.85}>
            <Text style={styles.startLiveButtonText}>GO LIVE NOW 🚀</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default GoLiveScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#111810',
  },
  container: {
    flex: 1,
    padding: 20,
    paddingBottom: 90,
  },
  cameraPreview: {
    flex: 1,
    backgroundColor: '#1E291C',
    borderRadius: 24,
    padding: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2F422C',
  },
  topBar: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  liveTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(104, 199, 0, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#68C700',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#68C700',
    marginRight: 6,
  },
  liveTagText: {
    color: '#68C700',
    fontSize: 11,
    fontWeight: '800',
  },
  centerContent: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  iconCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    shadowColor: '#68C700',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 10,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: '800',
    marginBottom: 8,
  },
  subtitle: {
    color: '#A0B49B',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
  startLiveButton: {
    width: '100%',
    backgroundColor: '#76D200',
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
    shadowColor: '#76D200',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 6,
  },
  startLiveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
});
