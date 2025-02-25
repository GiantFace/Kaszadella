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
  universityId: "number",
  password: "password",
};

export const sampleTips = [
  {
    id: 1,
    title: "Start pack",
    available_tipps: 42,
    sum_tip_number: 239,
    rating: 4.9,
    winned_tip: 80,
    winned_money: "340.090 Ft",
    description:
      "Több mint tíz éve dolgozom azon, hogy a lehető legjobb tippeket nyújtsam. A tapasztalataim alapján olyan fogadási stratégiákat dolgoztam ki, amelyek a legnehezebb helyzetekben is eredményesek.",
    color: "#1c1f40",
    cover: "",
    video: "",
  },
  {
    id: 2,
    title: "Casa Pack",
    available_tipps: 9,
    sum_tip_number: 150,
    rating: 4.7,
    winned_tip: 110,
    winned_money: "518.420 Ft",
    description:
      "Az évek során megtanultam, hogy a gyorsaság és a pontosság kulcsfontosságú a sportfogadásban. Az elemzéseim és tapasztalataim segítségével mindig a legjobb tippeket tudom nyújtani.",
    color: "#ff5733",
    cover: "",
    video: "",
  },
  {
    id: 3,
    title: "Kaszadella Pack",
    available_tipps: 7,
    sum_tip_number: 90,
    rating: 4.5,
    winned_tip: 60,
    winned_money: "1.120.350 Ft",
    description:
      "Hosszú évek óta foglalkozom sportfogadással, és ez idő alatt olyan stratégiákat fejlesztettem ki, amelyekkel a legösszetettebb helyzetekben is magabiztos döntéseket hozok.",
    color: "#ff5700",
    cover: "",
    video: "",
  },
];
