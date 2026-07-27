import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { PartyIcon } from '../../components/Icons';

export const PartyScreen = () => {
  const partyRooms = [
    { id: '1', title: '🎤 Karaoke Masters Party', host: 'Alex & Friends', listeners: '1.4K' },
    { id: '2', title: '🎧 Late Night Chill Vibes', host: 'DJ Sparkle', listeners: '2.8K' },
    { id: '3', title: '🎮 Gaming Squad Room', host: 'ProGamerX', listeners: '950' },
    { id: '4', title: '💬 Friendship & Chat Lounge', host: 'Emma Watson', listeners: '3.1K' },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <View style={styles.headerTitleRow}>
          <PartyIcon size={26} color="#68C700" focused />
          <Text style={styles.headerTitle}>Party Rooms</Text>
        </View>
        <Text style={styles.subTitle}>Join live audio stages & interactive party groups</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {partyRooms.map((room) => (
          <TouchableOpacity key={room.id} style={styles.roomCard} activeOpacity={0.85}>
            <View style={styles.roomBadge}>
              <Text style={styles.roomBadgeText}>LIVE</Text>
            </View>
            <View style={styles.roomInfo}>
              <Text style={styles.roomTitle}>{room.title}</Text>
              <Text style={styles.roomHost}>Host: {room.host}</Text>
            </View>
            <View style={styles.listenerBadge}>
              <Text style={styles.listenerText}>🔥 {room.listeners}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default PartyScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8FAF6',
  },
  header: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EEF2EA',
  },
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#111111',
  },
  subTitle: {
    fontSize: 13,
    color: '#666666',
    marginTop: 4,
  },
  content: {
    padding: 16,
    paddingBottom: 90,
  },
  roomCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 3,
  },
  roomBadge: {
    backgroundColor: '#FF2B44',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginRight: 12,
  },
  roomBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
  },
  roomInfo: {
    flex: 1,
  },
  roomTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#222222',
  },
  roomHost: {
    fontSize: 12,
    color: '#777777',
    marginTop: 2,
  },
  listenerBadge: {
    backgroundColor: '#F1FACF',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  listenerText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#4B9100',
  },
});
