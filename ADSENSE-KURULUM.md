# PC Darboğaz Lab V4 — AdSense kurulum notu

Bu paket AdSense başvurusu öncesi içerik ve güven sayfalarını hazırlar; gerçek reklam kodunu bilerek eklemez.

## Başvurudan önce
1. `iletisim.html` içindeki örnek e-posta satırını gerçek iletişim adresinle değiştir.
2. Siteyi GitHub Pages'e yükle ve tüm sayfaların açıldığını kontrol et.
3. Google Search Console'da güncel `sitemap.xml` dosyasını yeniden gönder.
4. AdSense hesabında siteyi ekle.
5. Onay sonrasında verilen `ca-pub-...` kodunu kullan.
6. AdSense'in önerdiği `ads.txt` satırını sitenin kökünde `/ads.txt` olarak yayınla.
7. EEA, Birleşik Krallık ve İsviçre trafiği için Google tarafından sertifikalı CMP kullan. AdSense > Privacy & messaging üzerinden Google CMP tercih edilebilir.

## Reklam yerleri
Ana sayfada iki adet `adsense-slot` alanı hazırlandı:
- Ana analiz bölümünden sonra
- Karşılaştırmalar bölümünden sonra

Rehberler sayfasında da içerik içi reklam alanları bulunur. Onay öncesinde bunlar yalnızca yer tutucudur.

## Önemli
Gizlilik ve çerez metinleri genel site metinleridir; hukuki danışmanlık değildir. Kullandığın gerçek analiz, reklam ve üçüncü taraf hizmetlerine göre güncelle.
