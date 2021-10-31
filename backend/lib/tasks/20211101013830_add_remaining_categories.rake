# frozen_string_literal: true
# rubocop:disable all

desc 'Add creativity, mindfulness and productivity categories'
task add_remaining_categories: :environment do
    category_creativity = Category.create(title: 'Creativity')
    category_mindfulness = Category.create(title: 'Mindfulness')
    category_productivity = Category.create(title: 'Productivity')
end
