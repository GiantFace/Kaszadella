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

export const FIELD_NAMES = {
  fullName: "Teljes név",
  email: "Email",
  password: "Password",
  nickname: "Hogyan szólíthatunk?",
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
    winned_money: "340.090 Ft",
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
    winned_tip: 110,
    winned_money: "518.420 Ft",
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
    winned_money: "1.120.350 Ft",
    description:
      "A bajnokok csomagja! Kaszadella vezetésével most a legnagyobb nyeremények várnak rád. Duplázók, közepes oddsok és hatalmas tippek minden hétvégén!",
    color: "#ff5700",
    cover: "/images/Kaszadella_halal_kaszadella_pack.png",
    video: "/videos/kaszadella-pack.mp4",
    price: "9.990 Ft",
  },
];
