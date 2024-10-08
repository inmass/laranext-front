export interface UserType {
  id: number;
  email: string;
  phone: string;
  name: string;
  email_verified_at?: Date;
  created_at: Date;
  updated_at: Date;
  role: 'admin' | 'user';
  avatar: string;
  locale: string;
}
