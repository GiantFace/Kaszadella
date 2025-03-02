interface Tipp {
  id: number;
  title: string;
  available_tipps: number;
  sum_tip_number: number;
  rating: number;
  winned_tip: number;
  winned_money: string;
  description: string;
  color: string;
  cover: string;
  video: string;
  price: string;
}

interface AuthCredentials {
  fullName: string;
  email: string;
  password: string;
  nickname: string;
}
