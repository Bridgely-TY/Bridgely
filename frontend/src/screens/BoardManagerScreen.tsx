import { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

import BrandLogo from '../components/BrandLogo';
import { getBoards } from '../api/mockApi';
import { ScreenProps } from '../navigation/types';
import { colors } from '../theme/colors';
import { Board } from '../types';

export default function BoardManagerScreen({
  navigation,
}: ScreenProps<'BoardManager'>) {
  const { width } = useWindowDimensions();
  const [boards, setBoards] = useState<Board[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const horizontalPadding = width < 420 ? 18 : 28;

  useFocusEffect(
    useCallback(() => {
      let active = true;
      setLoading(true);
      setError('');
      getBoards()
        .then((result) => {
          if (active) setBoards(result);
        })
        .catch(() => {
          if (active) setError('We could not load the boards. Please try again.');
        })
        .finally(() => {
          if (active) setLoading(false);
        });

      return () => {
        active = false;
      };
    }, []),
  );

  return (
    <SafeAreaView style={styles.safe}>
      <View style={[styles.topBar, { paddingHorizontal: horizontalPadding }]}>
        <Pressable
          onPress={() => navigation.goBack()}
          accessibilityRole="button"
          accessibilityLabel="Back to settings"
          style={({ pressed }) => [styles.backButton, pressed && styles.pressed]}
        >
          <MaterialCommunityIcons name="chevron-left" size={24} color={colors.textPrimary} />
        </Pressable>
        <Text style={styles.topTitle}>Edit Boards</Text>
        <View style={styles.brand}>
          <BrandLogo size={30} />
          <Text style={styles.brandText}>bridgely</Text>
        </View>
      </View>

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.loadingText}>Loading boards...</Text>
        </View>
      ) : (
        <FlatList
          data={boards}
          keyExtractor={(board) => board.id}
          contentContainerStyle={[
            styles.content,
            { paddingHorizontal: horizontalPadding },
          ]}
          ListHeaderComponent={
            <View>
              <Text style={styles.title}>Communication Boards</Text>
              <Text style={styles.subtitle}>
                Select a board to update its layout, visibility, and communication cells.
              </Text>
              {!!error && (
                <Text accessibilityRole="alert" style={styles.error}>
                  {error}
                </Text>
              )}
            </View>
          }
          renderItem={({ item }) => <BoardCard board={item} onPress={() =>
            navigation.navigate('BoardEditor', { boardId: item.id })
          } />}
          ListEmptyComponent={
            <View style={styles.empty}>
              <MaterialCommunityIcons
                name="view-grid-plus-outline"
                size={42}
                color={colors.textMuted}
              />
              <Text style={styles.emptyTitle}>No boards yet</Text>
              <Text style={styles.emptyText}>Create the first communication board.</Text>
            </View>
          }
          ListFooterComponent={
            <Pressable
              onPress={() => navigation.navigate('BoardEditor', {})}
              accessibilityRole="button"
              style={({ pressed }) => [styles.addButton, pressed && styles.pressed]}
            >
              <MaterialCommunityIcons name="plus" size={22} color={colors.onPrimary} />
              <Text style={styles.addButtonText}>Create New Board</Text>
            </Pressable>
          }
        />
      )}
    </SafeAreaView>
  );
}

function BoardCard({ board, onPress }: { board: Board; onPress: () => void }) {
  const hiddenCount = board.cells.filter((cell) => cell.hidden).length;

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`Edit ${board.name}, ${board.gridSize}, ${board.cells.length} cells`}
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
    >
      <View style={styles.icon}>
        <MaterialCommunityIcons
          name={board.isUrgent ? 'alert-circle-outline' : 'view-grid-outline'}
          size={27}
          color={board.isUrgent ? colors.helperAlert : colors.accentBlue}
        />
      </View>
      <View style={styles.cardCopy}>
        <View style={styles.cardTitleRow}>
          <Text numberOfLines={1} style={styles.cardTitle}>{board.name}</Text>
          {board.isStarter && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>Starter</Text>
            </View>
          )}
        </View>
        <Text style={styles.cardMeta}>
          {board.gridSize} grid · {board.cells.length} cells
          {hiddenCount > 0 ? ` · ${hiddenCount} hidden` : ''}
        </Text>
      </View>
      <View style={styles.editCircle}>
        <MaterialCommunityIcons name="pencil-outline" size={20} color={colors.primary} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  topBar: {
    minHeight: 62,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backButton: {
    width: 42,
    height: 42,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    backgroundColor: colors.card,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topTitle: {
    position: 'absolute',
    left: 0,
    right: 0,
    textAlign: 'center',
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: '800',
  },
  brand: { marginLeft: 'auto', flexDirection: 'row', alignItems: 'center', gap: 5 },
  brandText: { color: colors.textPrimary, fontSize: 12, fontWeight: '800' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 },
  loadingText: { color: colors.textSecondary, fontSize: 15 },
  content: {
    width: '100%',
    maxWidth: 760,
    alignSelf: 'center',
    paddingTop: 28,
    paddingBottom: 40,
  },
  title: {
    color: colors.textPrimary,
    fontSize: 28,
    fontWeight: '800',
    textAlign: 'center',
  },
  subtitle: {
    color: colors.textSecondary,
    fontSize: 14,
    lineHeight: 21,
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 24,
  },
  error: { color: colors.helperAlert, fontSize: 14, fontWeight: '600', marginBottom: 14 },
  card: {
    minHeight: 94,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    padding: 16,
    marginBottom: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  cardPressed: { opacity: 0.72, transform: [{ scale: 0.995 }] },
  icon: {
    width: 52,
    height: 52,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.stepBadgeBg,
  },
  cardCopy: { flex: 1 },
  cardTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  cardTitle: { color: colors.textPrimary, fontSize: 17, fontWeight: '800', flexShrink: 1 },
  cardMeta: { color: colors.textSecondary, fontSize: 13, marginTop: 5 },
  badge: {
    backgroundColor: colors.selectedCardBg,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  badgeText: { color: colors.selectedCardText, fontSize: 10, fontWeight: '800' },
  editCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 1,
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  empty: {
    alignItems: 'center',
    padding: 34,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: colors.inputBorder,
    borderRadius: 20,
  },
  emptyTitle: { color: colors.textPrimary, fontSize: 17, fontWeight: '800', marginTop: 10 },
  emptyText: { color: colors.textSecondary, fontSize: 14, marginTop: 4 },
  addButton: {
    minHeight: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 12,
    borderRadius: 18,
    backgroundColor: colors.primary,
  },
  addButtonText: { color: colors.onPrimary, fontSize: 16, fontWeight: '800' },
  pressed: { opacity: 0.72 },
});
