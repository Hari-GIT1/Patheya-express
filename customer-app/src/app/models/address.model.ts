export interface Address {

  _id?: string;

  label:
    'Home' |
    'Work' |
    'Other';

  fullName: string;

  phone: string;

  street: string;

  landmark?: string;

  city: string;

  state: string;

  country?: string;

  pincode: string;

  latitude?: number;

  longitude?: number;

  isDefault?: boolean;

  createdAt?: string;

  updatedAt?: string;

}