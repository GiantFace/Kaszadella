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
  nickname: "Becenév",
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

export interface TipItemData {
  title: string;
  tip: string;
  odds?: string; // decimális számként értelmezendő (pl. "1.56")
}

// constants/Index.ts

export interface TipItemData {
  title: string;
  tip: string;
  odds?: string; // decimális számstring (például "1.56") vagy üres, ha nem vesszük figyelembe az odds-szorzáshoz
}

export const weeklyTipsByPackage: Record<
  number,
  Record<string, TipItemData[]>
> = {
  // Basic csomag (id=1)
  1: {
    Hétfő: [
      { title: "Nincs tipp", tip: "Még nem kerültek fel a tippek", odds: "" },
    ],
    Kedd: [
      { title: "Nincs tipp", tip: "Még nem kerültek fel a tippek", odds: "" },
    ],
    Szerda: [
      { title: "Nincs tipp", tip: "Még nem kerültek fel a tippek", odds: "" },
    ],
    Csütörtök: [
      { title: "Nincs tipp", tip: "Még nem kerültek fel a tippek", odds: "" },
    ],
    Péntek: [
      { title: "Nincs tipp", tip: "Még nem kerültek fel a tippek", odds: "" },
    ],
    Szombat: [
      { title: "Nincs tipp", tip: "Még nem kerültek fel a tippek", odds: "" },
    ],
    Vasárnap: [
      { title: "Nincs tipp", tip: "Még nem kerültek fel a tippek", odds: "" },
    ],
  },
  // Premium csomag (id=2)
  2: {
    Hétfő: [
      { title: "Nincs tipp", tip: "Még nem kerültek fel a tippek", odds: "" },
    ],
    Kedd: [
      { title: "Nincs tipp", tip: "Még nem kerültek fel a tippek", odds: "" },
    ],
    Szerda: [
      { title: "Nincs tipp", tip: "Még nem kerültek fel a tippek", odds: "" },
    ],
    Csütörtök: [
      { title: "Nincs tipp", tip: "Még nem kerültek fel a tippek", odds: "" },
    ],
    Péntek: [
      { title: "Nincs tipp", tip: "Még nem kerültek fel a tippek", odds: "" },
    ],
    Szombat: [
      { title: "Nincs tipp", tip: "Még nem kerültek fel a tippek", odds: "" },
    ],
    Vasárnap: [
      { title: "Nincs tipp", tip: "Még nem kerültek fel a tippek", odds: "" },
    ],
  },
  // Ultimate csomag (id=3)
  3: {
    Hétfő: [
      { title: "", tip: "3-as kötés", odds: "" },
      {
        title: "Bournemouth - Fulllham",
        tip: "Igen és több mint 2,5 (Mindkét csapat szerez gólt)",
        odds: "1.91",
      },
      {
        title: "AIK Stockholm - FF Malmö",
        tip: "Igen (Mindkét csapat szerez gólt)",
        odds: "1.86",
      },
      { title: "Honvéd - Gyirmót", tip: "Honvéd (1x2)", odds: "1.95" },
      { title: "------------------------", tip: "", odds: "" },
      { title: "", tip: "2-es kötés", odds: "" },
      {
        title: "Bournemouth - Fullham",
        tip: "Több mint 0,5 (1. félidő - Büntetőlap-szám 0,5)",
        odds: "1.20",
      },
      {
        title: "Hull City - Coventry",
        tip: "Igen (Mindkét csapat szerez gólt)",
        odds: "1.72",
      },
      { title: "------------------------", tip: "", odds: "" },
      { title: "", tip: "1-es kötés - Fogadáskészítő", odds: "" },
      {
        title: "Atl. Madrid -  Valladolid",
        tip: "Atl Madrid 1. félidő - 1x2 + Atl. Madrid Szöglet hendikep -3,5",
        odds: "2.25",
      },
      { title: "------------------------", tip: "", odds: "" },
      { title: "", tip: "2-es kötés", odds: "" },
      {
        title: "Honvéd - Gyirmót",
        tip: "Igen (Mindkét csapat szerez gólt)",
        odds: "1.61",
      },
      {
        title: "Bournemouth - Fullham",
        tip: "Igen (Mindkét csapat szerez gólt)",
        odds: "1.55",
      },
      { title: "------------------------", tip: "", odds: "" },
      { title: "", tip: "2-es kötés", odds: "" },
      { title: "Crotone - Foggia", tip: "Crotone (1x2)", odds: "1.34" },
      {
        title: "AC Capri - Legnago",
        tip: "AC Capri (Döntetlennél a tét visszajár)",
        odds: "1.42",
      },
      { title: "------------------------", tip: "", odds: "" },
      { title: "", tip: "2-es kötés", odds: "" },
      {
        title: "Maccabi TA - Maccabi Haifa",
        tip: "Maccabi TA (1x2)",
        odds: "1.61",
      },
      { title: "AZ Alkmaar 2 - Volendam", tip: "Volendam (1x2)", odds: "1.70" },
    ],
    Kedd: [
      { title: "", tip: "2-es kötés fogadáskészítő", odds: "" },
      {
        title: "Dortumund - Barcelona",
        tip: "Igen, mind két csapat szerez gólt + 1 - 3 Vendégcsaat gólszámok",
        odds: "1.67",
      },
      {
        title: "Dortumund - Barcelona",
        tip: "Igen (Mindkét csapat kap büntetőlapot)",
        odds: "1.20",
      },
      { title: "------------------------", tip: "", odds: "" },
      { title: "", tip: "4-es kötés", odds: "" },
      {
        title: "Dortumnd - Barcelona",
        tip: "Igen (Mindkét csapat kap büntetőlapot)",
        odds: "1.20",
      },
      {
        title: "Dortumnd - Barcelona",
        tip: "1 - 3 (Vendégcsapat gólszámok)",
        odds: "1.26",
      },
      {
        title: "Aston Villa - Paris SG",
        tip: "Igen mindkét csapat szerez gólt + 1-3 vendégcsapat gólszámok",
        odds: "1.67",
      },
      {
        title: "Aston Villa - Paris SG",
        tip: "Igen, mindkét csapat kap büntető lapot",
        odds: "1.15",
      },
      { title: "------------------------", tip: "", odds: "" },
      { title: "", tip: "2-es kötés", odds: "" },
      {
        title: "Wuhan Tree Towns - Beijing Guoan",
        tip: "Beijing Guoan (1. félidő - 1x2)",
        odds: "2.11",
      },
      {
        title: "Shenzhen Peng City - Changchun Yatai",
        tip: "2-3 (Gólszám)",
        odds: "1.96",
      },
      { title: "------------------------", tip: "", odds: "" },
      { title: "", tip: "2-es kötés", odds: "" },
      {
        title: "Dortmund - Barcelona",
        tip: "Barcelona Hendikep 1:0 + Vendégcsapat szögletszám több mint 4,5 + Büntetőlap-szám több mint 1,5",
        odds: "5.80",
      },
      {
        title: "DAston Villa - Paris SG",
        tip: "Döntetlen vagy Paris SG + 1. félidő szögletszám több mint 3,5",
        odds: "1.79",
      },
      { title: "------------------------", tip: "", odds: "" },
      { title: "", tip: "4-es kötés", odds: "" },
      {
        title: "Bayern München - Crvena zvedzda",
        tip: "Bayern München (A mérkőzés győztese)",
        odds: "1.58",
      },
      {
        title: "Real Madrid - Paris BC",
        tip: "Real Madrid (A mérkődés győztese)",
        odds: "1.26",
      },
      {
        title: "Benidorm - Bidasoa Irun",
        tip: "Bidasoa Irun (1x2)",
        odds: "1.31",
      },
      {
        title: "Olympique Akbou - MC Alger",
        tip: "MC Alger (1x2)",
        odds: "1.78",
      },
    ],
    Szerda: [
      { title: "------------------------", tip: "", odds: "" },
      { title: "", tip: "2-es kötés", odds: "" },
      { title: "Nafta - Maribor", tip: "Karibor (1x2)", odds: "1.43" },
      {
        title: "Real Madrid - Arsenal",
        tip: "Hazai csapat gólszám több mint 1,5",
        odds: "1.43",
      },
      { title: "------------------------", tip: "", odds: "" },
      { title: "", tip: "2-es kötés", odds: "" },

      {
        title: "Internazionale - Bayern München",
        tip: "Igen, mindkét csapat szerez gólt",
        odds: "1.57",
      },
      {
        title: "Real Madrid - Arsenal",
        tip: "Hazai és több (1x2 + Gólszám 2,5",
        odds: "2.29",
      },
      { title: "", tip: "4-es kötés", odds: "" },
      { title: "------------------------", tip: "", odds: "" },
      {
        title: "Newcastle - Crystal Palace",
        tip: "Newcastle szöglet hendikep -0,5 + Crystal Palace kap több büntetőlapot",
        odds: "2.55",
      },
      {
        title: "Shanghai Shenhua - Hainiu",
        tip: "Shanghai Shenhua (1. félidő - 1x2)",
        odds: "1.42",
      },
      {
        title: "Jihlava - Zlín",
        tip: "Döntetlen vagy Zlín (Kétesély)",
        odds: "1.21",
      },
      {
        title: "Lyn - Stabek",
        tip: "Döntetlen vagy Stabek (Kétesély)",
        odds: "1.35",
      },
      { title: "------------------------", tip: "", odds: "" },
      { title: "", tip: "3-es kötés", odds: "" },

      {
        title: "Real Madrid - Arsenal",
        tip: "Arsenal szöglet hendikep -6,5",
        odds: "1.48",
      },
      {
        title: "Internaczionale - Bayern München",
        tip: "Hazai csapat szögletszám több mint 3,5",
        odds: "1.57",
      },
      {
        title: "Internaczionale - Bayern München",
        tip: "1-3 (Vendégcsapat - Gólszámok)",
        odds: "1.27",
      },
      { title: "------------------------", tip: "", odds: "" },
      { title: "", tip: "2-es kötés", odds: "" },

      {
        title: "Newcastle - Crystal Palace",
        tip: "Newcastle -0,5 szöglet hendikep",
        odds: "1.51",
      },
      {
        title: "Internazionale - Bayern München",
        tip: "Hazai csapat szögletszám több mint 3,5",
        odds: "1.57",
      },
      { title: "------------------------", tip: "", odds: "" },
      { title: "", tip: "2-es kötés", odds: "" },

      {
        title: "Once Caldas - Dep. La Equidad",
        tip: "Ince Caldas (1x2)",
        odds: "1.57",
      },
      { title: "Silkeborg - Aalborg", tip: "Sikelborg (1x2)", odds: "1.62" },
    ],
    Csütörtök: [
      { title: "Nincs tipp", tip: "Még nem kerültek fel a tippek", odds: "" },
    ],
    Péntek: [
      { title: "Nincs tipp", tip: "Még nem kerültek fel a tippek", odds: "" },
    ],
    Szombat: [
      { title: "Nincs tipp", tip: "Még nem kerültek fel a tippek", odds: "" },
    ],
    Vasárnap: [
      {
        title: "",
        tip: "9-es kötés",
        odds: "", // Ezt nem vesszük figyelembe az odds-szorzáshoz, ha nincs numerikus érték
      },
      {
        title: "Utrecht - Groningen",
        tip: "Utrecht (1x2)",
        odds: "1.56",
      },
      {
        title: "Atlanta - Bologna",
        tip: "Igen (Mind két csapat szerez gólt)",
        odds: "1.73",
      },
      {
        title: "Aberdenn - Rangers",
        tip: "Igen (Mind két csapat szerez gólt)",
        odds: "1.51",
      },
      {
        title: "Arda Kardzsali - Lokomotív szófia",
        tip: "Arda Kardzsali (1x2)",
        odds: "1.58",
      },
      {
        title: "RFC Liege - Genk 2",
        tip: "RFC Liege (1x2)",
        odds: "1.59",
      },
      {
        title: "Newcastle - Manchester Utd.",
        tip: "Newcastle (1x2)",
        odds: "1.51",
      },
      {
        title: "Celje - Mura",
        tip: "Celje (1x2)",
        odds: "1.32",
      },
      {
        title: "Sivasspor - Fenerbache",
        tip: "Fenerbache (1x2)",
        odds: "1.27",
      },
      {
        title: "Bohemians 1905 - Plzen",
        tip: "Plzen (1x2)",
        odds: "1.65",
      },
      // Elválasztó vonal
      { title: "------------------------", tip: "", odds: "" },
      {
        title: "",
        tip: "3-as kötés",
        odds: "",
      },
      {
        title: "Olympiakosz - AEK Athén",
        tip: "Olympiakosz (1x2)",
        odds: "1.75",
      },
      {
        title: "Audace Ceringnola - Benevento",
        tip: "Audice Ceringola (1x2)",
        odds: "1.97",
      },
      {
        title: "Bohemians 1905 - Plzen",
        tip: "Plzen (1x2)",
        odds: "1.65",
      },
      { title: "------------------------", tip: "", odds: "" },
      {
        title: "",
        tip: "3-as kötés",
        odds: "",
      },
      {
        title: "Münster - Karlsruhe",
        tip: "Igen és több mint 2,5 (Mindkét csapat szerez gólt + Gólszám 2,5)",
        odds: "2.01",
      },
      {
        title: "Lugano - St. Gallen",
        tip: "2-3 (Gólszám)",
        odds: "2.02",
      },
      {
        title: "Cesena - Frosinone",
        tip: "Nem (Vendégcsapat kapott gól nélkül játsza le a mérkőzést)",
        odds: "1.29",
      },
    ],
  },
};
