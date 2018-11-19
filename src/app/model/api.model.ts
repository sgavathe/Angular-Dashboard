
  export class SearchResults<T> {
    items: T[];
    total_count: number;
    incomplete_results: boolean;
  }
  
  export interface getstatsPin {
    pin: string;
  }

  export interface officeServiceModel{
    OCD:string,
    NAME:string,
    OFC_TYP:string,
    OFC_TYP_TXT:string,
    GEOCODE_ADDRESS:string,
    GEOCODE_CITY:string,
    GEOCODE_STATE:string,
    GEOCODE_ZIP:string,
    OPEN_DATE:string,
    CLOSE_DATE:string,
    PROCESS_DATE:string,
    ADDRESS:string,
    CITY:string,
    STATE:string,
    ZIP:string,
    SCORE:string,
    EFFECTIVE_START_DATE:string,
    EFFECTIVE_END_DATE:string,
    FORMATTED_ADDRESS:string,
    PHONE:string,
    RGN_NM:string,
    ADONUM:string,
    PRNT_OCD:string,
    FEI:string,
    VIDEO:string,
    rn:string,
    description:string,
    OBJECTID:string,
    ESRI_OID:string

  }
  
