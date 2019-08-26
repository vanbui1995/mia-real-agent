import React from 'react';
import moment from 'moment';
import { shape, arrayOf } from 'prop-types';
import Numeral from 'numeral';
import { Translation } from 'react-i18next';
import {
  TimerContainer, TimerStyled,
  TimerTitle, TimerValue,
} from './Timer.styled';
import { TICKET_STATUS } from '../../../../common/enums';

const TIME_TO_FORCE_UPDATE = 60000;


const sortTicketHistory = history => (history || [])
  .sort((h1, h2) => new Date(h1.startTime) - new Date(h2.startTime));

function calculateStatusTime(history, status) {
  if (!Array.isArray(history)) return 0;
  const sortedHistory = sortTicketHistory(history) || [];
  const logs = sortedHistory.filter(his => status.includes(his.currentStatus));
  if (logs.length <= 0) return 0;
  const totalTime = logs.reduce(
    (acc, log) => Math.ceil(acc + moment(log.endTime || new Date()).diff(log.startTime)), 0
  );
  return Math.ceil(moment.duration(totalTime, 'millisecond').asMinutes());
}

function getHourMinutes(durationInSecondInMinutes) {
  const hours = Number.parseInt(durationInSecondInMinutes / 60, 10);
  const minutes = durationInSecondInMinutes % 60;

  return {
    hours, minutes,
  };
}


class TimerWrapper extends React.PureComponent {
  static propTypes = {
    history: arrayOf(shape()),
  }

  static defaultProps = {
    history: [],
  }

  state = {}

  interval = null;

  componentDidMount() {
    this.interval = setInterval(() => {
      this.forceUpdate();
    }, TIME_TO_FORCE_UPDATE);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { history } = this.props;
    const pendingTime = getHourMinutes(calculateStatusTime(history, [TICKET_STATUS.OPEN, TICKET_STATUS.PENDING]));
    const processingTime = getHourMinutes(calculateStatusTime(history, [TICKET_STATUS.PROCESSING]));
    const holdTime = getHourMinutes(calculateStatusTime(history, [TICKET_STATUS.IDLE, TICKET_STATUS.OFFLINE]));
    const totalTime = {
      hours: pendingTime.hours + processingTime.hours + holdTime.hours,
      minutes: pendingTime.minutes + processingTime.minutes + holdTime.minutes,
    };


    return (
      <Translation>
        {
          t => (
            <TimerContainer>
              <TimerStyled span={6}>
                <TimerTitle>
                  {t('CONV_MESSAGE_BOX_TIMER_TOTAL')}
                </TimerTitle>
                <TimerValue>
                  <span>
                    {Numeral(totalTime.hours).format('00')}
                    :
                    {Numeral(totalTime.minutes).format('00')}
                  </span>
                </TimerValue>
              </TimerStyled>
              <TimerStyled span={6}>
                <TimerTitle>
                  {t('CONV_MESSAGE_BOX_TIMER_BILLABLE')}
                </TimerTitle>
                <TimerValue>
                  <span>
                    {Numeral(processingTime.hours).format('00')}
                  :
                    {Numeral(processingTime.minutes).format('00')}
                  </span>
                </TimerValue>
              </TimerStyled>
              <TimerStyled span={6}>
                <TimerTitle>
                  {t('CONV_MESSAGE_BOX_TIMER_HOLD')}
                </TimerTitle>
                <TimerValue>
                  <span>
                    {Numeral(holdTime.hours).format('00')}
                  :
                    {Numeral(holdTime.minutes).format('00')}
                  </span>
                </TimerValue>
              </TimerStyled>
              <TimerStyled span={6}>
                <TimerTitle>
                  {t('CONV_MESSAGE_BOX_TIMER_PENDING')}
                </TimerTitle>
                <TimerValue>
                  <span>
                    {Numeral(pendingTime.hours).format('00')}
                  :
                    {Numeral(pendingTime.minutes).format('00')}
                  </span>
                </TimerValue>
              </TimerStyled>
            </TimerContainer>
          )}
      </Translation>
    );
  }
}

export default TimerWrapper;
