import { act, create } from 'react-test-renderer';
import StatsCard from '../../components/StatsCard';

jest.mock('react-native', () => {
  return {
    StyleSheet: { create: (obj) => obj },
    View: 'View',
    Text: 'Text'
  };
});

jest.mock('../../theme', () => ({
  useTheme: () => ({
    colors: { accent: '#FFA500', surface: '#FFFFFF' },
    mode: 'light'
  })
}));

describe('Testy StatsCard', () => {
  it('TEST 1: wyświetlanie liczb i ułamków', () => {
    let tree;
    act(() => { 
      tree = create(<StatsCard discovered={5} total={10} percent={50} />); 
    });
    
    const stringifiedTree = JSON.stringify(tree.toJSON());

    expect(stringifiedTree).toContain('"5"," / ","10"');
    expect(stringifiedTree).toContain('"50","% postępu"');
  });

  it('TEST 2: szerokość paseka postępu', () => {
    let tree;
    act(() => { 
      tree = create(<StatsCard discovered={3} total={10} percent={33} />); 
    });
    
    const stringifiedTree = JSON.stringify(tree.toJSON());

    expect(stringifiedTree).toContain('"width":"33%"');
  });
});