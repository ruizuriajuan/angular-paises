import { Pais } from "./country.interface";
import { Regions } from "./region.type";

export interface CacheStore {
    byCountries: TermCountries;
    byCapital: TermCountries;
    byRegion:RegionCountries;
}

export interface TermCountries {
    term:string;
    countries: Pais[]
}

export interface RegionCountries {
    region?:Regions;
    countries: Pais[]
}