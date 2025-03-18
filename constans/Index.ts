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
    description:
      "Az első lépés a siker felé! Egy biztos kezdőcsomag, amellyel stabil alapokat építhetsz sportfogadásodhoz. Duplázók és közepes oddsok a hét minden napján!",
    color: "#1c1f40",
    cover: "/images/Kaszadella_halal_starter_pack.png",
    video: "/videos/start-pack.mp4",
    price: "5.990 Ft",
  },
  {
    id: 2,
    title: "KASZA Csomag",
    available_tipps: 9,
    sum_tip_number: 150,
    rating: 4.7,
    winned_tip: 78,
    winned_unity: 110,
    description:
      "Itt kezdődhet az igazi aratás! A hét folyamán duplázókkal és közepes oddsokkal segítünk, hétvégére pedig jönnek az extra nagy tippek!",
    color: "#ff5733",
    cover: "/images/Kaszadella_halal_casa_pack.png",
    video: "/videos/kasza-pack.mp4",
    price: "8.990 Ft",
  },
  {
    id: 3,
    title: "KASZADELLA Csomag",
    available_tipps: 7,
    sum_tip_number: 90,
    rating: 4.5,
    winned_tip: 60,
    winned_unity: 273,
    description:
      "A bajnokok csomagja! Kaszadella vezetésével most a legnagyobb nyeremények várnak rád. Duplázók, közepes oddsok és hatalmas tippek minden hétvégén!",
    color: "#ff5700",
    cover: "/images/Kaszadella_halal_kaszadella_pack.png",
    video: "/videos/kaszadella-pack.mp4",
    price: "9.990 Ft",
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
