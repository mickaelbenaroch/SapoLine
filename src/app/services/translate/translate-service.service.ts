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
    ["Choose quantity"]: 'בחירת כמות',
    ["Cart is empty!"]: 'העגלה ריקה!',
    ["Total: "]: 'סה״כ :',
    ["To Payment :"]: 'לתשלום :',
    ["Need help? Ask us"]: 'צריך עזרה? פנה אלינו',
    ["Payment text"]: "אצלנו התשלום לא נעשה באשראי דרך האתר,אלא הרבה יותר קל! מספיק לבחור אחד האפשרויות הבאות. לפי מה שנוח לכם תוכלו לשלם דרך אחת מפלטפורמוט התשלום או לחילופין לשלם במזומן לשליח בעת הגעת המוצר.",
    ["Whatsapp"]: "שלום, יש לי שאלה...",
    ["Phone to pay :"]: "מספר טלפון לתשלום (ספיר עוזר) :",
    ["PayWay :"]: "תשלום :",
    ["Choose color :"]: "בחר צבע:",
    ["Was Added Successfully to cart!"]: " התווסף לעגלה בהצלחה!",
    ["Close"]: "סגור",
    ["purple"]: "סגול",
    ["red"]: "סגול",
    ["green"]: "ירוק",
    ["yellow"]: "צהוב",
    ["bronze"]: "נחושת",
    ["gold"]: "זהב",
    ["silver"]: "כסף",
    ["black"]: "שחור",
    ["white"]: "לבן",
    ["brown"]: "חום",
    ["blue"]: "כחול",
    ["grey"]: "אפור",
    ["rose"]: "ורוד",
    ["camel"]: "קאמל",
    ["signin"]: "התחבר",
    ["signup"]: "הירשם",
    ["email"]: "אימייל:",
    ["password"]: "סיסמא:",
    ["confirm password"]: "אישור סיסמא:",
    ["forgot password"]: "שחכתי סיסמא",
    ["enter"]: "כניסה!",
    ["not a member"]: "עדיין לא הצטרפת? ",
    ["join us"]: "הירשם כאן",
    ["password not same"]: "הסיסמאות לא תואמות!",
    ["password error"]:"הסיסמא צריכה להיות לפחות 8 תווים!",
    ["mail error"]: "אימייל לא תקין!",
    ["something went wrong"]: "משהו השתבש!",
    ["got it"]: "הבנתי!",
    ["oops"]: "אופס!"
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
    ["Choose quantity"]: 'Choose quantity',
    ["Cart is empty!"]: 'Cart is empty!',
    ["Total: "]: "Total: ",
    ["To Payment :"]: "To Payment :",
    ["Need help? Ask us"]: "Need help? Ask us",
    ["Payment text"]: "You don't need to pay by credit card via the website, you can pay via one of the following payment platform or by cash on delivery.",
    ["Whatsapp"]: "Hi, I have a question ...",
    ["Phone to pay :"]: "Phone number to make payment (Sapir Ozer)",
    ["PayWay :"]: "Payment :",
    ["Choose color :"]: "Choose color :",
    ["Was Added Successfully to cart!"]:"Was Added Successfully to cart!",
    ["Close"]: "Close",
    ["purple"]: "purple",
    ["red"]: "red",
    ["green"]: "green",
    ["yellow"]: "yellow",
    ["bronze"]: "bronze",
    ["gold"]: "gold",
    ["silver"]: "silver",
    ["black"]: "black",
    ["white"]: "white",
    ["brown"]: "brown",
    ["blue"]: "blue",
    ["grey"]: "grey",
    ["rose"]: "rose",
    ["camel"]: "camel",
    ["signin"]: "Sign-In",
    ["signup"]: "Sign-Up",
    ["email"]: "Email:",
    ["password"]: "Passsword:",
    ["confirm password"]: "Confirm Password: ",
    ["forgot password"]: "Forgot Password? ",
    ["enter"]: "Enter!",
    ["not a member"]: "Not a member? ",
    ["join us"]: "Join us",
    ["password not same"]: "Password are not the same!",
    ["password error"]:"Password must be aat least 8 characters!",
    ["mail error"]: "Email is invalid!",
    ["something went wrong"]: "Something went wrong! Try again!",
    ["got it"]: "I got it!",
    ["oops"]: "Oops!"
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
