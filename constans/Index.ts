export const navigationLinks = [
  {
    href: "/library",
    label: "Library",
  },

  {
    img: "/icons/user.svg",
    selectedImg: "/icons/user-fill.svg",
    href: "/my-profile",
    label: "My Profile",
  },
];

export const adminSideBarLinks = [
  {
    img: "/icons/admin/home.svg",
    route: "/admin",
    text: "Home",
  },
  {
    img: "/icons/admin/users.svg",
    route: "/admin/users",
    text: "All Users",
  },
  {
    img: "/icons/admin/book.svg",
    route: "/admin/books",
    text: "All Books",
  },
  {
    img: "/icons/admin/bookmark.svg",
    route: "/admin/book-requests",
    text: "Borrow Requests",
  },
  {
    img: "/icons/admin/user.svg",
    route: "/admin/account-requests",
    text: "Account Requests",
  },
];

export const feedbacks = [
  {
    quote:
      '"Eleinte kételkedtem, hogy ez tényleg működni fog, de egyetlen nap alatt 40.000 Ft profitot értem el."',
    name: "Kovács János",
    description: "Kezdő sportfogadó",
    avatar: "/path/to/avatar1.jpg",
  },
  {
    quote:
      '"Nem hittem a saját szememnek, amikor a Kaszadella csomag tippei egy nap alatt 75.500 Ft profitot hoztak"',
    name: "Márvárosi Ákos",
    description: "Lelkes tanuló",
    avatar: "/path/to/avatar2.jpg",
  },
  {
    quote:
      '"Áhh.. Én ezt még mindig nem hiszem el, 200 ezres profitom lett a hónap végére, besz*rok!"',
    name: "Nagy Péter",
    description: "Profi sportfogadó",
    avatar: "/path/to/avatar3.jpg",
  },
  {
    quote:
      '"Egy elképesztő hozam: 150 ezret gyűjtöttem pár nap alatt a kaszásnál!"',
    name: "Kiss Mária",
    description: "Szenvedélyes fogadó",
    avatar: "/path/to/avatar4.jpg",
  },
  {
    quote:
      '"Én nem tudom kik ezek a tippmesterek de nagyon tudják a dolgukat."',
    name: "Szabó Gábor",
    description: "Kezdő tag",
    avatar: "/path/to/avatar5.jpg",
  },
  {
    quote: '"Najó gyerek dől a lóvé"',
    name: "Vazelviszki Ádám",
    description: "Futballrajongó",
    avatar: "/path/to/avatar6.jpg",
  },
];

export const FIELD_NAMES = {
  fullName: "Teljes név",
  email: "Email cím",
  password: "Jelszó",
};
export const FIELD_TYPES = {
  fullName: "text",
  email: "email",
  password: "password",
};

export const sampleTips = [
  {
    id: 1,
    title: "START Csomag",
    available_tipps: 42,
    sum_tip_number: 239,
    rating: 4.9,
    winned_tip: 80,
    winned_unity: 150,
    front_description:
      "Az első lépés a siker felé! Egy biztos kezdőcsomag, amellyel stabil alapokat építhetsz sportfogadásodhoz. Duplázók és közepes oddsok a hét minden napján!",
    back_description:
      "Hétköznap: 2db duplázó (2-2,5x)\nHétvégén: 3db duplázó, 1db közepes odds (2,5-5x)",
    color: "#1c1f40",
    cover: "/images/Kaszadella_halal_starter_pack.png",
    video: "/videos/start-pack.mp4",
    price: 6990,
  },
  {
    id: 2,
    title: "KASZA Csomag",
    available_tipps: 9,
    sum_tip_number: 150,
    rating: 4.7,
    winned_tip: 78,
    winned_unity: 110,
    front_description:
      "Itt kezdődhet az igazi aratás! A hét folyamán duplázókkal és közepes oddsokkal segítünk, hétvégére pedig jönnek az extra nagy tippek!",
    back_description:
      "Hétköznap: 2db duplázó  (2-2,5x)\nHétvégén: 3db duplázó, 3db közepes, 1db nagy tipp valamelyik napra",
    color: "#1c1f40",
    cover: "/images/Kaszadella_halal_casa_pack.png",
    video: "/videos/kasza-pack.mp4",
    price: 8990,
  },
  {
    id: 3,
    title: "KASZADELLA Csomag",
    available_tipps: 7,
    sum_tip_number: 90,
    rating: 4.5,
    winned_tip: 60,
    winned_unity: 273,
    front_description:
      "A bajnokok csomagja! Kaszadella vezetésével most a legnagyobb nyeremények várnak rád. Duplázók, közepes oddsok és hatalmas tippek minden hétvégén!",
    back_description:
      "Hétköznap: 2db duplázó, 2db közepes odds, 3db nagy tipp\nHétvégén: 6db duplázó, 3db közepes, 3db nagy tipp + 1 hétvégi nagy mix",
    color: "#1c1f40",
    cover: "/images/Kaszadella_halal_kaszadella_pack2.png",
    video: "/videos/kaszadella-pack.mp4",
    price: 0,
  },
];

