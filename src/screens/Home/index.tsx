import React, { useState, useEffect, useMemo } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
  StatusBar,
  ActivityIndicator,
  RefreshControl,
  TextInput,
  ScrollView,
} from 'react-native';
import Svg, { Rect, Path } from 'react-native-svg';
import { BellIcon, ShoppingBagIcon, EyeIcon } from '../../components/Icons';
import { getLiveStreamers, StreamerItem } from '../../services/streamService';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 36) / 2;

const AliveLogo = () => (
  <View style={styles.logoContainer}>
    <View style={styles.logoBadge}>
      <Svg width={32} height={32} viewBox="0 0 36 36" fill="none">
        <Rect width="36" height="36" rx="10" fill="#68C700" />
        <Rect x="8" y="13" width="16" height="12" rx="3" fill="#FFFFFF" />
        <Path d="M24 16L29 13.5V22.5L24 20V16Z" fill="#FFFFFF" />
      </Svg>
    </View>
    <Text style={styles.logoText}>Alive</Text>
  </View>
);

const COUNTRY_FILTERS = [
  { id: 'global', name: 'Global', icon: '🌐' },
  { id: 'india', name: 'India', flag: '🇮🇳' },
  { id: 'philippines', name: 'Philippines', flag: '🇵🇭' },
  { id: 'brazil', name: 'Brazil', flag: '🇧🇷' },
  { id: 'vietnam', name: 'Vietnam', flag: '🇻🇳' },
];

