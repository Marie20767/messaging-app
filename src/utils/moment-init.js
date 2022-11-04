import moment from 'moment';

moment.updateLocale('en', {
  relativeTime: {
    future: 'in %s',
    past: '%s',
    s: 'now',
    ss: 'now',
    m: '%dmin',
    mm: '%dmin',
    h: '%dh',
    hh: '%d hours',
    d: 'a day',
    dd: '%d days',
    w: 'a week',
    ww: '%d weeks',
    M: '1 month ago',
    MM: '%d months',
    y: 'a year',
    yy: '%d years',
  },
});
