export const getTimefromUnix = (unix) => {
  const hours = new Date(unix * 1000).getHours();
  const minutes = new Date(unix * 1000).getMinutes();
  const twoDigitMinutes = minutes.toString().padStart(2, "0");
  return `${hours}:${twoDigitMinutes}`;
};

export const getDatefromUnix = (unix) => {
  const dayReceived = new Date(unix * 1000).getDay();
  const date = new Date(unix * 1000).getDate();
  const monthReceived = new Date(unix * 1000).getMonth();

  let day;
  let month;
  // eslint-disable-next-line default-case
  switch (dayReceived) {
    case 0:
      day = "Sunday";
      break;
    case 1:
      day = "Monday";
      break;
    case 2:
      day = "Tuesday";
      break;
    case 3:
      day = "Wednesday";
      break;
    case 4:
      day = "Thursday";
      break;
    case 5:
      day = "Friday";
      break;
    case 6:
      day = "Saturday";
  }

  // eslint-disable-next-line default-case
  switch (monthReceived) {
    case 0:
      month = "Jan";
      break;
    case 1:
      month = "Feb";
      break;
    case 2:
      month = "Mar";
      break;
    case 3:
      month = "Apr";
      break;
    case 4:
      month = "May";
      break;
    case 5:
      month = "Jun";
      break;
    case 6:
      month = "Jul";
      break;
    case 7:
      month = "Aug";
      break;
    case 8:
      month = "Sep";
      break;
    case 9:
      month = "Oct";
      break;
    case 10:
      month = "Nov";
      break;
    case 11:
      month = "Dec";
      break;
  }

  return `${day}, ${date} ${month}`;
};

export default getTimefromUnix;

//   const getDatefromUnix = (unix) => {
//     const dayReceived = new Date(unix * 1000).getDay();
//     const date = new Date(unix * 1000).getDate();
//     const monthReceived = new Date(unix * 1000).getMonth();

//     let day;
//     let month;
//     // eslint-disable-next-line default-case
//     switch (dayReceived) {
//       case 0:
//         day = "Sunday";
//         break;
//       case 1:
//         day = "Monday";
//         break;
//       case 2:
//         day = "Tuesday";
//         break;
//       case 3:
//         day = "Wednesday";
//         break;
//       case 4:
//         day = "Thursday";
//         break;
//       case 5:
//         day = "Friday";
//         break;
//       case 6:
//         day = "Saturday";
//     }

//     // eslint-disable-next-line default-case
//     switch (monthReceived) {
//       case 0:
//         month = "Jan";
//         break;
//       case 1:
//         month = "Feb";
//         break;
//       case 2:
//         month = "Mar";
//         break;
//       case 3:
//         month = "Apr";
//         break;
//       case 4:
//         month = "May";
//         break;
//       case 5:
//         month = "Jun";
//         break;
//       case 6:
//         month = "Jul";
//       case 7:
//         month = "Aug";
//         break;
//       case 8:
//         month = "Sep";
//         break;
//       case 9:
//         month = "Oct";
//         break;
//       case 10:
//         month = "Nov";
//         break;
//       case 11:
//         month = "Dec";
//         break;
//     }

//     return `${day}, ${date} ${month}`;
//   };
