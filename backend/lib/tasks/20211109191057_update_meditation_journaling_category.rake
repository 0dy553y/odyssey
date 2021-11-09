# frozen_string_literal: true

desc 'Update categories for Meditation challenge & Gratitude Journaling challenge'
task update_meditation_journaling_category: :environment do
  category_mindfulness = Category.find_by(title: 'Mindfulness')
  Challenge.find_by(name: 'Meditation').update(category_id: category_mindfulness.id)
  Challenge.find_by(name: 'Gratitude Journaling').update(category_id: category_mindfulness.id)
end
