/*
 * Turkish copy for the /tr/ section: the Türkiye country page, five topic pages
 * and the index.
 *
 * This lives in its own module for the same reason ar-content.ts does: Astro
 * hoists getStaticPaths out of component scope, so a const declared in a page's
 * frontmatter is invisible inside it. An import is not.
 *
 * Rules this file follows, deliberately:
 *  - Every regulatory line here renders a claim that already exists in the
 *    "turkey" entry of src/data/country-detail.ts. Nothing new is asserted. No
 *    rate, threshold, deadline, scheme, authority, provider or module name
 *    appears here unless it appears there first.
 *  - Turkish is keyed to the English source by a LEADING SUBSTRING of that
 *    source string, never by array index. If a source claim is reworded, the
 *    Turkish drops out of the page instead of being paired with the wrong fact.
 *    Silence beats a wrong pairing.
 *  - The "verified: false" qualifier is read from the data at render time and
 *    never copied into the Turkish, so it cannot drift.
 *  - No partner tier, certification, award, customer count, years of experience,
 *    team size or rating appears here or in any structured data built from it.
 *  - Delivery language is stated honestly: the page is Turkish, the project runs
 *    in English. src/data/site.ts lists English, Arabic and Urdu, so a claim of
 *    Turkish-language delivery would be a claim we cannot back.
 *
 * Number formatting: Turkish decimal comma and thousands dot are used, because a
 * Turkish finance team reads 33.030,00 TL and %0,759 and would stumble over the
 * English forms. The values themselves are unchanged. Where a rate is normally
 * quoted per mille in Turkish practice (damga vergisi), both forms are printed
 * so nothing is transformed away.
 */

import type { CountryFact, CountryProvider } from './country-detail';

/* ── Shared vocabulary ───────────────────────────────────────────── */

/** Odoo support badge, in Turkish. Keyed by the OdooSupport value. */
export const TR_SUPPORT_LABEL: Record<string, string> = {
  native: "Odoo'da hazır",
  oca_or_community: "Topluluk modülü",
  third_party_paid: "Ücretli konnektör",
  custom_build: "Özel geliştirme",
};

/** What each badge costs the buyer, one line each. */
export const TR_SUPPORT_MEANING: Record<string, string> = {
  native: "Odoo 19 ile birlikte gelir. Modül satın almanız gerekmez, iş yapılandırmadan ibarettir.",
  oca_or_community: "Topluluk modülü var. Kurulur, test edilir; sürüm yükseltmelerinde güncel tutma maliyeti bütçelenir.",
  third_party_paid: "Ücretli bir konnektör kapsıyor. Lisans bedeli bizim ücretimizin dışındadır ve ayrı fiyatlanır.",
  custom_build: "Canlıya alacağımız hazır bir modül yok. Kapsamı belirlenir, fiyatlanır ve yazılır.",
};

/** The order the topic pages group providers in. */
export const TR_SUPPORT_ORDER = ['native', 'oca_or_community', 'third_party_paid', 'custom_build'];

/** Provider "kind" strings, as the Turkish market names them. */
export const TR_KIND: Record<string, string> = {
  'domestic card scheme': "yerli kart sistemi",
  'local gateway': "yerli ödeme altyapısı",
  'local acquirer': "yerli ödeme kuruluşu",
  'local acquirer and gateway': "yerli ödeme kuruluşu ve altyapısı",
  'local gateway and acquirer': "yerli ödeme altyapısı ve kuruluşu",
  'global gateway': "küresel ödeme altyapısı",
  'card installments': "kart taksiti",
  'installments': "taksit",
  'instant bank transfer': "anlık banka transferi",
  'bank transfer': "banka transferi",
  'domestic bank transfer': "yurt içi banka transferi",
  'manual bank payment': "elle banka tahsilatı",
  'mobile wallet': "mobil cüzdan",
  'BNPL': "şimdi al sonra öde",
  'cash on delivery': "kapıda ödeme",
  'national post': "ulusal posta",
  'domestic express': "yurt içi kargo",
  'regional express': "bölgesel ekspres",
  'global express': "uluslararası ekspres",
  'domestic and regional express': "yurt içi ve bölgesel kargo",
  'domestic and global express': "yurt içi ve uluslararası kargo",
  'last mile': "son kilometre teslimat",
  'aggregator': "kargo entegratörü",
  'freight forwarding': "taşıma işleri organizatörlüğü",
  'air freight': "hava kargo",
};

/** City names as Turkish spells them. */
export const TR_CITY: Record<string, string> = {
  Istanbul: "İstanbul",
  Ankara: "Ankara",
  Izmir: "İzmir",
  Bursa: "Bursa",
  Antalya: "Antalya",
};

export const TR_MONTHS = [
  "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
  "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık",
];

/** '2026-08-22' -> '22 Ağustos 2026'. Falls back to the raw string. */
export function trReviewDate(iso: string | undefined): string {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(iso || ''));
  if (!m) return String(iso || '');
  const month = TR_MONTHS[Number(m[2]) - 1];
  return month ? `${Number(m[3])} ${month} ${m[1]}` : String(iso);
}

/* ── Lookup helpers ──────────────────────────────────────────────── */

export interface TrProviderText { note: string }

/** Turkish for an English source string, matched on a leading substring. */
export function pickTr(map: Record<string, string> | undefined, en: string): string | undefined {
  if (!map || !en) return undefined;
  const key = Object.keys(map).find(k => en.startsWith(k));
  return key ? map[key] : undefined;
}

/** Facts that have a Turkish rendering. Unmatched items are dropped, never
    printed in English on a Turkish page. */
export function trFacts(
  facts: CountryFact[] | undefined,
  map: Record<string, string> | undefined,
): { text: string; verified: boolean }[] {
  return (facts || [])
    .map(f => ({ text: pickTr(map, f.claim), verified: f.verified }))
    .filter((f): f is { text: string; verified: boolean } => Boolean(f.text));
}

export function trLines(
  lines: string[] | undefined,
  map: Record<string, string> | undefined,
): string[] {
  return (lines || []).map(l => pickTr(map, l)).filter((x): x is string => Boolean(x));
}

export interface TrProviderView {
  name: string;
  kind: string;
  note: string;
  support: string;
  verified: boolean;
}

