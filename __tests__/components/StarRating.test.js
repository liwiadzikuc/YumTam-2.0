import { act, create } from 'react-test-renderer';
import StarRating from '../../components/StarRating';

jest.mock('react-native', () => ({
  View: 'View',
  TouchableOpacity: 'TouchableOpacity'
}));

jest.mock('../../theme', () => ({
  useTheme: () => ({ colors: { accent: 'gold' } })
}));

jest.mock('@expo/vector-icons', () => ({
  Ionicons: 'Ionicons'
}));

describe('Testy StarRating', () => {
  
  it('TEST 1: algorytm gwiazdek', () => {
    let tree;
    act(() => { tree = create(<StarRating rating={3.5} />); });
    
    const icons = tree.root.findAllByType('Ionicons');
    const iconNames = icons.map(icon => icon.props.name);
    
    expect(iconNames).toEqual(['star', 'star', 'star', 'star-half', 'star-outline']);
  });

  it('TEST 2: tryb read-only ukrywa strefy dotykowe', () => {
    let tree;
    act(() => { tree = create(<StarRating rating={4} />); });
    
    const touchables = tree.root.findAllByType('TouchableOpacity');
    expect(touchables.length).toBe(0);
  });

  it('TEST 3: tryb interaktywny, wirtualne kliknięcie', () => {
    const mockOnRatingChange = jest.fn();
    let tree;
    act(() => { 
      tree = create(<StarRating rating={0} onRatingChange={mockOnRatingChange} />); 
    });
    
    const touchables = tree.root.findAllByType('TouchableOpacity');
    
    act(() => {
      touchables[3].props.onPress(); 
    });
    
    expect(mockOnRatingChange).toHaveBeenCalledWith(2);
  });
});