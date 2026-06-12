import { Alert } from 'react-native';
import { act, create } from 'react-test-renderer';
import { VisitModel } from '../../models/VisitModel';
import { useAddVisitViewModel } from '../../viewmodels/useAddVisitViewModel';

jest.mock('../../models/VisitModel');

jest.mock('expo-file-system/legacy', () => ({
  documentDirectory: 'file:///mock/sejfon/dokumenty/',
  copyAsync: jest.fn(),
}));
jest.mock('expo-image-picker', () => ({
  requestMediaLibraryPermissionsAsync: jest.fn(),
  launchImageLibraryAsync: jest.fn(),
}));
jest.mock('expo-av', () => ({
  Audio: { requestPermissionsAsync: jest.fn() }
}));

describe('Testy useAddVisitViewModel', () => {
  let result;
  
  const mockNavigation = { popToTop: jest.fn() };
  const mockRestaurant = { id: 99, name: 'Burger King' }; 

  function HookWrapper() {
    result = useAddVisitViewModel(mockRestaurant, mockNavigation);
    return null;
  }

  beforeEach(() => {
    jest.clearAllMocks();
    result = null;
    
    jest.spyOn(Alert, 'alert').mockImplementation(() => {});
    
    VisitModel.getAllCompanions.mockResolvedValue([{ name: 'Kasia' }, { name: 'Marek' }]);
  });

  it('TEST 1: zarządzanie companions', async () => {
    await act(async () => { create(<HookWrapper />); });

    await act(async () => {
      await Promise.resolve(); 
    });

    act(() => { result.toggleCompanion('Kasia'); });
    expect(result.selectedCompanions).toContain('Kasia');

    act(() => { result.toggleCompanion('Kasia'); });
    expect(result.selectedCompanions.length).toBe(0);
  });

  it('TEST 2: tworzenie nowego companion', async () => {
    await act(async () => { create(<HookWrapper />); });

    act(() => { result.setCompanionSearchText('   Adam   '); });
    
    act(() => { result.addNewCompanion(); });

    expect(result.selectedCompanions).toContain('Adam');
    expect(result.availableCompanions).toContain('Adam');
    expect(result.companionSearchText).toBe('');
  });

  it('TEST 3: zapis zablokowany bez podania oceny', async () => {
    await act(async () => { create(<HookWrapper />); });

    await act(async () => { await result.handleSave(); });

    expect(Alert.alert).toHaveBeenCalledWith("Wymagana ocena", expect.any(String));
    
    expect(VisitModel.create).not.toHaveBeenCalled();
  });

  it('TEST 4: zapis do bazy z cofnięciem ekranu', async () => {
    await act(async () => { create(<HookWrapper />); });

    VisitModel.create.mockResolvedValue(101);

    act(() => { 
      result.setRating(4.5); 
      result.setNote('Pyszne frytki!');
      result.toggleCompanion('Kasia');
    });

    await act(async () => { await result.handleSave(); });

    expect(VisitModel.create).toHaveBeenCalledWith(
      99, 
      4.5, 
      'Pyszne frytki!', 
      expect.any(String), 
      ['Kasia']
    );

    expect(Alert.alert).toHaveBeenCalledWith("Sukces", "Wspomnienie zapisane!");

    expect(mockNavigation.popToTop).toHaveBeenCalled();
  });
});