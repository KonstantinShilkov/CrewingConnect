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

  const daysInLastMonth = tillDate.date();
  totalDays += daysInLastMonth;
  console.log(totalDays);

  let fullMonths = tillDate.diff(fromDate, 'month');
  console.log(fullMonths);
  if (fromDate.date() > 1) {
    fullMonths = Math.max(fullMonths - 1, 0);
  }
  totalDays += fullMonths * 30;
  console.log(totalDays);

  return totalDays;
};

export const updatedFilteredExperienceInDays = experienceInDays => {
  const experienceMonths = Math.floor(experienceInDays / 30);
  const experienceDays = experienceInDays - experienceMonths * 30;
  return `${experienceMonths}m / ${experienceDays}d`;
};
