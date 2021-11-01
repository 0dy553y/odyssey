# frozen_string_literal: true
# rubocop:disable all

desc 'Add Wake Up Early challenge'
task add_wake_up: :environment do
  user_odyssey = User.find_by(username: 'odyssey')

  category_exercise = Category.find_by(title: 'Exercise')
  category_habits = Category.find_by(title: 'Habits')
  category_creativity = Category.find_by(title: 'Creativity')
  category_mindfulness = Category.find_by(title: 'Mindfulness')
  category_productivity = Category.find_by(title: 'Productivity')

  ########################################################################

  ActiveRecord::Base.transaction do
    challenge_wake_up_desc = %(
This challenge challenges you to wake up early little by little each day until you wake up an hour earlier after 7 days.
Just by waking up an hour early for a month, you are adding four 8-hour days to your month. You can use those to pursue your dreams, do what you love, have fun or go on a trip.
).squish
    challenge_wake_up = Challenge.create(category_id: category_habits.id,
                                         name: 'Wake Up Early',
                                         description: challenge_wake_up_desc,
                                         duration: 7,
                                         schedule: 'Every day for 1 week',
                                         creator_id: user_odyssey.id,
                                         color: 4,
                                         original_creator: 'Productive Club',
                                         link_to_reference: 'https://productiveclub.com/7-day-wake-up-early-challenge/')
    Task.create(challenge_id: challenge_wake_up.id,
                name: 'Day 1',
                description: "Wake up 10 minutes before your usual wake-up time.",
                index: 0)
    Task.create(challenge_id: challenge_wake_up.id,
                name: 'Day 2',
                description: "Wake up another 10 minutes earlier from yesterday.",
                index: 1)
    Task.create(challenge_id: challenge_wake_up.id,
                name: 'Day 3',
                description: "Wake up another 10 minutes earlier from yesterday.",
                index: 2)
    Task.create(challenge_id: challenge_wake_up.id,
                name: 'Day 4',
                description: "Wake up another 10 minutes earlier from yesterday.",
                index: 3)
    Task.create(challenge_id: challenge_wake_up.id,
                name: 'Day 5',
                description: "Wake up another 10 minutes earlier from yesterday.",
                index: 4)
    Task.create(challenge_id: challenge_wake_up.id,
                name: 'Day 6',
                description: "Wake up another 10 minutes earlier from yesterday.",
                index: 5)
    Task.create(challenge_id: challenge_wake_up.id,
                name: 'Day 7',
                description: "Congratulations, you have reached the last day of the challenge! Wake up another 10 minutes earlier from yesterday and you would have woken up a full hour earlier than you did 7 days ago.",
                index: 6)
  end
end
# rubocop:enable all
