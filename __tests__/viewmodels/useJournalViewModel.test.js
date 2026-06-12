import { act, create } from 'react-test-renderer';
import { RestaurantModel } from '../../models/RestaurantModel';
import { VisitModel } from '../../models/VisitModel';
import { useJournalViewModel } from '../../viewmodels/useJournalViewModel';

jest.mock('../../models/VisitModel');
jest.mock('../../models/RestaurantModel');

const mockVisits = [
  { id: 1, resName: 'Zahir Kebab', rating: 3.0, companions: 'Marek' },
  { id: 2, resName: 'Pasibus', rating: 5.0, companions: 'Kasia, Marek' },
  { id: 3, resName: 'KFC', rating: 2.0, companions: null }, 
  { id: 4, resName: 'Ragu Pasteria', rating: 4.5, companions: 'Kasia' },
];

describe('Testy useJournalViewModel', () => {
  let result;

  function HookWrapper() {
    result = useJournalViewModel();
    return null;
  }

  beforeEach(() => {
    jest.clearAllMocks();
    result = null;
    VisitModel.getAllWithMedia.mockResolvedValue(mockVisits);
    RestaurantModel.getStats.mockResolvedValue({ total: 20, discovered: 4, percent: 20 });
  });

  it('TEST 1: poprawne załadowanie wizyt i statystyk', async () => {
    let root;
    act(() => { root = create(<HookWrapper />); });

    await act(async () => { await result.loadData(); });

    expect(result.stats.percent).toBe(20);
    expect(result.stats.discovered).toBe(4);
    expect(result.displayedVisits.length).toBe(4);
  });

  it('TEST 2: companions - ignoruje null, dzieli przecinkiem i sortuje (A-Z)', async () => {
    act(() => { create(<HookWrapper />); });
    await act(async () => { await result.loadData(); });

    expect(result.availableCompanions).toEqual(['Kasia', 'Marek']);
  });

  it('TEST 3: sortowanie po ocenie od najwyższej', async () => {
    act(() => { create(<HookWrapper />); });
    await act(async () => { await result.loadData(); });

    act(() => { result.setSortBy('rating'); });

    expect(result.displayedVisits[0].resName).toBe('Pasibus');
    expect(result.displayedVisits[1].resName).toBe('Ragu Pasteria');
    expect(result.displayedVisits[3].resName).toBe('KFC');
  });

  it('TEST 4: sortowanie alfabetyczne restauracji', async () => {
    act(() => { create(<HookWrapper />); });
    await act(async () => { await result.loadData(); });

    act(() => { result.setSortBy('alpha'); });

    expect(result.displayedVisits[0].resName).toBe('KFC');
    expect(result.displayedVisits[3].resName).toBe('Zahir Kebab');
  });

  it('TEST 5: filtr logiczny na companions', async () => {
    act(() => { create(<HookWrapper />); });
    await act(async () => { await result.loadData(); });

    act(() => {
      result.toggleCompanionFilter('Kasia');
      result.toggleCompanionFilter('Marek');
    });

    expect(result.displayedVisits.length).toBe(1);
    expect(result.displayedVisits[0].resName).toBe('Pasibus');
  });
});