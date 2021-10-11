export const getHeadingFromCategory = (title: string): string => {
  switch (title) {
    case 'Hobbies':
      return 'learn a new hobby';
    case 'Exercise':
      return 'exercise more';
    case 'Habits':
      return 'pick up a habit';
    default:
      return 'invalid category';
  }
};
