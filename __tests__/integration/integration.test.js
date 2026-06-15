import TestRenderer from 'react-test-renderer';

import JournalScreen from '../../screens/JournalScreen';
import RestaurantDetailsScreen from '../../screens/RestaurantDetailsScreen';

const safeStringify = (obj) => {
  const seen = new WeakSet();
  return JSON.stringify(obj, (key, value) => {
    if (typeof value === "object" && value !== null) {
      if (seen.has(value)) return "[Circular]";
      seen.add(value);
    }
    return value;
  });
};

jest.mock('../../theme', () => ({
  useTheme: () => ({
    colors: {
      background: '#121212',
      surface: '#1E1E1E',
      card: '#242424',
      text: '#FFFFFF',
      muted: '#A0A0A0',
      accent: '#FF4500',
      border: '#333333',
      borderAlt: '#444444',
      success: '#4CAF50',
      danger: '#F44336',
      overlay: 'rgba(0, 0, 0, 0.7)'
    },
    dark: true
  }),
  ThemeProvider: ({ children }) => <>{children}</>
}));

jest.mock('@expo/vector-icons', () => ({
  Ionicons: 'Ionicons'
}));

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useFocusEffect: (cb) => cb(), 
  useNavigation: () => ({ navigate: jest.fn() })
}));

jest.mock('expo-video', () => ({
  useVideoPlayer: jest.fn(() => ({ play: jest.fn(), loop: true, muted: true })),
  VideoView: 'VideoView'
}));

jest.mock('expo-image', () => ({
  Image: 'Image'
}));

jest.mock('../../viewmodels/useRestaurantDetailsViewModel', () => ({
  useRestaurantDetailsViewModel: () => ({
    isFav: false,
    history: [],
    menu: [{ id: 1, name: 'Pizza Margherita', price: '35' }],
    videoSource: null,
    toggleFavorite: jest.fn(),
    openLink: jest.fn()
  })
}));

jest.mock('../../viewmodels/useJournalViewModel', () => ({
  useJournalViewModel: () => ({
    stats: { discovered: 10, total: 50, percent: 20 },
    loadData: jest.fn(),
    sortBy: 'newest',
    setSortBy: jest.fn(),
    displayedVisits: [], 
    availableCompanions: ['Janek', 'Kasia'],
    selectedCompanionsFilter: [],
    toggleCompanionFilter: jest.fn()
  })
}));

const mockNavigate = jest.fn();
const mockNavigation = { navigate: mockNavigate };

describe('YumTam - Testy Integracyjne Interfejsu (Cross-Boundary)', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockRestaurant = { 
    id: 1, 
    name: 'Sushi Kofuku', 
    rating: 4.8, 
    reviews_count: 120,
    rel_categories: 'Japońska',
    address: 'Rynek 1'
  };

  it('TEST 1: Renderowanie danych z parametru trasy (Route Params) i ViewModelu', () => {
    let view;
    TestRenderer.act(() => {
      view = TestRenderer.create(<RestaurantDetailsScreen route={{ params: { restaurant: mockRestaurant } }} navigation={mockNavigation} />);
    });
    
    const virtualDOM = safeStringify(view.toJSON());

    expect(virtualDOM).toContain('Sushi Kofuku');
    expect(virtualDOM).toContain('4.8');
    expect(virtualDOM).toContain('Pizza Margherita');
  });

  it('TEST 2: Integracja Nawigacji - Przycisk "Dodaj wspomnienie" otwiera formularz', () => {
    let view;
    TestRenderer.act(() => {
      view = TestRenderer.create(<RestaurantDetailsScreen route={{ params: { restaurant: mockRestaurant } }} navigation={mockNavigation} />);
    });

    const clickableElements = view.root.findAll(node => node.props && typeof node.props.onPress === 'function');
    
    TestRenderer.act(() => {
      clickableElements.forEach(element => {
          try { element.props.onPress(); } catch(e) {}
      });
    });

    expect(mockNavigate).toHaveBeenCalledWith('AddVisit', { restaurant: mockRestaurant });
  });

  it('TEST 3: Renderowanie stanu pustego i integracja kart statystyk', () => {
    let view;
    TestRenderer.act(() => {
      view = TestRenderer.create(<JournalScreen navigation={mockNavigation} />);
    });
    
    const virtualDOM = safeStringify(view.toJSON());

    expect(virtualDOM).toContain('Brak wizyt w dzienniku.');
    expect(virtualDOM).toContain('Najnowsze');
    expect(virtualDOM).toContain('A-Z');
  });

  it('TEST 4: Rozwijanie filtru znajomych wyświetla dynamiczne "chipy"', () => {
    let view;
    TestRenderer.act(() => {
      view = TestRenderer.create(<JournalScreen navigation={mockNavigation} />);
    });
    
    expect(safeStringify(view.toJSON())).not.toContain('Janek');

    const clickableElements = view.root.findAll(node => node.props && typeof node.props.onPress === 'function');
    
    TestRenderer.act(() => {
      clickableElements.forEach(element => {
          try { element.props.onPress(); } catch(e) {}
      });
    });

    expect(safeStringify(view.toJSON())).toContain('Janek');
    expect(safeStringify(view.toJSON())).toContain('Kasia');
  });

  it('TEST 5: UI wyświetla błąd walidacji przy braku oceny', () => {
    jest.doMock('../../viewmodels/useAddVisitViewModel', () => ({
      useAddVisitViewModel: () => ({
        note: '', setNote: jest.fn(),
        rating: 0, setRating: jest.fn(), 
        availableCompanions: [], selectedCompanions: [], companionSearchText: '', 
        images: [], audioUri: null, recording: false,
        handleSave: jest.fn()
      })
    }));

    const AddVisitScreenDynamic = require('../../screens/AddVisitScreen').default;
    
    let view;
    TestRenderer.act(() => {
      view = TestRenderer.create(<AddVisitScreenDynamic route={{ params: { restaurant: mockRestaurant } }} navigation={mockNavigation} />);
    });

    const virtualDOM = safeStringify(view.toJSON());
    expect(virtualDOM).toContain('Wymagana ocena');
  });
});