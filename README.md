
<img width="1439" height="771" alt="Screenshot_4" src="https://github.com/user-attachments/assets/1075d760-cb0a-41bf-90f3-2b627a283f11" />

# PlayCount (PlayScout)

Next.js + React + TypeScript uygulaması. Oyun arama, filtreleme, favorilere ekleme/yönetme ve oyun detayları için dialog tabanlı modal özelliği sunar.

## 🚀 Öne çıkan özellikler

- Oyun arama (isim ile)
- Kategori filtreleme (çoklu seçilebilir toggle kartlar)
- Platform filtreleme (seçmeli)
- Sıralama (Çok oyunculu, tek oyunculu, çıkış tarihi vb.)
- Sayfalama (pagination)
- Favori oyunlar (Zustand + persist ile localStorage korunumu)
- Oyun detayları modal (Dialog) ve sürekli Gürültü (skeleton, boş durum)
- API yönlendirme: `app/api/games/route.ts`

## 📁 Proje yapısı

- `app/page.tsx`: ana oyun listesi sayfası
- `app/favorites/page.tsx`: favoriler sayfası
- `app/game/[id]/page.tsx`: (opsiyonel / artık dialog kullanılıyor)
- `components/game`: `GameGrid`, `GameCard`, `GameDialog`, `GameDetails` vb.
- `components/filters`: `SearchBar`, `CategoryFilter`, `PlatformFilter`, `SortFilter`
- `store/favorites.store.ts`: zustand favoriler store
- `services/games.service.ts`: API istekleri
- `utils/api.ts`: fetch wrapper

## 🛠️ Kurulum ve çalıştırma

```bash
cd playcount
npm install
npm run dev
```

Tarayıcıda `http://localhost:3000` açın.

## 🔍 Test ve tip kontrol

```bash
npm run lint
npm run format
npm run typecheck
npm run build
```

## 🧩 API

- `GET /api/games` - oyunları listeler (proxy / data kaynak)
- `GET /api/game/:id` - oyun detayını getirir (`GameDialog` için)

## 🖼️ Ürün akışı

1. Ana sayfada arama ve filtreler ile oyunları süz.
2. `GameCard` üzerinde `Details` butonu ile modal aç.
3. Favori eklemek için kalp ikonuna tıkla.
4. `Favorites` sayfasında toplanmış favorilere ulaş.

## 📌 Notlar

- Projeyi istediğiniz gibi genişletmek için shadcn/ui düğümleri ve Radix primitives kullanılmaktadır.
- Mevcut implementasyon `data.filter is not a function` hatası için `GameGrid` içinde güvenli filtre kontrolü sağladı.

