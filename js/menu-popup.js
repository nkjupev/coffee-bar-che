/* ================================================
   COFFEE BAR CHE — menu-popup.js
   Floating menu button + eBar.mk menu
   ================================================ */

(function () {
  'use strict';

  const MENU = [
    {
      id: 'coffee',
      mk: 'Кафе',
      en: 'Coffee',
      items: [
        ['Еспресо', 'Espresso', 100],
        ['Макијато', 'Macchiato', 120],
        ['Нескафе', 'Nescafe', 140],
        ['Капучино', 'Cappuccino', 130],
        ['Безкофеинско еспресо', 'Decaf espresso', 120],
        ['Фредо еспресо', 'Fredo espresso', 160],
        ['Фредо капучино', 'Fredo cappuccino', 180],
        ['Лате', 'Latte', 130],
        ['Топло чоколадо', 'Hot chocolate', 140],
        ['Салеп', 'Salep', 110],
        ['Какао', 'Cocoa', 110],
        ['Мало макијато', 'Small macchiato', 110],
        ['Ајс лате', 'Iced latte', 160],
        ['Американо', 'Americano', 100],
        ['Еспресо дупло', 'Double espresso', 150],
        ['Безкофеинско макијато', 'Decaf macchiato', 140],
        ['Безкофеинско капучино', 'Decaf cappuccino', 150],
        ['Портокал еспресо', 'Orange espresso', 200],
        ['Еспресо тоник', 'Espresso tonic', 160]
      ]
    },
    {
      id: 'tea',
      mk: 'Чај',
      en: 'Tea',
      items: [
        ['Планински чај', 'Mountain tea', 90],
        ['Чај шумско овошје', 'Forest fruit tea', 90]
      ]
    },
    {
      id: 'soft',
      mk: 'Вода и сокови',
      en: 'Water & juices',
      items: [
        ['Роса', 'Rosa still water', 90],
        ['Кока Кола', 'Coca-Cola', 120],
        ['Кока Кола зеро', 'Coca-Cola Zero', 120],
        ['Фанта', 'Fanta', 120],
        ['Спрајт', 'Sprite', 120],
        ['Тоник', 'Tonic', 120],
        ['Швепс', 'Schweppes', 120],
        ['Ред бул', 'Red Bull', 240],
        ['Цеден портокал', 'Fresh orange juice', 170],
        ['Природна лимонада', 'Fresh lemonade', 130],
        ['Роса кисела вода', 'Rosa sparkling water', 90],
        ['Некст сок', 'Next juice', 130],
        ['Леден чај', 'Iced tea', 160],
        ['Сокче класика', 'Sokche classic', 170],
        ['Сокче керот', 'Sokche carrot', 170],
        ['Брзо сокче', 'Quick juice box', 90],
        ['Швепс тангерина', 'Schweppes tangerine', 120]
      ]
    },
    {
      id: 'togo',
      mk: 'За носење',
      en: 'To go',
      items: [
        ['Еспресо ту го', 'Espresso to go', 90],
        ['Макијато ту го', 'Macchiato to go', 110],
        ['Нескафе ту го', 'Nescafe to go', 120],
        ['Фредо ту го', 'Fredo to go', 140],
        ['Цеден сок ту го', 'Fresh juice to go', 160],
        ['Безкофеинско кафе ту го', 'Decaf coffee to go', 100]
      ]
    },
    {
      id: 'beer',
      mk: 'Пиво',
      en: 'Beer',
      items: [
        ['Скопско', 'Skopsko', 160],
        ['Смут', 'Smooth', 160],
        ['Хајнекен', 'Heineken', 200],
        ['Бадвајзер', 'Budweiser', 180],
        ['Кромбахер пилснер', 'Krombacher Pilsner', 210],
        ['Кромбахер вајс', 'Krombacher Weiss', 210],
        ['Сарајевско пивце', 'Sarajevsko', 160],
        ['Никшичко', 'Niksicko', 160],
        ['Foks', 'Foks', 200],
        ['Асахи пиво', 'Asahi', 220],
        ['Козел светло', 'Kozel pale', 180],
        ['Козел темно', 'Kozel dark', 180],
        ['Веда 0.33', 'Veda 0.33', 230],
        ['Калеш 0.33', 'Kalesh 0.33', 230],
        ['Хајнекен 0.0 0,33л', 'Heineken 0.0 0.33l', 170],
        ['Амстел 0.5', 'Amstel 0.5', 180],
        ['Корона 0.33', 'Corona 0.33', 210],
        ['Paulaner Weissbier', 'Paulaner Weissbier', 270],
        ['Paulaner Munchner', 'Paulaner Munchner', 270],
        ['Естрела 0,33', 'Estrella 0.33', 190],
        ['Митос', 'Mitos', 200],
        ['Хајнекен 0,25', 'Heineken 0.25', 170],
        ['Mitos Ice', 'Mitos Ice', 200],
        ['Бира Морети 0.33л', 'Birra Moretti 0.33l', 160],
        ['Flying Cloud IPA 0,5', 'Flying Cloud IPA 0.5', 230],
        ['Demon 0.5', 'Demon 0.5', 230],
        ['Radler', 'Radler', 160],
        ['Јагодинско пиво', 'Jagodinsko', 160]
      ]
    },
    {
      id: 'gin',
      mk: 'Џин',
      en: 'Gin',
      items: [
        ['Бифитер', 'Beefeater', 180],
        ['Бомбај', 'Bombay', 200],
        ['Хендрикс', 'Hendrick\'s', 250],
        ['Гордонс џин', 'Gordon\'s', 190],
        ['Гордонс пинк', 'Gordon\'s Pink', 190],
        ['Monkey 47', 'Monkey 47', 510],
        ['Танкерај', 'Tanqueray', 260],
        ['Танкерај ројал', 'Tanqueray Royale', 260]
      ]
    },
    {
      id: 'wine',
      mk: 'Вино',
      en: 'Wine',
      items: [
        ['Темјаника', 'Temjanika', 210],
        ['Александрија бело', 'Alexandria white', 230],
        ['Александрија црвена', 'Alexandria red', 230],
        ['Тга', 'Tga za jug', 210],
        ['Александрија розе', 'Alexandria rose', 230],
        ['Тиквеш наливно — црвено', 'Tikves draft — red', 170],
        ['Варено вино', 'Mulled wine', 210],
        ['Александрија куве црвено', 'Alexandria Cuvee red', 300],
        ['Александрија куве бело', 'Alexandria Cuvee white', 300],
        ['Александрија куве розе', 'Alexandria Cuvee rose', 300],
        ['Луда Мара флаша', 'Luda Mara bottle', 1410],
        ['Тиквеш наливно — бело', 'Tikves draft — white', 170],
        ['Луда Мара чаша', 'Luda Mara glass', 190],
        ['Просеко чаша', 'Prosecco glass', 230]
      ]
    },
    {
      id: 'vermouth',
      mk: 'Вермут',
      en: 'Vermouth',
      items: [
        ['Мартини бјанко', 'Martini Bianco', 180],
        ['Мартини росо', 'Martini Rosso', 180],
        ['Аперол', 'Aperol', 180],
        ['Кампари', 'Campari', 180],
        ['Пелинковац', 'Pelinkovac', 150],
        ['Јегермаистер', 'Jägermeister', 190]
      ]
    },
    {
      id: 'whiskey',
      mk: 'Виски',
      en: 'Whiskey',
      items: [
        ['Џек Даниелс', 'Jack Daniel\'s', 240],
        ['Џек Даниелс хани', 'Jack Daniel\'s Honey', 270],
        ['Џони Вокер', 'Johnnie Walker', 220],
        ['Џони Вокер блек', 'Johnnie Walker Black', 350],
        ['Џејмисон', 'Jameson', 220],
        ['Џим Бим', 'Jim Beam', 220],
        ['JB', 'JB', 210],
        ['Фоур роузес', 'Four Roses', 220],
        ['Саутерн комфорт', 'Southern Comfort', 210],
        ['Гленфидих', 'Glenfiddich', 290],
        ['Бушмилс', 'Bushmills', 230],
        ['Бушмилс блек', 'Bushmills Black', 270],
        ['Манки шолдер', 'Monkey Shoulder', 290],
        ['Кавалан сингл малт', 'Kavalan Single Malt', 420],
        ['Туламур', 'Tullamore D.E.W.', 250],
        ['Џек Даниелс сингл', 'Jack Daniel\'s Single Barrel', 360],
        ['Чивас', 'Chivas', 350],
        ['Димпл', 'Dimple', 390],
        ['Лагавулин 16', 'Lagavulin 16', 470],
        ['Лагавулин спешл', 'Lagavulin Special', 510],
        ['Хајланд парк', 'Highland Park', 350],
        ['Нејкед малт', 'Naked Malt', 260],
        ['Тенџаку', 'Tenjaku', 270],
        ['Џек епл', 'Jack Daniel\'s Apple', 240]
      ]
    },
    {
      id: 'vodka',
      mk: 'Вотка',
      en: 'Vodka',
      items: [
        ['Смирноф', 'Smirnoff', 180],
        ['Абсолут', 'Absolut', 190],
        ['Финландиа', 'Finlandia', 160],
        ['Греј гус', 'Grey Goose', 350]
      ]
    },
    {
      id: 'rum',
      mk: 'Рум',
      en: 'Rum',
      items: [
        ['Морган голд', 'Captain Morgan Gold', 180],
        ['Морган блек', 'Captain Morgan Black', 180],
        ['Бакарди', 'Bacardi', 180],
        ['Бадел рум', 'Badel rum', 140],
        ['Бругал рум', 'Brugal rum', 350]
      ]
    },
    {
      id: 'liqueur',
      mk: 'Ликер',
      en: 'Liqueur',
      items: [
        ['Амарето', 'Amaretto', 170],
        ['Бејлис', 'Baileys', 170],
        ['Калуа', 'Kahlúa', 170],
        ['Пелин винтер', 'Pelin Winter', 150]
      ]
    },
    {
      id: 'brandy',
      mk: 'Бренди',
      en: 'Brandy',
      items: [
        ['Шток', 'Stock', 170],
        ['Коњак', 'Cognac', 160],
        ['Badel cognac black', 'Badel cognac black', 170]
      ]
    },
    {
      id: 'rakija',
      mk: 'Ракии',
      en: 'Rakija',
      items: [
        ['Ракија лозова', 'Grape rakija', 140],
        ['Узо', 'Ouzo', 170],
        ['Мастика', 'Mastika', 150]
      ]
    },
    {
      id: 'cocktails',
      mk: 'Коктели',
      en: 'Cocktails',
      items: [
        ['Лонг ајленд', 'Long Island', 330],
        ['Виски саур', 'Whiskey sour', 310],
        ['Амарето саур', 'Amaretto sour', 290],
        ['Водка саур', 'Vodka sour', 300],
        ['Негрони', 'Negroni', 300],
        ['Том Колинс', 'Tom Collins', 300],
        ['Мохито', 'Mojito', 300],
        ['Аперол шприц', 'Aperol Spritz', 280],
        ['Олд фешнд', 'Old Fashioned', 280],
        ['Маргарита', 'Margarita', 280],
        ['Каипирошка', 'Caipiroska', 280],
        ['Каипириња', 'Caipirinha', 280],
        ['Блек рашн', 'Black Russian', 280],
        ['Вајт рашн', 'White Russian', 280],
        ['Џин сауер', 'Gin sour', 300],
        ['Брамбл', 'Bramble', 300],
        ['Годфадер саур', 'Godfather sour', 300],
        ['Годфадер', 'Godfather', 220],
        ['Безалкохолен коктел', 'Non-alcoholic cocktail', 210],
        ['Џејмисон саур', 'Jameson sour', 320],
        ['Вотка мартини', 'Vodka martini', 280],
        ['Хот тоди', 'Hot toddy', 300],
        ['Њујорк саур', 'New York sour', 320],
        ['Еспресо мартини', 'Espresso martini', 280],
        ['Пелин саур', 'Pelin sour', 280],
        ['Палома виолета', 'Paloma Violeta', 320],
        ['Ајриш мјул', 'Irish mule', 320],
        ['Даикири', 'Daiquiri', 300],
        ['Aperol sour promo', 'Aperol sour promo', 230],
        ['Коктел Марс', 'Mars cocktail', 230],
        ['Аперол шприц промо', 'Aperol Spritz promo', 240],
        ['Mexican mule', 'Mexican mule', 370],
        ['Булевардиер', 'Boulevardier', 320],
        ['Аперол саур', 'Aperol sour', 310],
        ['Кампари шприц', 'Campari Spritz', 240],
        ['Палома промо', 'Paloma promo', 270]
      ]
    },
    {
      id: 'tequila',
      mk: 'Текила',
      en: 'Tequila',
      items: [
        ['Хосе Куерво', 'Jose Cuervo', 180],
        ['Патрон силвер', 'Patrón Silver', 200],
        ['Патрон ањехо', 'Patrón Añejo', 340],
        ['Патрон репосадо', 'Patrón Reposado', 340]
      ]
    },
    {
      id: 'shots',
      mk: 'Шотови',
      en: 'Shots',
      items: [
        ['Шот Џејмисон', 'Jameson shot', 130],
        ['Шот Јегер', 'Jäger shot', 120],
        ['Шот пелин', 'Pelin shot', 120],
        ['Шот годфадер', 'Godfather shot', 120],
        ['Шот црнче', 'Crnche shot', 110],
        ['Шот B52', 'B52 shot', 130],
        ['Шот комфорт', 'Comfort shot', 110]
      ]
    },
    {
      id: 'extras',
      mk: 'Додатоци',
      en: 'Extras',
      items: [
        ['Пелистерка наливно', 'Pelisterka draft', 40],
        ['Густи сок', 'Thick juice', 50],
        ['Тоник наливен', 'Draft tonic', 40],
        ['Цеден лимон додаток', 'Fresh lemon extra', 30],
        ['Кока Кола наливен', 'Draft Coca-Cola', 40],
        ['Додаток рум', 'Rum extra', 70],
        ['Бејлис додаток', 'Baileys extra', 80],
        ['Monin', 'Monin', 40],
        ['Додаток плазма', 'Plazma extra', 30],
        ['Шумско овошје', 'Forest fruit extra', 40],
        ['Патрон шот', 'Patrón shot', 140]
      ]
    },
    {
      id: 'cedevita',
      mk: 'Цедевита',
      en: 'Cedevita',
      items: [
        ['Портокал цедевита', 'Orange Cedevita', 90],
        ['Зелен лимон цедевита', 'Lime Cedevita', 90],
        ['Лимон цедевита', 'Lemon Cedevita', 90],
        ['Мента цедевита', 'Mint Cedevita', 90]
      ]
    },
    {
      id: 'dose',
      mk: 'Че доза',
      en: 'Che dose',
      items: [
        ['Џејмисон Че доза', 'Jameson Che dose', 290],
        ['Манки шолдер Че доза', 'Monkey Shoulder Che dose', 380],
        ['Џони блек Че доза', 'Johnnie Black Che dose', 450],
        ['Гордонс Че доза', 'Gordon\'s Che dose', 250],
        ['Танкерај Че доза', 'Tanqueray Che dose', 340],
        ['Смирноф Че доза', 'Smirnoff Che dose', 240],
        ['Абсолут Че доза', 'Absolut Che dose', 250],
        ['Морган голд Че доза', 'Morgan Gold Che dose', 240],
        ['Јегер Че доза', 'Jäger Che dose', 250],
        ['Пелинковац Че доза', 'Pelinkovac Che dose', 200],
        ['Фоур роузес Че доза', 'Four Roses Che dose', 290],
        ['Шток Че доза', 'Stock Che dose', 220],
        ['Бомбај Че доза', 'Bombay Che dose', 280],
        ['Џек Даниелс Че доза', 'Jack Daniel\'s Che dose', 320],
        ['Џони Вокер Че доза', 'Johnnie Walker Che dose', 290],
        ['Саутерн комфорт Че доза', 'Southern Comfort Che dose', 280],
        ['Ракија Че доза', 'Rakija Che dose', 190],
        ['Хендрикс Че доза', 'Hendrick\'s Che dose', 340],
        ['Пелин винтер Че доза', 'Pelin Winter Che dose', 200],
        ['Туламур Че доза', 'Tullamore Che dose', 340],
        ['Кампари Че доза', 'Campari Che dose', 240]
      ]
    }
  ];

  const CATEGORY_ICONS = {
    coffee: 'fa-mug-hot',
    tea: 'fa-mug-saucer',
    soft: 'fa-bottle-water',
    togo: 'fa-glass-water',
    beer: 'fa-beer-mug-empty',
    gin: 'fa-martini-glass-citrus',
    wine: 'fa-wine-glass',
    vermouth: 'fa-wine-bottle',
    whiskey: 'fa-whiskey-glass',
    vodka: 'fa-martini-glass',
    rum: 'fa-bottle-droplet',
    liqueur: 'fa-martini-glass-empty',
    brandy: 'fa-wine-glass-empty',
    rakija: 'fa-glass-water-droplet',
    cocktails: 'fa-champagne-glasses',
    tequila: 'fa-lemon',
    shots: 'fa-martini-glass',
    extras: 'fa-plus',
    cedevita: 'fa-lemon',
    dose: 'fa-boxes-stacked'
  };

  const MENU_IMAGE_SRC = 'assets/menu/che_menu.jpg';

  let activeCategory = MENU[0].id;

  function lang() {
    return localStorage.getItem('che-lang') || 'mk';
  }

  function catName(cat) {
    return lang() === 'en' ? cat.en : cat.mk;
  }

  function itemName(item) {
    return lang() === 'en' ? item[1] : item[0];
  }

  function itemPrice(item) {
    return lang() === 'en' ? `${item[2]} den` : `${item[2]} ден`;
  }

  function itemRow(item) {
    return `
      <li class="menu-popup__item">
        <span class="menu-popup__item-name">${itemName(item)}</span>
        <span class="menu-popup__item-leader" aria-hidden="true"></span>
        <span class="menu-popup__item-price">${itemPrice(item)}</span>
      </li>`;
  }

  function renderCategory(id) {
    const cat = MENU.find(c => c.id === id) || MENU[0];
    const overlay = document.querySelector('.menu-popup-overlay');
    if (!overlay) return;
    overlay.querySelectorAll('.menu-popup__tab').forEach(btn => {
      btn.classList.toggle('is-active', btn.dataset.cat === cat.id);
    });
    const title = overlay.querySelector('[data-menu-cat-title]');
    const list = overlay.querySelector('[data-menu-list]');
    if (title) title.textContent = catName(cat);
    if (list) list.innerHTML = cat.items.map(itemRow).join('');
  }

  function isHomePage() {
    const page = location.pathname.split('/').pop() || 'index.html';
    return page === '' || page === 'index.html';
  }

  function menuImageAlt() {
    return lang() === 'en' ? 'Coffee Bar Che menu' : 'Мени на Кафе Бар Че';
  }

  function getHomeMenuCarousel() {
    return document.querySelector('[data-carousel][data-menu-mode]');
  }

  function getHomeMenuMode() {
    const root = getHomeMenuCarousel();
    return root?.dataset.menuMode === 'normal' ? 'normal' : 'oktoberfest';
  }

  function popupViewForMenuMode(mode) {
    return mode === 'normal' ? 'list' : 'image';
  }

  function menuModeForPopupView(view) {
    return view === 'list' ? 'normal' : 'oktoberfest';
  }

  function renderHomeMenuPreview(track, mode) {
    const openLabel = (window.cheI18n && window.cheI18n.t('menu.popup_open')) || 'Отвори мени';
    if (mode === 'oktoberfest') {
      track.innerHTML = `
        <button type="button" class="edition__menu-preview" data-menu-open aria-label="${openLabel}">
          <img src="${MENU_IMAGE_SRC}" alt="${menuImageAlt()}" loading="lazy" />
        </button>`;
      return;
    }

    track.innerHTML = `
      <button type="button" class="edition__menu-preview edition__menu-preview--classic" data-menu-open aria-label="${openLabel}">
        <span class="edition__menu-preview-icons" aria-hidden="true">
          <span class="edition__menu-preview-icons__hero"><i class="fa-solid fa-mug-hot"></i></span>
          <span class="edition__menu-preview-icons__row">
            <span class="edition__menu-preview-icons__cell"><i class="fa-solid fa-beer-mug-empty"></i></span>
            <span class="edition__menu-preview-icons__cell"><i class="fa-solid fa-martini-glass-citrus"></i></span>
          </span>
        </span>
      </button>`;
  }

  function setHomeMenuMode(mode) {
    const root = getHomeMenuCarousel();
    if (!root) return;
    const next = mode === 'normal' ? 'normal' : 'oktoberfest';
    root.dataset.menuMode = next;

    const track = root.querySelector('[data-carousel-track]');
    if (track) renderHomeMenuPreview(track, next);

    root.querySelectorAll('[data-menu-mode-btn]').forEach((btn) => {
      const active = btn.dataset.menuModeBtn === next;
      btn.classList.toggle('is-active', active);
      btn.setAttribute('aria-pressed', String(active));
    });
  }

  function toggleLabelForView(view) {
    const key = view === 'image' ? 'menu.view_classic' : 'menu.view_image';
    const en = lang() === 'en';
    const fallback = view === 'image'
      ? (en ? 'Coffee Bar Che menu' : 'Кафе Бар Че мени')
      : (en ? 'Menu image' : 'Мени слика');
    const text = window.cheI18n && window.cheI18n.t ? window.cheI18n.t(key) : key;
    return text && text !== key ? text : fallback;
  }

  function setMenuView(overlay, view) {
    const popup = overlay.querySelector('.menu-popup');
    const imagePanel = overlay.querySelector('[data-menu-panel="image"]');
    const listPanel = overlay.querySelector('[data-menu-panel="list"]');
    const toggle = overlay.querySelector('[data-menu-view-toggle]');
    if (!popup || !imagePanel || !listPanel) return;

    const isImage = view === 'image';
    popup.classList.toggle('menu-popup--image', isImage);
    popup.classList.toggle('menu-popup--list', !isImage);
    imagePanel.classList.toggle('is-active', isImage);
    imagePanel.hidden = !isImage;
    listPanel.classList.toggle('is-active', !isImage);
    listPanel.hidden = isImage;
    overlay.dataset.menuView = view;

    if (toggle) {
      toggle.textContent = toggleLabelForView(view);
      toggle.setAttribute('aria-pressed', String(!isImage));
    }

    const img = overlay.querySelector('.menu-popup__menu-image');
    if (img) img.alt = menuImageAlt();
  }

  function buildPopupHTML() {
    const tabs = MENU.map(cat => `
      <button type="button" class="menu-popup__tab${cat.id === activeCategory ? ' is-active' : ''}" data-cat="${cat.id}">
        ${catName(cat)}
      </button>`).join('');
    const first = MENU[0];
    const rows = first.items.map(itemRow).join('');
    return `<div class="menu-popup-overlay" data-menu-overlay aria-hidden="true" data-menu-view="image">
        <div class="menu-popup menu-popup--image" role="dialog" aria-modal="true" aria-labelledby="menu-popup-title">
          <div class="menu-popup__topbar">
            <button type="button" class="menu-popup__view-toggle" data-menu-view-toggle aria-pressed="false"></button>
            <button type="button" class="menu-popup__close" data-menu-close aria-label="" data-i18n-aria="menu.popup_close">&times;</button>
          </div>

          <div class="menu-popup__scroll">
            <div class="menu-popup__panel menu-popup__panel--image is-active" data-menu-panel="image">
              <img class="menu-popup__menu-image" src="${MENU_IMAGE_SRC}" alt="${menuImageAlt()}" loading="lazy" />
            </div>

            <div class="menu-popup__panel menu-popup__panel--list" data-menu-panel="list" hidden>
              <header class="menu-popup__header">
                <div class="menu-popup__brand-row">
                  <div class="menu-popup__brand">
                    <h2 id="menu-popup-title" class="menu-popup__title">КАФЕ БАР ЧЕ</h2>
                    <p class="menu-popup__subtitle" data-i18n="menu.popup_brand_sub">СКОПЈЕ</p>
                  </div>
                  <span class="menu-popup__year" aria-hidden="true">2026</span>
                </div>
              </header>

              <div class="menu-popup__tabs" role="tablist">${tabs}</div>

              <section class="menu-popup__category">
                <h3 class="menu-popup__cat-title" data-menu-cat-title>${catName(first)}</h3>
                <ul class="menu-popup__list" data-menu-list>${rows}</ul>
              </section>

              <footer class="menu-popup__notes">
                <p><strong data-i18n="menu.allergens_label"></strong> <span data-i18n="menu.allergens_text"></span></p>
                <p><strong data-i18n="menu.vegan_label"></strong> <span data-i18n="menu.vegan_text"></span></p>
              </footer>
            </div>
          </div>

          <div class="menu-popup__gingham" aria-hidden="true"></div>
        </div>
      </div>`;
  }

  function applyI18n() {
    if (window.cheI18n && window.cheI18n.setLanguage) {
      window.cheI18n.setLanguage(window.cheI18n.getCurrentLang());
    }
  }

  function openPopup(overlay, view) {
    const resolved = view || popupViewForMenuMode(getHomeMenuMode());
    setMenuView(overlay, resolved);
    overlay.setAttribute('aria-hidden', 'false');
    overlay.classList.add('is-open');
    document.body.classList.add('menu-popup-open');
    overlay.querySelector('.menu-popup__close')?.focus();
  }

  function closePopup(overlay) {
    overlay.classList.remove('is-open');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('menu-popup-open');
  }

  function initMenuPopup() {
    if (document.querySelector('.menu-popup-overlay')) return;

    document.body.insertAdjacentHTML('beforeend', buildPopupHTML());
    applyI18n();
    renderCategory(activeCategory);

    const overlay = document.querySelector('.menu-popup-overlay');

    setMenuView(overlay, 'image');

    const viewToggle = overlay.querySelector('[data-menu-view-toggle]');
    if (viewToggle) {
      viewToggle.addEventListener('click', () => {
        const next = overlay.dataset.menuView === 'list' ? 'image' : 'list';
        setMenuView(overlay, next);
        if (isHomePage()) setHomeMenuMode(menuModeForPopupView(next));
      });
    }

    overlay.querySelectorAll('.menu-popup__tab').forEach(btn => {
      btn.addEventListener('click', () => {
        activeCategory = btn.dataset.cat;
        renderCategory(activeCategory);
      });
    });

    document.addEventListener('click', (e) => {
      const trigger = e.target.closest('[data-menu-open]');
      if (!trigger) return;
      e.preventDefault();
      const mode = trigger.dataset.menuOpen;
      if (mode && isHomePage()) setHomeMenuMode(mode);
      openPopup(overlay, mode ? popupViewForMenuMode(mode) : undefined);
    });

    overlay.querySelector('[data-menu-close]').addEventListener('click', () => closePopup(overlay));

    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closePopup(overlay);
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && overlay.classList.contains('is-open')) {
        closePopup(overlay);
      }
    });

    document.addEventListener('che:langchange', () => {
      overlay.querySelectorAll('.menu-popup__tab').forEach(btn => {
        const cat = MENU.find(c => c.id === btn.dataset.cat);
        if (cat) btn.textContent = catName(cat);
      });
      renderCategory(activeCategory);
      setMenuView(overlay, overlay.dataset.menuView || 'image');
    });

    if (location.hash === '#menu' || /menu\.html$/i.test(location.pathname.split('/').pop() || '')) {
      openPopup(overlay);
      if (location.hash === '#menu') {
        history.replaceState(null, '', location.pathname + location.search);
      }
    }

  }

  /* ── Home — menu preview + normal / Oktoberfest toggle ── */
  function initMenuCarousel() {
    const root = getHomeMenuCarousel();
    const track = root?.querySelector('[data-carousel-track]');
    if (!root || !track) return;

    setHomeMenuMode(root.dataset.menuMode || 'oktoberfest');

    root.querySelectorAll('[data-menu-mode-btn]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const mode = btn.dataset.menuModeBtn;
        setHomeMenuMode(mode);
        const overlay = document.querySelector('.menu-popup-overlay');
        if (overlay?.classList.contains('is-open')) {
          setMenuView(overlay, popupViewForMenuMode(mode));
        }
      });
    });

    document.addEventListener('che:langchange', () => {
      setHomeMenuMode(getHomeMenuMode());
    });
  }

  window.initMenuPopup = initMenuPopup;
  window.initMenuCarousel = initMenuCarousel;
})();
