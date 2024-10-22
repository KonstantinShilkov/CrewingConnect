import dayjs from 'dayjs';

export const calculateAge = dateOfBirth => {
  const today = new Date();
  const birthDate = new Date(dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

export const calculateTotalExperienceInDays = (fromDate, tillDate) => {
  let totalDays = 0;
  fromDate = dayjs(fromDate);
  tillDate = dayjs(tillDate);

  let daysInFirstMonth = 0;
  if (fromDate.date() !== 1) {
    daysInFirstMonth = fromDate.endOf('month').date() - fromDate.date() + 1;
  }
  totalDays += daysInFirstMonth;
  console.log(totalDays);

  const daysInLastMonth = tillDate.date();
  totalDays += daysInLastMonth;
  console.log(totalDays);

  if (fromDate.date() !== 1) {
    fromDate = fromDate.add(1, 'month').startOf('month');
  }
  // if (tillDate.date() !== tillDate.endOf('month').date()) {
  //   tillDate = tillDate.startOf('month');
  // tillDate = tillDate.subtract(1, 'month').endOf('month');

  // tillDate = tillDate.startOf('month');
  // }
  // } else {
  //   tillDate = tillDate.add(1, 'month').startOf('month');
  // }
  console.log(tillDate);
  console.log(fromDate);

  let fullMonths = tillDate.diff(fromDate, 'month');
  console.log(fullMonths);

  totalDays += fullMonths * 30;
  console.log(totalDays);

  return totalDays;
};

export const updatedFilteredExperienceInDays = experienceInDays => {
  const experienceMonths = Math.floor(experienceInDays / 30);
  const experienceDays = experienceInDays - experienceMonths * 30;
  return `${experienceMonths}m / ${experienceDays}d`;
};

// export const calculateTotalExperienceInDays = (fromDate, tillDate) => {
//   let totalDays = 0;
//   fromDate = dayjs(fromDate);
//   tillDate = dayjs(tillDate);

//   let daysInFirstMonth = 0;
//   if (fromDate.date() !== 1) {
//     daysInFirstMonth = fromDate.endOf('month').date() - fromDate.date() + 1;
//   }
//   totalDays += daysInFirstMonth;

//   const daysInLastMonth = tillDate.date();
//   totalDays += daysInLastMonth;
//   console.log(totalDays);

//   let fullMonths = tillDate.diff(fromDate, 'month');
//   console.log(fullMonths);
//   if (fromDate.date() > 1) {
//     fullMonths = Math.max(fullMonths - 1, 0);
//   }
//   totalDays += fullMonths * 30;
//   console.log(totalDays);

//   return totalDays;
// };

// This array to be used in case to add a new group of courses
// export const courses = [
//   { course: 'any new course to upload on the Firebase Store' },
// ];
