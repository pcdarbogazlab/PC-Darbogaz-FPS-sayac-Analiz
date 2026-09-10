# PC Darboğaz Lab v3.3

PC Darboğaz Lab; CPU, GPU, RAM, çözünürlük ve oyun profiline göre sistem dengesini değerlendiren statik bir web uygulamasıdır.

## Özellikler
- CPU/GPU darboğaz ve sistem dengesi analizi
- Tahmini FPS aralığı
- CPU, GPU ve anakart karşılaştırması
- Her iki karşılaştırma tarafı için bağımsız arama kutuları
- CPU + anakart + RAM temel uyumluluk kontrolü
- Paylaşılabilir analiz bağlantısı
- Geniş CPU / GPU / anakart veri tabanı
- Kaynaklı benchmark katmanı
- SEO için kalıcı karşılaştırma ve darboğaz sayfaları
- GitHub Pages uyumlu, tamamen statik yapı

## Veri yaklaşımı
Site iki farklı veri türünü ayrı tutar:
1. **PC Darboğaz Lab tahmini modeli:** Oyun, çözünürlük ve donanım skorlarından yaklaşık sonuç üretir.
2. **Harici kaynaklı benchmark:** Desteklenen modellerde bağımsız benchmark kaynağından alınan özet sonuçlar gösterilir.

Harici benchmark kaynakları `js/benchmark-data.js` içinde kaynak URL ve güncelleme tarihi ile tutulur.

## Dosya yapısı
- `index.html`
- `css/style.css`
- `js/data.js`
- `js/benchmark-data.js`
- `js/app.js`
- `assets/`
- `karsilastir/`
- `darbogaz/`
- `robots.txt`
- `sitemap.xml`

## Canlı site
https://pcdarbogazlab.github.io/PC-Darbogaz-FPS-sayac-Analiz/

## Not
Darboğaz tek ve evrensel bir yüzde değildir. Sonuçlar oyun, çözünürlük, grafik ayarları, sürücüler, RAM, sıcaklıklar ve hedef FPS'e göre değişebilir.
