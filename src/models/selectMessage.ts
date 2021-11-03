import IOption from './option';

export default interface ISelectFormMessage {
  _id: string;
  isMultiSelect: boolean;
  isAddNew: boolean;
  options?: IOption[];
}
