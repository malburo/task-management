import { RootState } from 'app/store';
import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import Message from './Message';
import MyMessage from './MyMessage';

interface Props {
  messageList: any[];
}

const MessageList: React.FC<Props> = ({ messageList }) => {
  const currentUser = useSelector((state: RootState) => state.auth.currentUser);
  return (
    <>
      {messageList.map((message: any) => (
        <Fragment key={message._id}>
          {currentUser?._id === message.user._id ? <MyMessage message={message} /> : <Message message={message} />}
        </Fragment>
      ))}
    </>
  );
};

export default MessageList;