/** Providers keyed by the provider name exactly as country-detail.ts spells it. */
export function trProviders(
  items: CountryProvider[] | undefined,
  map: Record<string, TrProviderText> | undefined,
): TrProviderView[] {
  return (items || [])
    .map(p => ({ p, t: map ? map[p.name] : undefined }))
    .filter((x): x is { p: CountryProvider; t: TrProviderText } => Boolean(x.t))
    .map(x => ({
      name: x.p.name,
      kind: TR_KIND[x.p.kind] || '',
      note: x.t.note,
      support: x.p.support,
      verified: x.p.verified,
    }));
}

/* ── Türkiye country copy ────────────────────────────────────────── */

export interface TrCountry {
  slug: string;          /* the /tr/ route segment, kept as the assigned 'turkey' */
  enSlug: string;        /* the COUNTRIES / COUNTRY_DETAIL key */
  name: string;          /* formal name used in headings and schema */
  metaTitle: string;
  metaDescription: string;
  lede: string;
  einvoicing: {
    scheme: string;
    authority: string;
    status: string;
    appliesTo: string;
    requirementsTr: Record<string, string>;
  };
  taxTr: Record<string, string>;
  payrollTr: Record<string, string>;
  accountingTr: Record<string, string>;
  paymentsTr: Record<string, TrProviderText>;
  shippingTr: Record<string, TrProviderText>;
  nativeTr: Record<string, string>;
  customTr: Record<string, string>;
}

