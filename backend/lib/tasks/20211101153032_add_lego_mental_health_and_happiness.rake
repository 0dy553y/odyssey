# frozen_string_literal: true
# rubocop:disable all

desc 'Add LEGO challenge, Mental Health challenge, and Happiness challenge'
task add_lego_mental_health_and_happiness: :environment do
  user_odyssey = User.find_by(username: 'odyssey')

  category_exercise = Category.find_by(title: 'Exercise')
  category_habits = Category.find_by(title: 'Habits')
  category_creativity = Category.find_by(title: 'Creativity')
  category_mindfulness = Category.find_by(title: 'Mindfulness')
  category_productivity = Category.find_by(title: 'Productivity')

  ########################################################################

  ActiveRecord::Base.transaction do
    challenge_lego_desc = 'Need inspiration as to what to build with LEGO? Take on this challenge and come up with creative designs centered around a different theme every day!'
    challenge_lego = Challenge.create(category_id: category_creativity.id,
                                      name: 'LEGO',
                                      description: challenge_lego_desc,
                                      duration: 30,
                                      schedule: 'Every day for 1 month',
                                      creator_id: user_odyssey.id,
                                      color: 3,
                                      original_creator: 'Fun Learning for Kids',
                                      link_to_reference: 'https://funlearningforkids.com/lego-challenge-calendar-building-ideas/')
    Task.create(challenge_id: challenge_lego.id,
                name: 'Day 1',
                description: 'Make something tall',
                index: 0)
    Task.create(challenge_id: challenge_lego.id,
                name: 'Day 2',
                description: 'Make something that flies',
                index: 1)
    Task.create(challenge_id: challenge_lego.id,
                name: 'Day 3',
                description: 'Make something that floats',
                index: 2)
    Task.create(challenge_id: challenge_lego.id,
                name: 'Day 4',
                description: 'Make something you can find in space',
                index: 3)
    Task.create(challenge_id: challenge_lego.id,
                name: 'Day 5',
                description: 'Make something you can find in the ocean',
                index: 4)
    Task.create(challenge_id: challenge_lego.id,
                name: 'Day 6',
                description: 'Make a robot',
                index: 5)
    Task.create(challenge_id: challenge_lego.id,
                name: 'Day 7',
                description: 'Make an animal',
                index: 6)
    Task.create(challenge_id: challenge_lego.id,
                name: 'Day 8',
                description: 'Make something you find at an amusement park',
                index: 7)
    Task.create(challenge_id: challenge_lego.id,
                name: 'Day 9',
                description: 'Make something from a fairy tale',
                index: 8)
    Task.create(challenge_id: challenge_lego.id,
                name: 'Day 10',
                description: 'Make a superhero',
                index: 9)
    Task.create(challenge_id: challenge_lego.id,
                name: 'Day 11',
                description: 'Make something you want to be when you grow up',
                index: 10)
    Task.create(challenge_id: challenge_lego.id,
                name: 'Day 12',
                description: 'Make something funny',
                index: 11)
    Task.create(challenge_id: challenge_lego.id,
                name: 'Day 13',
                description: 'Make something that rolls on wheels',
                index: 12)
    Task.create(challenge_id: challenge_lego.id,
                name: 'Day 14',
                description: 'Make a castle',
                index: 13)
    Task.create(challenge_id: challenge_lego.id,
                name: 'Day 15',
                description: 'Make a character from your favorite movie',
                index: 14)
    Task.create(challenge_id: challenge_lego.id,
                name: 'Day 16',
                description: 'Make something tiny',
                index: 15)
    Task.create(challenge_id: challenge_lego.id,
                name: 'Day 17',
                description: 'Make a form of transportation',
                index: 16)
    Task.create(challenge_id: challenge_lego.id,
                name: 'Day 18',
                description: 'Make a bridge',
                index: 17)
    Task.create(challenge_id: challenge_lego.id,
                name: 'Day 19',
                description: 'Make something inspired by your favorite book',
                index: 18)
    Task.create(challenge_id: challenge_lego.id,
                name: 'Day 20',
                description: 'Make something you can find in nature',
                index: 19)
    Task.create(challenge_id: challenge_lego.id,
                name: 'Day 21',
                description: 'Make your favorite food',
                index: 20)
    Task.create(challenge_id: challenge_lego.id,
                name: 'Day 22',
                description: 'Make a house',
                index: 21)
    Task.create(challenge_id: challenge_lego.id,
                name: 'Day 23',
                description: 'Make something long',
                index: 22)
    Task.create(challenge_id: challenge_lego.id,
                name: 'Day 24',
                description: 'Make your dream vehicle',
                index: 23)
    Task.create(challenge_id: challenge_lego.id,
                name: 'Day 25',
                description: 'Make a volcano',
                index: 24)
    Task.create(challenge_id: challenge_lego.id,
                name: 'Day 26',
                description: 'Make a gift for someone',
                index: 25)
    Task.create(challenge_id: challenge_lego.id,
                name: 'Day 27',
                description: 'Make something with only one type of brick',
                index: 26)
    Task.create(challenge_id: challenge_lego.id,
                name: 'Day 28',
                description: 'Make a game',
                index: 27)
    Task.create(challenge_id: challenge_lego.id,
                name: 'Day 29',
                description: 'Make something colorful',
                index: 28)
    Task.create(challenge_id: challenge_lego.id,
                name: 'Day 30',
                description: 'Make something you can wear',
                index: 29)
  end
end
# rubocop:enable all
