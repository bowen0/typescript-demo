
export interface IToDoItem {
  status: 'active' | 'complete';
  value: string;
  key: number;
  onChange?: (item: IToDoItem) => void;
  onDelete?: () => void;
}
export interface IToDo {
  value: string;
  isOpen: boolean;
  options: IToDoItem[]
}