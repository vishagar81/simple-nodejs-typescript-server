export interface PopulationData {
  IDNation: string;
  Nation: string;
  IDYear: number;
  Year: string;
  Population: number;
  SlugNation: string;
}

export interface PopulationSource {
  measures: Array;
  annotations: object;
  name: sring;
  substitutions: [];
}

export interface PopulationResponse {
  data: PopulationData[];
  source: PopulationSource[];
}
