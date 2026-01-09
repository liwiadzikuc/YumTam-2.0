# YumTam - Twoj osobisty przewodnik kulinarny

YumTam to nowoczesna aplikacja mobilna stworzona w technologii React Native, zaprojektowana z mysla o mieszkancach i turystach odkrywajacych kulinarna mapę Wroclawia.

Aplikacja laczy w sobie funkcje interaktywnego przewodnika z osobistym dziennikiem wspomnien. YumTam zmienia zwykle wyjscie do restauracji w gre terenowa – Twoim celem jest "zazielenienie" mapy poprzez odwiedzanie nowych miejsc, ocenianie ich i budowanie wlasnej bazy ulubionych lokali. To narzedzie, ktore raz na zawsze rozwiazuje dylemat "Gdzie dzisiaj zjesc?", oferujac inteligentne sugestie oparte na Twojej historii.

## Glowne Funkcjonalnosci

### 1. Mapa Odkrywcy (Discover)
Serce aplikacji stanowi interaktywna mapa, ktora zyje razem z uzytkownikiem. To nie jest zwykla lista punktow – to wizualizacja Twoich kulinarnych podbojow.

- **Inteligentna nawigacja i filtry**: Szybkie wyszukiwanie lokali spelniajacych konkretne kryteria: kategoria kuchni (np. wloska, meksykanska), dostepnosc oferty lunchowej czy cena piwa.
- **Wizualny status miejsc**: System kolorow, ktory pozwala na pierwszy rzut oka ocenic status lokalu:
  - **Zielony (Odwiedzone)**: Miejsca, w ktorych juz byles i dodales wpis w dzienniku.
  - **Niebieski (Ulubione / Planowane)**: Twoja osobista "wishlista" – lokale, ktore chcesz odwiedzic w najblizszym czasie.
  - **Pomaranczowy (Nieodkryte)**: Restauracje, ktore czekaja na Twoja wizyte.
- **Inteligentna Losowarka**: Funkcja dla niezdecydowanych. Algorytm losuje miejsce na posilek, dajac priorytet lokalom oznaczonym jako "Nieodkryte", co zacheca do poznawania nowych smaków zamiast chodzenia w kolko do tych samych miejsc.
- **Kompletne informacje**: Kazda wizytowka lokalu zawiera menu z cenami, zdjecia, oceny oraz bezposrednie przekierowania do nawigacji Google Maps i profilu na Instagramie.

### 2. Dziennik Smakosza (Journal)
Twoja prywatna ksiega wspomnien. Zamiast zapominac, gdzie jadles najlepsza pizze rok temu, zapisz to w YumTam.

- **Szczegolowe wspomnienia**: Do kazdej wizyty mozesz dodac wlasne zdjecie potrawy, ocene w skali 1-5 gwiazdek, notatke tekstowa oraz liste osob towarzyszacych.
- **Grywalizacja i Statystyki**: Aplikacja motywuje do dzialania poprzez pasek postepu, ktory pokazuje, jaki procent wroclawskiej sceny gastronomicznej juz odkryles.
- **Zaawansowane sortowanie**: Przegladaj swoje wpisy w sposob, ktory Ci odpowiada – od najnowszych, wedlug najlepszych ocen (by szybko polecic cos znajomym) lub alfabetycznie.
- **Pelna synchronizacja**: Dziennik jest scisle polaczony z Mapa. Dodanie recenzji w Dzienniku natychmiast zmienia status pinezki na Mapie na "Odwiedzone" (kolor zielony).

## Stack Technologiczny

Projekt zostal zrealizowany przy uzyciu nowoczesnych standardow tworzenia aplikacji mobilnych, z naciskiem na wydajnosc i skalowalnosc.

- **React Native & Expo**: Fundament aplikacji, zapewniajacy natywna wydajnosc na systemach Android oraz iOS przy uzyciu jednej bazy kodu.
- **React Navigation**: Zlozona struktura nawigacyjna laczaca dolny pasek (Bottom Tabs) z nawigacja stosowa (Stack) dla plynego przechodzenia miedzy ekranami mapy, szczegolow i formularzy.
- **Context API**: Architektura zarzadzania stanem aplikacji. Zapewnia "jedno zrodlo prawdy" dla danych, dzieki czemu zmiany w Dzienniku sa natychmiast widoczne na Mapie i odwrotnie, bez potrzeby przeladowywania aplikacji.
- **AsyncStorage**: Implementacja trwalej pamieci podrecznej (persistence). Wszystkie dane uzytkownika (wizyty, ulubione) sa bezpiecznie przechowywane lokalnie na urzadzeniu i dostepne offline.
- **React Native Maps**: Integracja z natywnymi modulami map (Google Maps na Androidzie / Apple Maps na iOS) z obsluga niestandardowych markerow i animacji kamery.

## Wymagania wstepne

Aby uruchomic projekt, potrzebujesz zainstalowanych nastepujacych narzedzi:

- **Node.js**: Srodowisko uruchomieniowe JavaScript (zalecana wersja LTS). Mozna pobrac ze strony nodejs.org.
- **Git**: System kontroli wersji (przydatny do pobrania projektu).
- **Aplikacja Expo Go**: Do pobrania ze sklepu Google Play (Android) lub App Store (iOS) na Twoim telefonie.

## Instalacja i uruchomienie

Postepuj zgodnie z ponizszymi krokami, aby uruchomic aplikacje na swoim urzadzeniu.

1. Otworz terminal (konsole) i sklonuj repozytorium na swoj dysk:

```bash
git clone https://github.com/mleczako/YumTam.git
```

2. Nastepnie wejdz do katalogu projektu (to bardzo wazne, zebys byl w srodku folderu przed wpisywaniem kolejnych komend):

```bash
cd YumTam
```

3. Zainstaluj biblioteki. Wpisz ponizsza komende, aby automatycznie pobrac i zainstalowac wszystkie zaleznosci wymienione w pliku package.json (np. React Navigation, Mapy):

```bash
npm install
```
Uwaga: Ten proces moze potrwac kilka minut. Poczekaj, az pasek postepu dojdzie do konca.

4. Uruchom serwer deweloperski. Gdy instalacja dobiegnie konca, wpisz:

```bash
npx expo start
```
5. Uruchom na telefonie. Po wpisaniu powyzszej komendy w terminalu pojawi sie duzy kod QR.

- Upewnij sie, ze Twoj telefon i komputer sa podlaczone do tej samej sieci Wi-Fi.

- Otworz aplikacje Expo Go na telefonie.

- Android: Wybierz opcje "Scan QR Code" na ekranie glownym aplikacji i zeskanuj kod z terminala.

- iOS: Otworz systemowa aplikacje Aparat (Camera), nakieruj na kod QR i kliknij w powiadomienie "Otwórz w Expo Go", ktore sie pojawi.

6. Aplikacja powinna sie zbudowac i automatycznie uruchomic na Twoim ekranie.