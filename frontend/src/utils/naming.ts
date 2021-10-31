export const getHeadingFromCategory = (title: string): string => {
  switch (title) {
    case 'Hobbies':
      return 'learn a new hobby';
    case 'Exercise':
      return 'exercise more';
    case 'Habits':
      return 'improve my daily lifestyle';
    case 'Creativity':
      return 'be more creative';
    case 'Mindfulness':
      return 'be more mindful';
    default:
      return 'invalid category';
  }
};
