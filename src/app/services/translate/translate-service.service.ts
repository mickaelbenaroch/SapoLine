import { Injectable } from '@angular/core';
import { LanguageEnum } from 'src/app/enums/language-enum';

@Injectable({
  providedIn: 'root'
})
export class TranslateServiceService {
  hebrewDico: Dictionary<string> = {
    ["price"]: 'מחיר',
    ["Shirts & Tops"]: 'חולצות',
    ["Pants & Bottoms"]: 'מכנסיים',
    ["Coats & Jackets"]: 'מעילים & ג׳קטים',
    ["Dresses"] : 'שמלות',
    ["Shoes & Bags"] : 'נעליים & תיקים',
    ["Accessories"]:'אקססוריז',
    ["Add to cart"]:'הוסף לעגלה',
    ["Description"]: 'תיאור',
    ["Choose size"]: 'בחירת מידה',
    ["Choose quantity"]: 'בחירת כמות'
  };
  englishDico: Dictionary<string> = {
    ["price"]: 'price',
    ["Shirts & Tops"]: 'Shirts & Tops',
    ["Pants & Bottoms"]: 'Pants & Bottoms',
    ["Coats & Jackets"]: 'Coats & Jackets',
    ["Dresses"] : 'Dresses',
    ["Shoes & Bags"] : 'Shoes & Bags',
    ["Accessories"]:'Accessories',
    ["Add to cart"]: 'Add to cart',
    ["Description"]: 'Description',
    ["Choose size"]: 'Choose size',
    ["Choose quantity"]: 'Choose quantity'
  };
  public currentLanguage: LanguageEnum = LanguageEnum.English;
  
  constructor() { }

  translate(word: string): string {
    if (this.currentLanguage === LanguageEnum.English) {
        return this.hebrewDico[word];
    } else {
      return this.englishDico[word];
    }
  }
}
