import { Entity } from "../../../shared/types";

export interface PlaceSearchResult extends Entity {
  display: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  name?: string;
  properties: {
    country?: string;
    countryCode?: string;
    county?: string;
    street?: string;
    city?: string;
    type?: string;
  };
}
