export interface Props {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  setGraphName: React.Dispatch<React.SetStateAction<string>>;
  graphName: string;
  handleSaveGraph: React.Dispatch<React.SetStateAction<string>>;
}
