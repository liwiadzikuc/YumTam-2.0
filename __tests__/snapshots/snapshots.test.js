import TestRenderer from 'react-test-renderer';

import DiscoverScreen from '../../screens/DiscoverScreen';
import JournalScreen from '../../screens/JournalScreen';
import RestaurantDetailsScreen from '../../screens/RestaurantDetailsScreen';

const safeStringify = (obj) => {
  const seen = new WeakSet();
  return JSON.stringify(obj, (key, value) => {
    const ignoredKeys = [
      'actualDuration', 'actualStartTime', 'treeBaseDuration', 'selfBaseDuration',
      '_debugOwner', '_debugStack', '_debugTask', '_debugNeedsRemount', 
      '_debugHookTypes', '_debugInfo', 'lanes', 'childLanes', 'subtreeFlags', 
      'flags', 'updateQueue', 'stateNode', 'dependencies', 'alternate'
    ];
    
    if (ignoredKeys.includes(key)) {
      return undefined; 
    }
    if (typeof value === "object" && value !== null) {
      if (seen.has(value)) return "[Circular]";
      seen.add(value);
    }
    
    return value;
  });
};

jest.mock('../../theme', () => ({
  useTheme: () => ({
    colors: { background: '#121212', text: '#FFFFFF', accent: '#FF4500' }, dark: true
  }),
  ThemeProvider: ({ children }) => <>{children}</>
}));

jest.mock('@expo/vector-icons', () => ({ Ionicons: 'Ionicons' }));
jest.mock('@react-navigation/native', () => ({
  useFocusEffect: (cb) => cb(), 
  useNavigation: () => ({ navigate: jest.fn() })
}));
jest.mock('expo-video', () => ({ useVideoPlayer: jest.fn(), VideoView: 'VideoView' }));
jest.mock('expo-image', () => ({ Image: 'Image' }));

jest.mock('react-native-maps', () => {
  const { View } = require('react-native');
  const MockMapView = (props) => <View {...props} testID="mock-map-view" />;
  MockMapView.Marker = (props) => <View {...props} testID="mock-marker" />;
  MockMapView.Callout = (props) => <View {...props} testID="mock-callout" />;
  return MockMapView;
});

jest.mock('expo-sqlite', () => ({
  openDatabaseSync: jest.fn(() => ({
    execSync: jest.fn(),
    runAsync: jest.fn(),
    getFirstAsync: jest.fn(),
    getAllAsync: jest.fn(),
    prepareSync: jest.fn(() => ({
      executeSync: jest.fn(() => ({
        getFirstSync: jest.fn(),
        getAllSync: jest.fn(() => []),
      })),
      finalizeSync: jest.fn()
    })),
  })),
  openDatabaseAsync: jest.fn(() => Promise.resolve({
    execAsync: jest.fn(),
  })),
}));

jest.mock('drizzle-orm/expo-sqlite', () => ({
  drizzle: jest.fn(() => ({
    select: jest.fn().mockReturnThis(),
    from: jest.fn().mockReturnThis(),
    where: jest.fn().mockReturnThis(),
    limit: jest.fn().mockReturnThis(),
    orderBy: jest.fn().mockReturnThis(),
    insert: jest.fn().mockReturnThis(),
    values: jest.fn().mockReturnThis(),
    set: jest.fn().mockReturnThis(),
    execute: jest.fn().mockResolvedValue([]),
    all: jest.fn().mockResolvedValue([]),
  }))
}));

jest.mock('../../viewmodels/useDiscoverViewModel', () => ({
  useDiscoverViewModel: () => ({
    searchText: '', 
    setSearchText: jest.fn(),
    selectedCategories: [], 
    setSelectedCategories: jest.fn(), 
    isCheapBeer: false, 
    setIsCheapBeer: jest.fn(),
    hasLunch: false, 
    setHasLunch: jest.fn(),
    
    UNIQUE_CATEGORIES: ['Burgery', 'Pizza', 'Sushi'], 
    displayedRestaurants: [{ id: 1, name: 'Burger King', rating: 4.2 }],
    visitedIds: [1],
    
    modalVisible: false, 
    setModalVisible: jest.fn(),
    isListView: false, 
    setIsListView: jest.fn(),
    selectedRestaurant: null, 
    setSelectedRestaurant: jest.fn(),
    
    mapCenter: { latitude: 51.107883, longitude: 17.038538 },
    hasLocationPermission: true,
    
    loadInitialData: jest.fn(),
    handleRandomize: jest.fn(),
  })
}));

jest.mock('../../viewmodels/useJournalViewModel', () => ({
  useJournalViewModel: () => ({
    stats: { discovered: 10, total: 50, percent: 20 },
    displayedVisits: [], 
    loadData: jest.fn(),
    availableCompanions: ['Janek'], 
    selectedCompanionsFilter: [], 
    toggleCompanionFilter: jest.fn()
  })
}));

jest.mock('../../viewmodels/useRestaurantDetailsViewModel', () => ({
  useRestaurantDetailsViewModel: () => ({
    isFav: false,
    history: [
      { id: 1, date: '2024-05-10', rating: 5, note: 'Najlepsze sushi w mieście!', companions: ['Kasia'] }
    ],
    menu: [{ id: 1, name: 'Zestaw Kofuku', price: '120' }],
    videoSource: null,
    toggleFavorite: jest.fn(),
    openLink: jest.fn()
  })
}));

describe('YumTam - Testy Migawkowe (Visual Regression Testing)', () => {
  
  beforeEach(() => {
    jest.useFakeTimers(); 
  });

  afterEach(() => {
    TestRenderer.act(() => { jest.runAllTimers(); });
    jest.useRealTimers();
  });

  const mockNavigation = { navigate: jest.fn() };

  it('Migawka 1: Ekran Odkrywania (DiscoverScreen)', () => {
    let view;
    TestRenderer.act(() => {
      view = TestRenderer.create(<DiscoverScreen navigation={mockNavigation} />);
    });
    
    const safeDOM = JSON.parse(safeStringify(view.toJSON()));
    expect(safeDOM).toMatchSnapshot();
  });

  it('Migawka 2: Ekran Dziennika w Stanie Pustym (JournalScreen)', () => {
    let view;
    TestRenderer.act(() => {
      view = TestRenderer.create(<JournalScreen navigation={mockNavigation} />);
    });
    
    const safeDOM = JSON.parse(safeStringify(view.toJSON()));
    expect(safeDOM).toMatchSnapshot();
  });

  it('Migawka 3: Ekran Szczegółów Restauracji (RestaurantDetailsScreen)', () => {
    const mockRestaurant = { name: 'Sushi Kofuku', rating: 4.8, address: 'Rynek 1' };
    
    let view;
    TestRenderer.act(() => {
      view = TestRenderer.create(
        <RestaurantDetailsScreen 
          route={{ params: { restaurant: mockRestaurant } }} 
          navigation={mockNavigation} 
        />
      );
    });
    
    const safeDOM = JSON.parse(safeStringify(view.toJSON()));
    expect(safeDOM).toMatchSnapshot();
  });

});