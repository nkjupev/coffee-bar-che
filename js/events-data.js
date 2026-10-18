/* Events from https://www.facebook.com/CafeBarChe/events — photos from assets/events/
   (Che sliki = che-01..13, cHE facebook stari sliki = che-14..27). Each photo is used once. */
(function () {
  // [width, height] of every file, so the grid can keep the original proportions
  const SIZES = [[1080,1350],[1350,1688],[1350,1687],[1638,2048],[1638,2048],[1350,1687],[1350,1688],[3576,4096],[2160,2700],[2160,2700],[2160,2700],[1350,1688],[608,800],[960,502],[960,503],[960,540],[851,315],[960,540],[960,540],[960,540],[960,503],[960,502],[851,315],[960,502],[960,502],[960,502],[960,502]];

  const PHOTOS = SIZES.map((size, i) => ({
    src: `assets/events/che-${String(i + 1).padStart(2, '0')}.jpg`,
    w: size[0],
    h: size[1]
  }));

  const raw = [
    { title: "7 year's of CHEERS", cat: 'party', fb: 'https://www.facebook.com/CafeBarChe/events' },
    { title: 'Летечки Пекинезери @CHE', cat: 'music', fb: 'https://www.facebook.com/events/551911450102610' },
    { title: 'Изложба на Марио Манески', cat: 'culture', fb: 'https://www.facebook.com/CafeBarChe/events' },
    { title: 'Избрусено - Ненад Стефаноски Брус во ЧЕ', cat: 'music', fb: 'https://www.facebook.com/CafeBarChe/events' },
    { title: 'Friday music day @CHE', cat: 'music', fb: 'https://www.facebook.com/CafeBarChe/events' },
    { title: '1ви АПРИЛ МАСКЕНБАЛ @ЧЕ', cat: 'party', fb: 'https://www.facebook.com/CafeBarChe/events' },
    { title: 'шшшшшестЧЕ - роденденЧЕ', cat: 'party', fb: 'https://www.facebook.com/CafeBarChe/events' },
    { title: 'Goodbye 2021@Che', cat: 'party', fb: 'https://www.facebook.com/CafeBarChe/events' },
    { title: 'Предновогодишен вонреден џем', cat: 'music', fb: 'https://www.facebook.com/CafeBarChe/events' },
    { title: 'Шамба и Сол во Че', cat: 'music', fb: 'https://www.facebook.com/CafeBarChe/events' },
    { title: 'Drazi Drags @Che', cat: 'music', fb: 'https://www.facebook.com/CafeBarChe/events' },
    { title: 'Rizinski @Che', cat: 'music', fb: 'https://www.facebook.com/CafeBarChe/events' },
    { title: 'The Wine is Mine @Che', cat: 'music', fb: 'https://www.facebook.com/CafeBarChe/events' },
    { title: 'Карантински маскенбал ЧЕ 2020', cat: 'party', fb: 'https://www.facebook.com/CafeBarChe/events' },
    { title: 'Еден девет еден џем', cat: 'music', fb: 'https://www.facebook.com/CafeBarChe/events' },
    { title: 'Nenad Stefanoski Brus @CHE!', cat: 'music', fb: 'https://www.facebook.com/CafeBarChe/events' },
    { title: 'Петок со Даневски в ЧЕ', cat: 'music', fb: 'https://www.facebook.com/CafeBarChe/events' },
    { title: 'Џем во ЧЕ бр. 190', cat: 'music', fb: 'https://www.facebook.com/CafeBarChe/events' },
    { title: 'Че полни ЧЕтворЧЕ!', cat: 'party', fb: 'https://www.facebook.com/CafeBarChe/events' },
    { title: 'Владо владее во ЧЕ', cat: 'music', fb: 'https://www.facebook.com/CafeBarChe/events' },
    { title: 'Џем во ЧЕ бр. 189', cat: 'music', fb: 'https://www.facebook.com/CafeBarChe/events' },
    { title: 'Со љубов од ЧЕ', cat: 'party', fb: 'https://www.facebook.com/CafeBarChe/events' },
    { title: 'Каде е Чакра во четврток?', cat: 'music', fb: 'https://www.facebook.com/CafeBarChe/events' },
    { title: 'Џемање 188 посветено на When in Krushevo', cat: 'music', fb: 'https://www.facebook.com/CafeBarChe/events' },
    { title: 'Music lab w/ Nenad Tonkin @CHE', cat: 'music', fb: 'https://www.facebook.com/CafeBarChe/events' },
    { title: 'Џем во ЧЕ бр. 187', cat: 'music', fb: 'https://www.facebook.com/CafeBarChe/events' },
    { title: 'Раце у вис - со Мартин Макиз', cat: 'music', fb: 'https://www.facebook.com/CafeBarChe/events' }
  ];

  const total = Math.min(raw.length, PHOTOS.length);

  window.CHE_FB_EVENTS = raw.slice(0, total).map((ev, i) => ({
    ...ev,
    img: PHOTOS[i].src,
    w: PHOTOS[i].w,
    h: PHOTOS[i].h
  }));
})();
