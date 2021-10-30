import IOption from './option';

export default interface ISelectFormMessage {
  _id: String;
  isMultiSelect: Boolean;
  isAddNew: Boolean;
  options?: IOption[];
}
