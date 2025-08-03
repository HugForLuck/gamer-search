import { DocumentData } from '@angular/fire/firestore';

export interface Secret extends DocumentData {
  code: string;
}
