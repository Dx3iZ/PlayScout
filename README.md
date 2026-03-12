
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


This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


## 📌 Notlar

- Projeyi istediğiniz gibi genişletmek için shadcn/ui düğümleri ve Radix primitives kullanılmaktadır.
- Mevcut implementasyon `data.filter is not a function` hatası için `GameGrid` içinde güvenli filtre kontrolü sağladı.

