export interface Patient {
  isActive: boolean;
  id: number;
  name: string;
  email: string;
  age: number;
  gender: string;
  address: string;
  medicalHistory: string;
  currentMedication: string;
  allergies: string;
  contactDetails: [{ id: number; name: string; phoneNumber: string }];
}
