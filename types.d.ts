interface Tipp {
  id: number;
  title: string;
  available_tipps: number;
  sum_tip_number: number;
  rating: number;
  winned_tip: number;
  winned_money: string;
  front_description: string;
  back_description: string;
  color: string;
  cover: string;
  video: string;
  price: number;
}

interface AuthCredentials {
  fullName: string;
  email: string;
  password: string;
  nickname: string;
}
