export interface Props {
  index: number;
  value: string;
  setSelectedGraph: React.Dispatch<React.SetStateAction<string>>;
  selectedGraph: string;
  selectedGraphName: string;
  selectedGraphUrl: string;
}
