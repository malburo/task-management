import React from 'react';
import '../Loader/LoaderStyle.css';

export interface IParamChatRoom {
  id: string;
}

const Loader: React.FC = () => {
  return (
    <div className="wrap-loader">
      <div className="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loader;
