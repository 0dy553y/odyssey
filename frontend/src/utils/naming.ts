export const getHeadingFromCategory = (title: string): string => {
  switch (title) {
    case 'Exercise':
      return 'exercise more';
    case 'Habits':
      return 'improve my daily lifestyle';
    case 'Creativity':
      return 'be more creative';
    case 'Mindfulness':
      return 'be more mindful';
    case 'Productivity':
      return 'be more productive';
    default:
      return 'invalid category';
  }
};