export const TR_COUNTRY: TrCountry = {
  slug: 'turkey',
  enSlug: 'turkey',
  name: "Türkiye",
  metaTitle: "Türkiye için Odoo: e-Fatura, KDV, SGK bordrosu ve entegrasyonlar",
  metaDescription:
    "Türkiye için Odoo yerelleştirmesi: e-Fatura ve e-Arşiv, KDV ve kurumlar vergisi, SGK bordrosu, e-Defter, sanal POS ve kargo entegrasyonları. Odoo ile hazır gelen ne, geliştirme gereken ne.",
  lede:
    "GİB e-belge zorunluluğu, KDV ve kurumlar vergisi, SGK bordrosu, Tekdüzen Hesap Planı, sanal POS ve kargo entegrasyonları. Hangi kalem Odoo ile hazır geliyor, hangisi ücretli konnektör, hangisi geliştirme: hepsi tek sayfada.",

  einvoicing: {
    scheme: "e-Fatura ve e-Arşiv, GİB e-Belge ailesinin parçası",
    authority: "Gelir İdaresi Başkanlığı (GİB)",
    status:
      "Türkiye yıllardır zorunlu e-fatura uyguluyor ve had her yıl bir sonraki gruba kayıyor. 2025 brüt satış hasılatı 3 milyon TL ve üzerinde olan mükelleflerin 1 Temmuz 2026 tarihine kadar e-Fatura'ya geçmiş olması gerekiyordu; bu tarih geçti. Kural tek seferlik değil, süreklidir: haddi bir sonraki dönemde aşan mükellef için yıllık geçiş tarihi yeniden işler.",
    appliesTo:
      "Brüt satış hadlerini aşan mükellefler ile akaryakıt ve e-ticaret gibi adı geçen sektörler. Burada hadden çok ayrım önemli: e-Fatura yalnızca iki tarafın da sistemde kayıtlı olduğu durumda kullanılır, geri kalan her belge e-Arşiv olarak çıkar. Pratikte Türkiye'de bir şirket, büyüklüğü ne olursa olsun kâğıt fatura kesmiyor.",
    requirementsTr: {
      'Centralised continuous transaction control':
        "Merkezî ve sürekli belge denetimi. e-Fatura belgeleri GİB altyapısı üzerinden, ya GİB portalı ya da lisanslı bir özel entegratör aracılığıyla akar. Ayda bir portala dosya yüklemekten ibaret bir iş değildir.",
      'UBL-TR 2.1 XML':
        "UBL-TR 2.1 formatında XML.",
      'Mandatory electronic signature':
        "Elektronik imza zorunludur. Şirketler belgeyi mali mühür sertifikasıyla imzalar; Yeni Nesil Ödeme Kaydedici Cihazlardan (YN ÖKC) çıkan belgeler ise cihazın mali sertifikasıyla imzalanır.",
      'e-Arşiv covers everything outside':
        "e-Arşiv, e-Fatura posta kutusu sisteminin dışında kalan her şeyi kapsar: nihai tüketiciye kesilen faturalar ve ihracat dahil. Karşı tarafla değiş tokuş edilmez, GİB'e raporlanır.",
      'Archiving: 5 years under tax law':
        "Saklama: vergi mevzuatına göre 5 yıl, ticaret mevzuatına göre 10 yıl. Türkiye dışında arşivlemeye izin verilmiyor; bu da veritabanının ve eklerinin nerede barındırılabileceğini doğrudan kısıtlar.",
      'The same family includes e-İrsaliye':
        "Aynı aile e-İrsaliye, e-SMM (serbest meslek makbuzu), e-Müstahsil Makbuzu, e-Bilet ve defterler için e-Defter'i de içerir. Her birini ayrı ayrı kapsama alın.",
      'GİB moved to the New Central Application':
        "GİB 14 Aralık 2024'te Yeni Merkez Uygulaması'na geçti; dolayısıyla 2025 öncesine ait entegrasyon notları güncelliğini yitirdi.",
    },
  },

  taxTr: {
    'VAT (KDV) is the indirect tax':
      "Dolaylı vergi KDV'dir. Genel oran %20'dir. İndirimli oranlar: temel gıda, tekstil ve kitap gibi (II) sayılı listedeki mallarda %10; ham pamuk ve kuru fındık gibi (I) sayılı listedeki mallarda %1.",
    'VAT returns are filed monthly':
      "KDV beyannamesi ilgili vergi dairesine aylık verilir.",
    'Stamp tax applies to documents':
      "Damga vergisi kâğıtlar üzerinden %0,189 ile %0,948 (binde 1,89 ile binde 9,48) arasındaki oranlarda alınır. Ücret ödemeleri brüt tutar üzerinden %0,759 (binde 7,59) oranında vergilenir; damga vergisinin yalnızca sözleşme işlerinde değil, her bordro çalışmasında karşınıza çıkmasının sebebi budur.",
    'The corporate income tax return is due':
      "Kurumlar vergisi beyannamesi, hesap döneminin kapanışını izleyen dördüncü ayın 30'uncu günü verilir; takvim yılını kullananlar için 30 Nisan'dır ve ödeme aynı gün yapılır. Geçici vergi üçer aylık dönemler hâlindedir ve her dönemi izleyen ikinci ayın 17'nci günü beyan edilir.",
    'Returns stay open to inspection':
      "Beyannameler beş yıllık zamanaşımı süresi dolana kadar incelemeye açık kalır. Şirketler beyannamelerini yeminli mali müşavire tasdik ettirebilir; tasdik yaptırmayan şirketler incelemede önceliklendirilir.",
  },

  payrollTr: {
    'Social security is administered by SGK':
      "Sosyal güvenliği SGK yürütür. 1 Ocak 2026 itibarıyla çalışan %14 sosyal güvenlik primi ve %1 işsizlik sigortası primi öder. Primler, aylık 33.030,00 TL ile 297.270,00 TL tavanı arasındaki kazanç üzerinden hesaplanır.",
    'The employer pays 20.75%':
      "İşveren %20,75 sosyal güvenlik primi ve %2 işsizlik sigortası primi öder; bazı hâllerde indirim uygulanabilir (koşulları sağlayanlarda %16,75, imalatta %5). İşsizlik sigortasına devlet %1 ekler.",
    'Stamp tax of 0.759% is withheld':
      "Brüt ücret ödemelerinden %0,759 (binde 7,59) damga vergisi kesilir. Yani bordroda modellenecek yasal kesinti iki değil üçtür: gelir vergisi, sosyal güvenlik primi ve damga vergisi.",
    'Severance (kıdem tazminatı) is 30 days':
      "Kıdem tazminatı, her tam hizmet yılı için çalışanın son brüt ücretinin 30 günlük tutarıdır. En az bir tam yıl kesintisiz hizmet şartı aranır ve yasal bir tavanla sınırlıdır. Tazminatı azaltan veya ortadan kaldıran sözleşme hükümleri geçersizdir.",
    'Foreign nationals covered by their home':
      "Kendi ülkesinin sosyal güvenliği kapsamındaki yabancı uyruklular Türkiye'deki primlerden üç aya kadar muaf tutulabilir; ikili sosyal güvenlik sözleşmesi varsa süre uzar. Yurt dışı güvencesi olmayan herkes primini tam öder.",
  },

  accountingTr: {
    "e-Defter is GİB's electronic ledger system":
      "e-Defter, GİB'in elektronik defter sistemidir. Yevmiye defteri, büyük defter ve envanter defterini kapsar. Defter dosyaları ve beratları GİB'e aylık ya da geçici vergi dönemi bazında yüklenir; GİB bu süreleri birden çok kez sirkülerle uzatmıştır.",
    'Odoo ships the Turkish chart of accounts':
      "Odoo, Türkiye hesap planını, vergilerini, mali tablolarını ve mali koşullarını l10n_tr ile getirir; Türkiye'ye özgü vergi ve gelir tablosu raporlaması l10n_tr_reports ile gelir.",
    'Books and records must stay retrievable':
      "Defter ve kayıtların vergi mevzuatına göre 5 yıl, ticaret mevzuatına göre 10 yıl erişilebilir kalması gerekir ve Türkiye dışında arşivlenemez.",
    'The Tekdüzen Hesap Planı':
      "Tekdüzen Hesap Planı, Türkiye'deki işletmelerin ortak hesap yapısıdır. Kamu Gözetimi, Muhasebe ve Denetim Standartları Kurumu (KGK) 30 Temmuz 2024'te finansal raporlama standartlarıyla uyumlu ayrı bir hesap planını yürürlüğe koydu; bu plan Tekdüzen Hesap Planı'nın yanında duruyor.",
  },

  paymentsTr: {
    'Troy': {
      note: "Türkiye'nin kendi kart şeması. BKM işletiyor; temassız kart, QR ve internetten alışveriş için GO Secure Pay akışı var. Kamu bankalarının çıkardığı Troy kartlar Türk tüketicinin cüzdanında duruyor ve ödeme adımında çalışmasını bekliyor. Odoo Troy ile doğrudan konuşmaz; iyzico veya PayTR gibi bir Türk ödeme kuruluşu üzerinden kabul edersiniz.",
    },
    'iyzico': {
      note: "Türk online mağazalarının çoğunun başladığı altyapı. 2019'dan beri PayU'ya ait, Şubat 2025'te Paynet'i satın aldı. Odoo 19 bir iyzico ödeme sağlayıcısıyla geliyor ve kapsamında Türkiye'yi sayıyor; Türk lirasıyla kartlı tahsilata giden en kısa yol bu.",
    },
    'PayTR': {
      note: "6493 sayılı Kanun kapsamında lisanslı, Türkiye Cumhuriyet Merkez Bankası denetiminde bir ödeme ve elektronik para kuruluşu. 200.000'in üzerinde üye iş yeri, kart kabulü, havale ile tahsilat, ödeme bağlantısı, operatör faturasına yansıtma ve cüzdan altyapısı var. Odoo 19 için ücretsiz bir PayTR iFrame ödeme sağlayıcısı modülünün yanı sıra ücretli modüller de mevcut.",
    },
    'Craftgate': {
      note: "2018'den beri çalışan Türk ödeme orkestrasyon platformu. Tek entegrasyonla birden çok bankanın sanal POS hesabına yönlendiriyor, taksidi yönetiyor, Apple Pay ve Google Pay ekliyor. Birden fazla ödeme kuruluşuyla çalışması gereken üye iş yerlerine uygun. Odoo 19 için ücretli bir Craftgate ödeme sağlayıcısı modülü var.",
    },
    'Sipay': {
      note: "2018'den beri faaliyet gösteren, daha çok küçük üye iş yerlerine yönelen bir Türk online ödeme sağlayıcısı. Sanal POS, taksit, saklı kart ve düzenli ödemeleri kapsıyor. Odoo 19 için ücretli bir Sipay ödeme sağlayıcısı modülü var.",
    },
    'Param': {
      note: "Lisanslı bir Türk elektronik para ve ödeme kuruluşu. Sanal POS, cüzdan ve kart ihracı sunuyor; tahsilat ile ödemeyi tek sağlayıcıda toplamak isteyen üye iş yerleri kullanıyor. Odoo 19 için ücretli bir Türk sanal POS modülünde PayTR ve iyzico ile birlikte paketleniyor.",
    },
    'Moka United': {
      note: "Daha önce İş Bankası iştiraki olan Moka'nın, OYAK'ın United Payment'ı ile birleşmesinden doğan lisanslı bir Türk elektronik para ve ödeme kuruluşu. Sanal POS, fiziksel ve soft POS, ödeme bağlantısı, cüzdan ve kart programları sunuyor. Odoo 19 için modül bulunamadı; bu kalem geliştirmedir.",
    },
    'Card instalments (taksit)': {
      note: "Kart ödemesini birkaç aya bölmek Türkiye'de olağandır ve tüketici, mağazaları hangi banka programında kaç taksit verdiklerine göre karşılaştırır. Türk ödeme altyapıları Bonus, World, Maximum, Axess, CardFinans, Paraf, Advantage, Bankkart ve Sağlam Kart taksit tablolarını taşır. Odoo çekirdeğinde ödeme adımında taksit kavramı yoktur; taksit, kurduğunuz sanal POS modülünden gelir, Odoo'dan değil.",
    },
    'FAST (Fonlarin Anlik ve Surekli Transferi)': {
      note: "Türkiye Cumhuriyet Merkez Bankası'nın anlık ödeme sistemi. Bankalar arasında hafta sonu dahil 7/24, saniyeler içinde para taşır; Kolay Adres sayesinde müşteri IBAN yerine telefon numarası, TCKN, VKN veya e-posta ile ödeyebilir. Odoo'da FAST konnektörü yok; mutabakat ya elle yürür ya da bankanıza karşı geliştirilir.",
    },
    'Havale and EFT (bank transfer)': {
      note: "Türkiye'deki online ödemelerin gerçek bir bölümü, özellikle yüksek sepetler ve şirketler arası satış, banka transferiyle yapılıyor; akış Merkez Bankası'nın EFT sistemi üzerinde, anlık tarafında FAST ile çalışıyor. Odoo 19, hesap bilgilerinizi ve bir referans gösterip tahsilatı sizin onaylamanızı bekleyen Havale (Wire Transfer) sağlayıcısıyla geliyor; entegrasyon gerekmez.",
    },
    'Hepsipay': {
      note: "Hepsiburada'nın ödeme kolu. Türkiye'de düzenlemeye tabi; saklı kartla tek tıkla ödeme, şimdi al sonra öde niteliğinde alışveriş kredisi ve 300'den fazla markadan oluşan iş ortağı ağında taksit sunuyor. Türk tüketicinin cüzdanında zaten Hepsipay bakiyesi var. Odoo konnektörü yok; ya geliştirme ya da bir ödeme kuruluşu üzerinden gidilir.",
    },
    'Paycell': {
      note: "Turkcell'in 2016'da kurulan ödeme kolu. Cüzdan, ön ödemeli kart, QR ile ödeme ve doğrudan operatör faturalandırmasını bir arada veriyor; müşteri banka kartı olmadan alışverişi bir sonraki Turkcell faturasına yazdırabiliyor. Üye iş yerleri SDK'sını entegre ediyor. Odoo modülü yok.",
    },
    'ininal': {
      note: "Türkiye Cumhuriyet Merkez Bankası tarafından lisanslanmış bir Türk ön ödemeli kart ve elektronik para kuruluşu. Kartı ATM'den, PTT şubelerinden, marketlerden veya havaleyle yükleyen kişilerin banka hesabı olmadan internetten alışveriş yapmasını sağlıyor. QR ile ödeme ve sanal kart da var. Odoo modülü yok.",
    },
    'Cash on delivery (kapida odeme)': {
      note: "Yurtiçi Kargo ve Aras Kargo dahil Türk kargo şirketleri tahsilatlı gönderi hizmeti veriyor; Türkiye e-ticaretinin çoğu kartla ödense de mağaza kapıda ödemeyi sunabilir. Odoo 19 kapıda ödemeyi yüz yüze ödeme seçeneği olarak getirir, yani iş yapılandırma artı kargonun size gönderdiği tutarın mutabakatıdır.",
    },
    'Visa and Mastercard': {
      note: "Visa ve Mastercard, Türk kartlarında Troy'un yanında yer alıyor ve online kartlı ödemelerin büyük bölümünü taşıyor. Odoo bir kart şemasına değil, sözleşme yaptığınız Türk ödeme kuruluşuna ya da sanal POS'a bağlanır; neyi hangi taksit koşullarıyla kabul edeceğinize sanal POS tercihiniz karar verir.",
    },
    'Stripe (not available in Turkey)': {
      note: "Odoo 19 bir Stripe konnektörüyle geliyor; ancak Stripe'ın kendi desteklenen iş yeri ülkeleri listesinde Türkiye yok, dolayısıyla Türkiye'de kurulu bir şirket bunu kullanmak için Stripe hesabı açamaz. Stripe'ın Türkiye'de açıldığını söyleyen yazılara temkinli yaklaşın; planı iyzico veya PayTR üzerine kurun.",
    },
    'PayPal (not available in Turkey)': {
      note: "PayPal'ın kendi Türkiye sayfası, Haziran 2016'da Türkiye'deki faaliyetlerini durdurduğunu; buradaki kullanıcıların para gönderip alamayacağını, hesaplarına erişemeyeceğini ve bağlı banka hesabına para çekemeyeceğini belirtiyor. Odoo 19 bir PayPal konnektörüyle geliyor, ama Türk üye iş yeri bunu yurt içi tahsilatta kullanamaz.",
    },
  },

  shippingTr: {
    'PTT Kargo': {
      note: "Posta ve Telgraf Teşkilatı Türkiye'nin ulusal posta işletmesi. Türkiye Varlık Fonu'na ait; şube ve postane ağı, özel kargoların pahalı fiyatladığı kırsal adreslere ulaşıyor. PttAVM pazaryerini de işletiyor. Odoo bir PTT konnektörüyle gelmez, ancak Odoo 19 için ücretli PTT Kargo modülleri var.",
    },
    'Yurtici Kargo': {
      note: "1982'de kurulan ve Arıkanlı Holding bünyesindeki şirket, Türkiye'nin en büyük özel şube ve acente ağına sahip; e-ticaret takibi, kolay iade ve tahsilatlı gönderi hizmeti veriyor. Türk mağazalarının varsayılan olarak seçtiği kargo bu. Odoo ile gelmez, ancak Odoo 19 için ücretli bir Yurtiçi Kargo modülü var.",
    },
    'Aras Kargo': {
      note: "Yurt içinde 24-48 saatte teslimat, kapıda ödeme, tersine lojistik ve sevkiyat sonrası adres veya zaman değişikliği yapan ulusal bir Türk kargo şirketi. Kurumsal göndericiler için entegrasyon ve rota araçları var. Odoo 19 için ücretli bir Aras Kargo modülü mevcut.",
    },
    'MNG Kargo': {
      note: "Günde yaklaşık 600.000 adrese teslimat yapan önde gelen Türk kargo şirketi. Ekim 2023'te DHL Group tarafından tamamen satın alındı ve şimdi DHL eCommerce içinde yönetiliyor. Arkasında küresel bir ana şirket bulunan yurt içi ağ isteyenler için uygun. Odoo 19 için ücretli bir MNG Kargo modülü var.",
    },
    'Surat Kargo': {
      note: "Kendi şube ağına sahip bir Türk yurt içi kargo şirketi. Bir mağaza e-ticaret fiyatı pazarlığı yaparken Yurtiçi, Aras, MNG ve PTT ile birlikte rutin olarak karşılaştırılıyor. Odoo 19 için ücretli bir Sürat Kargo modülü var.",
    },
    'HepsiJET': {
      note: "Hepsiburada'nın teslimat kolu. D Fast Dağıtım Hizmetleri ve Lojistik işletiyor; şube ağı yerine dağıtım merkezleri ve paket dolaplarıyla pazaryeri son kilometresi için kurulmuş. Hepsiburada'da satan mağazaların genellikle buna ihtiyacı olur. Odoo 19 için ücretli bir HepsiJET modülü var.",
    },
    'Trendyol Express': {
      note: "Trendyol'un kendi son kilometre ağı; Türkiye'nin en büyük pazaryerinde satan herkes için teslimat ayağı. Yine şube yerine dağıtım merkezleri ve dolaplar üzerine kurulu. Odoo 19 için ücretli bir Trendyol Express konnektörü var; pazaryeri ile kendi sitenizin stoğunu tek Odoo'da yönetiyorsanız bu önemli.",
    },
    'Kolay Gelsin': {
      note: "2018'de Ekol Lojistik bünyesinde, teslim edilemeyen gönderi sorununa teknoloji odaklı bir alternatif olarak kuruldu; şimdi Koç Holding'in Sendeo'su ile Kolay Gelsin markası altında birleşti. Her iki marka da entegrasyon listelerinde görünmeye devam ediyor, size hangi hesabın verildiğini teyit edin. Odoo 19 için ücretli tek bir modül Sendeo ile Kolay Gelsin'i birlikte kapsıyor.",
    },
    'Sendeo': {
      note: "2021'de Koç grubu tarafından Aygaz'ın Aykargo girişiminden çıkarıldı; şimdi Kolay Gelsin ile o marka altında birleşiyor. Türk e-ticaret entegrasyonlarında hâlâ ayrı adlandırılıyor, yani marka geçişi sürerken bir üye iş yerinin elinde Sendeo sözleşmesi olabilir. Kolay Gelsin ile aynı ücretli Odoo 19 modülü kapsıyor.",
    },
    'DHL Express': {
      note: "Türkiye'den çıkan acil koli ve evrakta alışılmış tercih. DHL eCommerce daha ucuz küçük paketleri kapsıyor ve MNG Kargo artık aynı grubun içinde. Odoo 19 bir DHL Express konnektörüyle geliyor; hesap numarasıyla canlı fiyat ve etiket ek modül olmadan çalışır.",
    },
    'FedEx': {
      note: "Türkiye'den daha çok ihracat siparişlerinde Amerika Birleşik Devletleri ve Asya hatlarında kullanılıyor. Odoo 19 bir FedEx konnektörüyle geliyor; sınır ötesi satan bir Türk ihracatçı, modül satın almadan fiyatlandırma ve etiket basımı yapar.",
    },
    'UPS': {
      note: "Türkiye'den ihracat siparişlerinde daha çok Avrupa hatlarında kullanılıyor. Odoo 19 bir UPS konnektörüyle geliyor; ücretli modül almadan etkinleştirebileceğiniz üç küresel kargodan biri.",
    },
    'ShipEntegra': {
      note: "Türk satıcıların kargoları karşılaştırmak ve anlaşmalı fiyatları tek yerden almak için kullandığı bir kargo entegratörü. Odoo bir konnektörle gelmiyor ve Odoo 19 uygulama mağazasında da yok, yani özel geliştirme. Şunu da unutmayın: entegratörün arkasındaki kargolara doğrudan değil, entegratör sözleşmesi ve ücretleri üzerinden ulaşılır.",
    },
  },

  nativeTr: {
    'Turkish chart of accounts, taxes':
      "Türkiye hesap planı, vergileri, mali tabloları ve mali koşulları.",
    'Türkiye-specific tax and profit and loss reporting':
      "Türkiye'ye özgü vergi ve gelir tablosu raporlaması.",
    'e-Fatura and e-Arşiv through Nilvera':
      "Nilvera üzerinden e-Fatura ve e-Arşiv: GİB uyumlu XML üretimi, Nilvera'ya iletim, belge ve durum bilgisinin Odoo'ya geri senkronizasyonu.",
    'Invoice scenarios for basic, public sector':
      "Temel, kamu ve ihracat fatura senaryoları; satış, tevkifat, ihraç kayıtlı ve istisna durumlarını kapsıyor.",
    'e-İrsaliye dispatch note generation':
      "e-İrsaliye oluşturma ve gönderimi.",
    'e-Defter (e-Ledger) output':
      "e-Defter çıktısı.",
  },

  customTr: {
    'The whole e-document path is tied to Nilvera':
      "e-belge yolunun tamamı özel entegratör olarak Nilvera'ya bağlı. Müşteri hâlihazırda Logo, Uyumsoft, QNB eFinans, İzibiz veya Sovos ile sözleşmeliyse bunların hiçbiri Odoo'da yok. Ya Nilvera'ya geçirirsiniz ya da bir konnektör bütçelersiniz. Türkiye projelerinde en büyük kapsam sorusu budur ve ilk görüşmede sorulmaya değer.",
    'Only e-Fatura, e-Arşiv, e-İrsaliye and e-Defter are covered':
      "Yalnızca e-Fatura, e-Arşiv, e-İrsaliye ve e-Defter kapsanıyor. e-SMM, e-Müstahsil Makbuzu, e-Bilet ve YN ÖKC cihaz entegrasyonu kapsam dışı; serbest meslek şirketleri, tarımsal alım yapanlar ve biletleme işleri için ek iş gerekir.",
    'Hosting. Archiving outside Türkiye is not permitted':
      "Barındırma. Türkiye dışında arşivlemeye izin verilmiyor, bu yüzden sözleşme imzalamadan önce Odoo veritabanının, dosya deposunun ve eklerin fiziksel olarak nerede durduğunu kontrol edin. Bu, varsayılan bir bulut bölgesini tamamen devre dışı bırakabilir.",
    'Master data cleanup':
      "Ana veri temizliği. VKN/TCKN, vergi dairesi ve Mersis cari kartlarda zorunlu ve taşınan veride neredeyse her zaman eksik. Temizliği ayrı bir iş kalemi olarak planlayın.",
    'No Turkish courier ships natively':
      "Hiçbir Türk kargosu Odoo ile hazır gelmiyor. Kargo başına ücretli bir konnektör ya da gerçekten test ettiğiniz ücretsiz bir çoklu kargo topluluk modülü bütçeleyin.",
    'Domestic gateways beyond Iyzico':
      "iyzico dışındaki yerli ödeme altyapıları. PayTR'nin topluluk modülü var; geri kalan her şey geliştirme.",
  },
};

