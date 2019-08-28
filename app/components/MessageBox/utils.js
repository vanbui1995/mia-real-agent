import { REPLY_TYPE } from '../../../common/enums';
import { compareDate } from '../../utils/func-utils';

export const combineChat = (replyMessages = []) => {
  const combined = [];
  replyMessages.sort(({ sentAt: a }, { sentAt: b }) => compareDate(a, b)).forEach((message) => {
    const {
      _id, from, type, params,
      messages, sentAt,
    } = message;
    if (type === REPLY_TYPE.TICKET_STATUS
      || type === REPLY_TYPE.USER_ACTION
      || type === REPLY_TYPE.RATING_ACTION
    ) {
      combined.push({
        _id: combined.length, type, from, params, sentAt,
      });
      return;
    }
    if (combined.length > 0) {
      const lastCombined = combined[combined.length - 1];
      const { from: last, contents = [], type: lastType } = lastCombined;
      if (lastType === REPLY_TYPE.TICKET_STATUS || lastType === REPLY_TYPE.USER_ACTION) {
        combined.push({
          _id: combined.length, type, from, contents: [{ _id, messages, sentAt }],
        });
        return;
      }
      if (last === from) {
        combined[combined.length - 1] = {
          ...lastCombined,
          contents: contents.concat({ _id, messages, sentAt }),
        };
      } else {
        combined.push({
          _id: combined.length, type, from, contents: [{ _id, messages, sentAt }],
        });
      }
    } else {
      combined.push({
        _id: combined.length, type, from, contents: [{ _id, messages, sentAt }],
      });
    }
  });
  return combined;
};
