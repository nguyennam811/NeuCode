import moment from 'moment';

const formatTime = (date) => {
  const seconds = Math.floor((Date.now() - Date.parse(date)) / 1000);

  let n = Math.floor(seconds / 86400);
  if (n > 0 && n < 8) {
    return n + ' days ago';
  }

  if (n > 7) {
    return moment(date).format('DD-MM-yyyy');
  }

  n = Math.floor(seconds / 3600);
  if (n >= 1) {
    return n + ' hours ago';
  }

  n = Math.floor(seconds / 60);
  if (n >= 1) {
    return n + ' minutes ago';
  }

  if (seconds < 10) return 'just now';

  return Math.floor(seconds) + ' seconds ago';
};

export const formatResponseTime = (createTime) => {
  if (!createTime) return '';

  return formatTime(createTime);
};