export const layers = [
  {
    top: "0",
    left: "0",
    style: "",
    src: "morecoins.svg",
    alt: "Coins layer 1",
  },
  {
    top: "30vh",
    left: "20vw",
    style: "",
    src: "morecoins.svg",
    alt: "Coins layer 2",
  },
  {
    top: "50vh",
    left: "50vw",
    style: "",
    src: "morecoins.svg",
    alt: "Coins layer 3",
  },
  {
    top: "50vh",
    left: "50vw",
    style: "",
    src: "morecoins.svg",
    alt: "Coins layer 3 (duplicate)",
  },
  {
    top: "50vh",
    left: "0vw",
    style: "",
    src: "moneybag.svg",
    alt: "Moneybag",
    extraClass: "w-80 h-80",
  },
  {
    top: "450vh",
    left: "10vw",
    style: "",
    src: "morecoins.svg",
    alt: "Extra Coins",
  },
];

export const weeklyTipsByPackage: Record<number, Record<string, string[]>> = {
  // Basic csomag (id=1)
  1: {
    Hétfő: [
      "NB I: Ferencváros vs Újpest, végeredmény: 2-1, szögletek: 7, sárgalapok: 3, odds: 2.10",
    ],
    Kedd: [
      "Serie A: Atalanta vs Lazio, végeredmény: 1-1, szögletek: 5, sárgalapok: 2, odds: 2.50",
    ],
    Szerda: [
      "Premier League: Everton vs West Ham, végeredmény: 1-0, szögletek: 4, sárgalapok: 1, odds: 2.80",
    ],
    Csütörtök: [
      "Bundesliga: Hoffenheim vs Wolfsburg, végeredmény: 2-2, szögletek: 6, sárgalapok: 3, odds: 3.00",
    ],
    Péntek: ["Még nem kerültek fel a tippek"],
    Szombat: ["Még nem kerültek fel a tippek"],
    Vasárnap: ["Még nem kerültek fel a tippek"],
  },
  // Premium csomag (id=2)
  2: {
    Hétfő: [
      "La Liga: FB Barcelona vs Real Madrid, végeredmény: 3-1, szögletek: 8, sárgalapok: 3, odds: 2.50",
      "Premium tip 2: Nézd meg a korábbi mérkőzések trendjeit.",
    ],
    Kedd: [
      "Premier League: Liverpool vs Manchester United, végeredmény: 2-2, szögletek: 10, sárgalapok: 4, odds: 3.10",
    ],
    Szerda: [
      "Bundesliga: Bayern Munich vs Borussia Dortmund, végeredmény: 1-0, szögletek: 6, sárgalapok: 2, odds: 1.80",
    ],
    Csütörtök: [
      "Serie A: Juventus vs AC Milan, végeredmény: 2-1, szögletek: 7, sárgalapok: 3, odds: 2.20",
    ],
    Péntek: ["Még nem kerültek fel a tippek"],
    Szombat: ["Még nem kerültek fel a tippek"],
    Vasárnap: ["Még nem kerültek fel a tippek"],
  },
  // Ultimate csomag (id=3)
  3: {
    Hétfő: [
      "Champions League: Manchester City vs PSG, végeredmény: 2-0, szögletek: 9, sárgalapok: 2, odds: 1.75",
    ],
    Kedd: [
      "Champions League: Real Madrid vs Bayern Munich, végeredmény: 1-1, szögletek: 7, sárgalapok: 3, odds: 2.80",
    ],
    Szerda: [
      "Champions League: Liverpool vs Chelsea, végeredmény: 2-1, szögletek: 8, sárgalapok: 3, odds: 2.10",
    ],
    CSütörtök: [
      "Champions League: AC Milan vs Inter Milan, végeredmény: 1-0, szögletek: 6, sárgalapok: 2, odds: 2.50",
    ],
    Péntek: ["Még nem kerültek fel a tippek"],
    Szombat: ["Még nem kerültek fel a tippek"],
    Vasárnap: ["Még nem kerültek fel a tippek"],
  },
};