/* ── Topic pages ─────────────────────────────────────────────────────
   Slugs are the words a Turkish buyer actually types. e-fatura is the query
   that brings people to this subject at all; bordro and kargo are the only
   words used for those two subjects in Turkish business speech; muhasebe-ve-vergi
   and odeme-yontemleri read the way a finance director would say them.
   Slugs are ASCII-folded (odeme, not ödeme) so the URL never gets
   percent-encoded in a share, a chat window or an ad. */

export type TrTopicKind = 'einvoicing' | 'accounting-tax' | 'payroll' | 'payments' | 'shipping';

export interface TrFactGroup {
  id: string;
  source: 'tax' | 'accounting' | 'payroll';
  title: string;
  intro: string;
}

export interface TrTopic {
  slug: string;
  kind: TrTopicKind;
  label: string;          /* nav and breadcrumb */
  h1: string;
  metaTitle: string;
  lede: string;
  metaDescription: string;
  serviceName: string;
  serviceType: string;    /* English, matching the English pages' schema */
  serviceDesc: string;
  groups: TrFactGroup[];  /* fact topics only */
  providerTitle?: string;
  providerIntro?: string;
  build: { t: string; d: string }[];
  need: string[];
  services: string[];     /* English service slugs, linked out to /services/ */
}

export const TR_TOPICS: TrTopic[] = [
  {
    slug: 'e-fatura',
    kind: 'einvoicing',
    label: "e-Fatura ve e-Arşiv",
    h1: "Odoo e-Fatura ve e-Arşiv entegrasyonu",
    metaTitle: "Odoo e-Fatura ve e-Arşiv Entegrasyonu (Türkiye)",
    lede: "Türkiye e-belge tarafının tamamı: sistem, arkasındaki idare, kimi bağladığı ve teklif verilmeden önce tek tek eşlediğimiz her gereklilik.",
    metaDescription: "Odoo e-Fatura ve e-Arşiv entegrasyonu: GİB sistemi, kimin kapsamda olduğu, özel entegratör ve mali mühür ile her gerekliliğin Odoo kurulumunda neyi değiştirdiği.",
    serviceName: "Odoo e-Fatura kurulumu (Türkiye)",
    serviceType: 'Odoo e-invoicing configuration, integration and support',
    serviceDesc: 'Odoo e-invoicing setup, integration and support for businesses in Türkiye.',
    groups: [],
    build: [
      { t: "Önce gereklilik, sonra kod.", d: "Yukarıdaki her satır yazılı bir eşleme tablosunda bir alana, bir belge şablonuna veya bir API çağrısına dönüşür. Odoo'da karşılığı olmayan her kalem, proje başlamadan geliştirme olarak fiyatlanır." },
      { t: "Numaralandırma ilk gün kapanır.", d: "Fatura serileri sessizce bozulan ve devreye alma sonrasında düzeltmesi en pahalı olan yerdir. İlk test belgesinden önce onaylanır." },
      { t: "Gönderim bir kuyruk üzerinden yürür.", d: "Yeniden deneme, mükerrer gönderim koruması, saklanan yanıtlar ve denetim izi. Başarısız bir gönderim, ay sonunda fark ettiğiniz kayıp fatura değil, kanıtı olan bir destek kaydı olur." },
      { t: "Onayı mali işler ekibiniz verir.", d: "Test veritabanında gerçek belgeler, geçiş öncesinde mali müşavirinizle birlikte kontrol edilir; geri dönüş planı yazılı olarak hazır bekler." },
    ],
    need: [
      "Vergi kayıt bilgileriniz ve her birinin ait olduğu tüzel kişilik.",
      "Bugün çalıştığınız özel entegratör ve sözleşmenizin bitiş tarihi.",
      "Düzenlediğiniz her belge türünden birer örnek: fatura, iade faturası ve varsa kendi adınıza kestirdiğiniz belgeler.",
      "İdarenin size hâlihazırda verdiği kayıt, sertifika veya portal bilgileri.",
    ],
    services: ['odoo-e-invoicing', 'odoo-localization', 'odoo-integration', 'odoo-implementation'],
  },
  {
    slug: 'muhasebe-ve-vergi',
    kind: 'accounting-tax',
    label: "Muhasebe ve vergi",
    h1: "Odoo'da Türkiye muhasebesi ve vergi kurulumu",
    metaTitle: "Odoo Türkiye Muhasebe ve Vergi Kurulumu",
    lede: "Devreye almadan önce yapılandırdığımız ve test ettiğimiz her Türkiye vergi ve muhasebe kalemi, özetlenmeden, tam listeyle.",
    metaDescription: "Odoo Türkiye muhasebesi ve vergisi: KDV, kurumlar vergisi, damga vergisi, e-Defter ve Tekdüzen Hesap Planı. Devreye almadan önce yapılandırıp test ettiğimiz her kalem.",
    serviceName: "Odoo Türkiye muhasebe ve vergi kurulumu",
    serviceType: 'Odoo accounting configuration, tax setup and reporting',
    serviceDesc: 'Odoo accounting and tax configuration, reporting and support for businesses in Türkiye.',
    groups: [
      {
        id: 'vergi',
        source: 'tax',
        title: "Türkiye yapılandırmasını belirleyen vergi kuralları",
        intro: "Aşağıdaki her madde, devreye almadan önce vergi kurulumunun doğru yapması gereken bir şeydir.",
      },
      {
        id: 'muhasebe',
        source: 'accounting',
        title: "Defterlerinizin içinde durduğu raporlama çerçevesi",
        intro: "Mali tablolarınızın neye uyması gerektiği ve bunun hesap planı için ne anlama geldiği.",
      },
    ],
    build: [
      { t: "Hesap planı mali müşavirinizden gelir.", d: "Kurulum sihirbazında birinin seçtiği hazır şablona göre değil, mali müşavirinizin imzaladığı eşlemeye göre yapılandırırız." },
      { t: "Her vergi bir test belgesiyle doğrulanır.", d: "Vergi başına bir fatura, bir iade faturası ve bir dönem raporu; mali müşavirinizin bağımsız olarak ürettiği rakama karşı kontrol edilir." },
      { t: "Açılış bakiyeleri tutar.", d: "Geçmiş dönem verisi yüklenir ve canlı bir kayıt atılmadan önce en son beyan ettiğiniz mali tablolara bağlanır." },
      { t: "Beyan çıktıları Odoo'dan üretilir.", d: "Raporlar sistemden alınır, satır satır kontrol edilir ve ekibinizin bizsiz çalıştırabilmesi için yazılı bir prosedürle devredilir." },
    ],
    need: [
      "Bugün kullandığınız hesap planı ve vergi kodları.",
      "En son beyan edilen mali tablolar ve en son verilen beyanname.",
      "Yapılandırmayı onaylayacak mali müşavirin veya yeminli mali müşavirin adı.",
      "Tevkifat, ihraç kayıtlı ve istisna satışlarınız varsa her birinden örnek birer belge.",
    ],
    services: ['odoo-localization', 'odoo-implementation', 'odoo-audit', 'odoo-consultancy'],
  },
  {
    slug: 'bordro',
    kind: 'payroll',
    label: "Bordro",
    h1: "Odoo'da Türkiye bordrosu",
    metaTitle: "Odoo Türkiye Bordrosu ve SGK Kurulumu",
    lede: "Bir maaş kuralına, bir banka dosyasına veya bir yasal bildirime dönüşmesi gereken her Türkiye bordro kalemi, doğrulama durumuyla birlikte tam listeyle.",
    metaDescription: "Odoo Türkiye bordrosu: SGK ve işsizlik sigortası primleri, damga vergisi, kıdem tazminatı. Her kalemin Odoo maaş kuralı veya raporu olarak nasıl kurulduğu.",
    serviceName: "Odoo Türkiye bordro kurulumu",
    serviceType: 'Odoo payroll configuration, salary rules and statutory reporting',
    serviceDesc: 'Odoo payroll setup, configuration and support for businesses in Türkiye.',
    groups: [
      {
        id: 'bordro',
        source: 'payroll',
        title: "Türkiye bordrosunun hesaplaması, kesmesi ve bildirmesi gerekenler",
        intro: "Aşağıdaki her madde, ilk canlı çalıştırmadan önce test ettiğimiz bir maaş kuralına, banka dosyasına veya rapora dönüşür.",
      },
    ],
    build: [
      { t: "Kural yazılır, rakam gömülmez.", d: "Primler ve kesintiler tarih parametreli Odoo maaş kuralları olarak kurulur; böylece bir oran değişikliği kod sürümü değil, yapılandırma düzenlemesi olur." },
      { t: "Önce personel verisi denetlenir.", d: "Banka bilgileri, kimlik numaraları, işe giriş tarihleri ve sözleşme türleri. Bordro devreye almalarının çoğu kötü ana veri yüzünden kayar ve bunu erken düzeltmek ucuzdur." },
      { t: "En az bir paralel çalıştırma yapılır.", d: "Mevcut sisteminizin yanında en az bir dönem çalıştırır ve geçmeden önce İK ile mali işler sorumlularınızla satır satır mutabakat yaparız." },
      { t: "Banka dosyaları bankayla test edilir.", d: "Ödeme dosyaları ve yasal raporlar Odoo'dan üretilir ve ilk canlı çalıştırmadan önce bankanızda deneme dosyası olarak test edilir." },
    ],
    need: [
      "Çalıştırdığınız her sözleşme türü için mevcut sisteminizden tam bir bordro örneği.",
      "Banka bilgileri ve kimlik numaraları dahil personel ana veriniz.",
      "Bugün hangi bildirimleri ve dosyaları kime gönderdiğiniz.",
      "Uyguladığınız prim indirimleri varsa hangi koşula dayandığı.",
    ],
    services: ['odoo-payroll-setup', 'odoo-localization', 'odoo-implementation', 'odoo-training'],
  },
  {
    slug: 'odeme-yontemleri',
    kind: 'payments',
    label: "Ödeme yöntemleri",
    h1: "Odoo sanal POS ve ödeme yöntemleri entegrasyonu",
    metaTitle: "Odoo Sanal POS ve Ödeme Yöntemleri Entegrasyonu (Türkiye)",
    lede: "Türkiye'de önemli olan her ödeme yöntemi ve altyapısı, her birinin Odoo'ya nasıl ulaştığıyla birlikte: ürünle hazır gelen, topluluk modülü, ücretli konnektör veya geliştirme.",
    metaDescription: "Odoo ödeme entegrasyonu Türkiye: sanal POS, taksit, Troy, iyzico, PayTR, havale, FAST ve kapıda ödeme. Hangisi Odoo ile hazır, hangisi konnektör, hangisi geliştirme.",
    serviceName: "Odoo ödeme altyapısı entegrasyonu (Türkiye)",
    serviceType: 'Odoo payment provider configuration and gateway integration',
    serviceDesc: 'Odoo payment gateway integration and checkout support for businesses in Türkiye.',
    groups: [],
    providerTitle: "Bir Türkiye kurulumunda incelediğimiz her ödeme yolu",
    providerIntro: "Odoo'ya ulaşmanın size neye mal olduğuna göre gruplanmış kayıtlar. Ticari sorunun tamamı bu etikette: ürünle hazır gelir mi, topluluk modülü mü, ücretli konnektör mü, yoksa geliştirme mi.",
    build: [
      { t: "Müşterinin cüzdanındakinden başlanır.", d: "Müşterilerinizin kullandığı yöntemleri kapsayan en küçük sağlayıcı setini seçeriz; çünkü her ek sanal POS bir mutabakat ve bir destek yüzeyi daha demektir." },
      { t: "Önce hazır gelen sağlayıcılar.", d: "Odoo'nun zaten taşıdığı ne varsa, kimse konnektör satın almadan önce yapılandırılır. Ücretli konnektörler ve özel geliştirme, proje ortasında keşfedilmez, baştan fiyatlanır." },
      { t: "Sağlayıcı başına dört test.", d: "Provizyon, tahsilat, iade ve kasıtlı olarak başarısız kılınan bir işlem; önce test ortamında, sonra canlıda küçük bir gerçek tutarla bir kez daha." },
      { t: "Hakediş muhasebeye eşlenir.", d: "Ödemeler, komisyonlar ve ters ibrazlar mali müşavirinizin onayladığı hesaplara düşer; böylece banka mutabakatı şüpheli bakiye bırakmadan kapanır." },
    ],
    need: [
      "Mevcut sanal POS sözleşmeleriniz ve her birinin komisyon tarifesi.",
      "Bir aylık hakediş raporu; muhasebe eşlemesi gerçek ödemelere karşı test edilebilsin.",
      "Hangi banka programlarında kaç taksit verdiğiniz.",
      "Tahsilat yaptığınız para birimleri ve her ödemeyi alan tüzel kişilik.",
    ],
    services: ['odoo-integration', 'odoo-ecommerce', 'odoo-implementation', 'odoo-customization'],
  },
  {
    slug: 'kargo',
    kind: 'shipping',
    label: "Kargo",
    h1: "Odoo kargo entegrasyonu",
    metaTitle: "Odoo Kargo Entegrasyonu (Türkiye)",
    lede: "Türkiye'de hacmi taşıyan kargo şirketleri ve her birinin fiyatlandırma, etiket basımı, takip ve kapıda ödeme tarafında Odoo'ya ulaşması için ne gerektiği.",
    metaDescription: "Odoo kargo entegrasyonu Türkiye: Yurtiçi, Aras, MNG, Sürat, PTT, HepsiJET, Trendyol Express ve uluslararası kargolar. Fiyat, etiket, takip ve kapıda ödeme için ne gerekir.",
    serviceName: "Odoo kargo entegrasyonu (Türkiye)",
    serviceType: 'Odoo delivery carrier configuration and courier API integration',
    serviceDesc: 'Odoo shipping and courier integration, from rating to labels and tracking, for businesses in Türkiye.',
    groups: [],
    providerTitle: "Bir Türkiye kurulumunda incelediğimiz her kargo",
    providerIntro: "Odoo'ya ulaşmanın size neye mal olduğuna göre gruplanmış kayıtlar. Etiket, ticari sorunun tamamıdır: ürünle hazır gelir mi, topluluk modülü mü, ücretli konnektör mü, yoksa geliştirme mi.",
    build: [
      { t: "Bir değil, dört entegrasyon.", d: "Fiyatlandırma, etiket basımı, takip ve kapıda ödeme mutabakatı ayrı iş kalemleridir, ayrı arıza biçimleri vardır ve ayrı fiyatlanır." },
      { t: "Kargo hesapları geliştirmeden önce doğrulanır.", d: "Test bilgileri anlaşmalı fiyatlarınızı çoğu zaman taşımaz; bu yüzden hesap numaralarını ve fiyat tarifesini konnektör yazılmadan önce kargoyla teyit ederiz." },
      { t: "Konnektör yoksa yazarız.", d: "Odoo entegrasyonu olmayan kargolar için API'lerine karşı yeniden deneme, mükerrer koruma ve saklanan yanıtlarla geliştiririz ve kodu size devrederiz." },
      { t: "İadeler stoğa geri döner.", d: "Teslim edilemeyen gönderiler ve iadeler gerçek stok hareketlerine bağlanır; böylece her hafta birinin elle düzeltmesine gerek kalmadan stok doğru kalır." },
    ],
    need: [
      "Kargo hesap numaralarınız ve her birinin fiyat tarifesi.",
      "Hacme göre ilk on teslimat noktanız, tipik ağırlık ve ölçülerle birlikte.",
      "Kapıda ödeme alıp almadığınız ve bugün mutabakatını kimin yaptığı.",
      "Pazaryerinde satıyorsanız hangi pazaryeri kargolarına bağlı olduğunuz.",
    ],
    services: ['odoo-integration', 'odoo-ecommerce', 'odoo-customization', 'odoo-support'],
  },
];