export const HomeScreen = () => {
  const [activeTab, setActiveTab] = useState<'Stream' | 'Hot' | 'Follow'>('Stream');
  const [selectedCountry, setSelectedCountry] = useState('global');
  const [searchQuery, setSearchQuery] = useState('');
  const [streamers, setStreamers] = useState<StreamerItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;

    const fetchStreamers = async () => {
      try {
        const data = await getLiveStreamers(searchQuery, selectedCountry);
        if (isMounted) {
          setStreamers(data);
        }
      } catch (error) {
        console.error('Error loading streamers:', error);
      } finally {
        if (isMounted) {
          setLoading(false);
          setRefreshing(false);
        }
      }
    };

    fetchStreamers();

    return () => {
      isMounted = false;
    };
  }, [selectedCountry]);

  const filteredStreamers = useMemo(() => {
    return streamers.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase().trim())
    );
  }, [streamers, searchQuery]);

  const onRefresh = () => {
    setRefreshing(true);
    getLiveStreamers(searchQuery, selectedCountry)
      .then((data) => setStreamers(data))
      .catch((err) => console.error(err))
      .finally(() => setRefreshing(false));
  };

  const renderStreamCard = ({ item }: { item: StreamerItem }) => (
    <TouchableOpacity style={styles.card} activeOpacity={0.88}>
      <Image source={{ uri: item.imageUri }} style={styles.cardImage} />

      <View style={styles.viewerBadge}>
        <EyeIcon size={12} color="#FFFFFF" />
        <Text style={styles.viewerText}>{item.views}</Text>
      </View>

      {item.isLive && (
        <View style={styles.liveBadge}>
          <View style={styles.liveDot} />
          <Text style={styles.liveText}>LIVE</Text>
        </View>
      )}

      <View style={styles.cardBottomOverlay}>
        <View style={styles.userInfoRow}>
          <View style={styles.avatarWrapper}>
            <Image source={{ uri: item.avatarUri }} style={styles.avatarImage} />
            <Text style={styles.flagEmoji}>{item.flag}</Text>
          </View>
          <Text style={styles.userName} numberOfLines={1}>
            {item.name}
          </Text>
        </View>

        <TouchableOpacity style={styles.followButton} activeOpacity={0.8}>
          <Text style={styles.followButtonText}>+ Follow</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <View style={styles.container}>
        {/* Top Header */}
        <View style={styles.header}>
          <AliveLogo />

          <View style={styles.headerRightActions}>
            <TouchableOpacity style={styles.iconCircle} activeOpacity={0.7}>
              <BellIcon size={22} color="#4A4A4A" />
              <View style={styles.badgeCount}>
                <Text style={styles.badgeText}>3</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.iconCircle, styles.bagCircle]} activeOpacity={0.7}>
              <ShoppingBagIcon size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search streamer name..."
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoCorrect={false}
          />
        </View>

        {/* Sub Header Tabs */}
        <View style={styles.tabsRow}>
          {(['Stream', 'Hot', 'Follow'] as const).map((tab) => {
            const isActive = activeTab === tab;
            return (
              <TouchableOpacity
                key={tab}
                onPress={() => setActiveTab(tab)}
                style={styles.tabButton}
                activeOpacity={0.7}
              >
                <Text style={[styles.tabText, isActive && styles.tabTextActive]}>
                  {tab}
                </Text>
                {isActive && <View style={styles.activeTabIndicator} />}
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Country Filter Bar */}
        <View style={styles.filterSection}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterScrollContent}
          >
            {COUNTRY_FILTERS.map((item) => {
              const isSelected = selectedCountry === item.id;
              return (
                <TouchableOpacity
                  key={item.id}
                  onPress={() => setSelectedCountry(item.id)}
                  style={[
                    styles.filterPill,
                    isSelected && styles.filterPillSelected,
                  ]}
                  activeOpacity={0.75}
                >
                  <Text style={styles.filterFlag}>{item.icon || item.flag}</Text>
                  <Text
                    style={[
                      styles.filterText,
                      isSelected && styles.filterTextSelected,
                    ]}
                  >
                    {item.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Stream Grid */}
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#68C700" />
            <Text style={styles.loadingText}>Loading Live Streams...</Text>
          </View>
        ) : (
          <FlatList
            data={filteredStreamers}
            keyExtractor={(item) => item.id}
            renderItem={renderStreamCard}
            numColumns={2}
            columnWrapperStyle={styles.gridRow}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.gridContentContainer}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={['#68C700']}
                tintColor="#68C700"
              />
            }
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No streamers found</Text>
              </View>
            }
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    backgroundColor: '#F8FAF6',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingTop: 10,
    paddingBottom: 8,
    backgroundColor: '#FFFFFF',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoBadge: {
    marginRight: 6,
  },
  logoText: {
    fontSize: 22,
    fontWeight: '800',
    color: '#68C700',
    letterSpacing: -0.4,
  },
  headerRightActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F2F4F0',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  bagCircle: {
    backgroundColor: '#68C700',
  },
  badgeCount: {
    position: 'absolute',
    top: -2,
    right: -2,
    backgroundColor: '#FF2B44',
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
  },
  searchContainer: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 18,
    paddingBottom: 8,
  },
  searchInput: {
    backgroundColor: '#F2F4F0',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 8,
    fontSize: 14,
    color: '#111111',
  },
  tabsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingTop: 4,
    paddingBottom: 12,
    backgroundColor: '#FFFFFF',
    gap: 20,
  },
  tabButton: {
    position: 'relative',
    paddingVertical: 4,
  },
  tabText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#9E9E9E',
  },
  tabTextActive: {
    fontSize: 20,
    fontWeight: '800',
    color: '#68C700',
  },
  activeTabIndicator: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: '#68C700',
    borderRadius: 2,
  },
  filterSection: {
    backgroundColor: '#FFFFFF',
    paddingBottom: 12,
  },
  filterScrollContent: {
    paddingHorizontal: 18,
    gap: 10,
  },
  filterPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E2E8DC',
    backgroundColor: '#FFFFFF',
  },
  filterPillSelected: {
    borderColor: '#68C700',
    backgroundColor: '#F1FACF',
  },
  filterFlag: {
    fontSize: 14,
    marginRight: 6,
  },
  filterText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#666666',
  },
  filterTextSelected: {
    color: '#111111',
    fontWeight: '700',
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 60,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    fontWeight: '600',
    color: '#888888',
  },
  gridContentContainer: {
    paddingHorizontal: 14,
    paddingTop: 12,
    paddingBottom: 90,
  },
  gridRow: {
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  card: {
    width: CARD_WIDTH,
    height: CARD_WIDTH * 1.35,
    borderRadius: 18,
    overflow: 'hidden',
    backgroundColor: '#EAEAEA',
    position: 'relative',
  },
  cardImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  viewerBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  viewerText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
  liveBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF2B44',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    gap: 4,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FFFFFF',
  },
  liveText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  cardBottomOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.28)',
  },
  userInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  avatarWrapper: {
    position: 'relative',
    marginRight: 6,
  },
  avatarImage: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
  flagEmoji: {
    position: 'absolute',
    bottom: -2,
    right: -4,
    fontSize: 9,
  },
  userName: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
    flex: 1,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  followButton: {
    backgroundColor: '#E4F800',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  followButtonText: {
    color: '#111111',
    fontSize: 11,
    fontWeight: '800',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
  },
  emptyText: {
    fontSize: 14,
    color: '#888888',
    fontWeight: '600',
  },
});