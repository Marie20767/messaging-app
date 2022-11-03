import { getFormattedMessageTime, getMinutesIfLessThanOneHourAgo } from '../../../utils/utils';

const MessageTimestamp = ({ message, isMoreThanAnHourAgo }) => {
  if (isMoreThanAnHourAgo) {
    return <p className="timestamp">{getFormattedMessageTime(message)}</p>;
  }

  return <p className="timestamp">{getMinutesIfLessThanOneHourAgo(message)}</p>;
};

export default MessageTimestamp;
