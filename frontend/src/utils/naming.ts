export const getHeadingFromCategory = (title: string): string => {
  switch (title) {
    case 'Hobbies':
      return 'learn a new hobby';
    case 'Exercise':
      return 'exercise more';
    case 'Habits':
      return 'pick up a habit';
    case 'Creative':
      return 'be more creative';
    default:
      return 'invalid category';
  }
};