/** Group heading text on the topic pages, per support level. */
export const TR_GROUP_INTRO: Record<string, string> = {
  native: "Odoo ile birlikte gelir. Geliştirme değil, yapılandırma.",
  oca_or_community: "Topluluk modülü var. Kurulur, test edilir ve sürüm yükseltmelerinde güncel tutma yükü bütçelenir.",
  third_party_paid: "Ücretli bir konnektör kapsıyor. Lisans bedeli bizim ücretimizin dışındadır ve ayrı fiyatlanır.",
  custom_build: "Canlıya alacağımız hazır bir konnektör yok. Kapsamı belirlenir, fiyatlanır ve yazılır.",
};

/** The one sentence that keeps the delivery-language claim honest. */
export const TR_LANGUAGE_NOTE =
  "Bu sayfa Türkçe. Proje yürütmesi, dokümantasyon ve eğitim İngilizce ilerler; ekiplerimiz ayrıca Arapça ve Urduca çalışır. Türkçe tarafta mali müşaviriniz ve özel entegratörünüzle doğrudan koordine oluruz.";

/** Shown wherever a figure is printed. */
export const TR_DISCLAIMER =
  "Oranlar, formatlar, hadler ve beyan süreleri değişir. Sistemi kurulum anında yürürlükte olan kurallara göre yapılandırır, her rakamı onaydan önce mali müşavirinizle teyit ederiz. Devreye aldıktan sonra bir kural değişirse bu bir destek kaydıdır, yeniden kurulum değil.";

export const TR_UNCONFIRMED_NOTE =
  "Teyit edilmedi. Kaynaklar birbiriyle uyumlu, ancak birincil kaynaktan doğrulama bulunamadı.";
