import { act, create } from 'react-test-renderer';
import VisitCard from '../../components/VisitCard';

jest.mock('react-native', () => ({
  StyleSheet: { create: (obj) => obj },
  View: 'View',
  Text: 'Text',
  TouchableOpacity: 'TouchableOpacity',
  Image: 'Image'
}));

jest.mock('../../theme', () => ({
  useTheme: () => ({
    colors: { accent: '#FFA500', surface: '#FFF', text: '#000', card: '#EEE', muted: '#888', borderAlt: '#DDD' }
  })
}));

jest.mock('@expo/vector-icons', () => ({ Ionicons: 'Ionicons' }));

jest.mock('../../components/StarRating', () => 'StarRating');

describe('VisitCard - Testy Komponentów Wizualnych i Warunkowych', () => {
  
  const mockFullVisit = {
    resName: 'KFC',
    visit_date: '12.06.2026',
    rating: 4.5,
    img: 'file:///fake/path/image.jpg',
    audioPath: 'file:///fake/path/audio.m4a',
    notes: 'Bardzo smaczne jedzenie'
  };

  const mockMinimalVisit = {
    resName: 'Zahir Kebab',
    visit_date: '13.06.2026',
    rating: 3.0
  };

  it('TEST 1: w pełni wypełniona karta', () => {
    let tree;
    act(() => { 
      tree = create(<VisitCard visit={mockFullVisit} onPress={() => {}} />); 
    });
    
    const stringifiedTree = JSON.stringify(tree.toJSON());

    expect(stringifiedTree).toContain('KFC');
    expect(stringifiedTree).toContain('Bardzo smaczne jedzenie');
    expect(stringifiedTree).toContain('Notatka'); 
    expect(stringifiedTree).toContain('Image'); 
  });

  it('TEST 2: karta bez zdjęcia ani głosówki', () => {
    let tree;
    act(() => { 
      tree = create(<VisitCard visit={mockMinimalVisit} onPress={() => {}} />); 
    });
    
    const stringifiedTree = JSON.stringify(tree.toJSON());

    expect(stringifiedTree).toContain('Zahir Kebab');
    
    expect(stringifiedTree).not.toContain('Notatka'); 
    expect(stringifiedTree).not.toContain('Image');   
  });

  it('TEST 3: karta reaguje na kliknięcie', () => {
    const mockOnPress = jest.fn();
    let tree;
    
    act(() => { 
      tree = create(<VisitCard visit={mockMinimalVisit} onPress={mockOnPress} />); 
    });
    
    const touchable = tree.root.findByType('TouchableOpacity');
    
    act(() => { 
      touchable.props.onPress(); 
    });
    
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });
});