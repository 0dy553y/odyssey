# frozen_string_literal: true

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

user_odyssey = User.create(username: 'Odyssey', display_name: 'Odyssey', password: 'password', is_system_account: true)

User.create(username: 'unclesoo', display_name: 'Uncle Soo', password: 'password')

category_exercise = Category.create(title: 'Exercise')
category_habits = Category.create(title: 'Habits')

challenge_gratitude_desc = %(
  A gratitude journal encourages ourselves to pay attention to the good things in life we might otherwise take for
  granted. In that way we start to become more attuned to the everyday sources of pleasure around us.
).squish
challenge_gratitude = Challenge.create(category_id: category_habits.id,
                                       name: 'Gratitude Journaling',
                                       description: challenge_gratitude_desc,
                                       duration: 3,
                                       schedule: 'Daily',
                                       creator_id: user_odyssey.id,
                                       color: 0)
Task.create(challenge_id: challenge_gratitude.id,
            name: 'Day 1',
            description: 'Write down three things that happened today that you are grateful for.',
            index: 0)
Task.create(challenge_id: challenge_gratitude.id,
            name: 'Day 2',
            description: 'Write down two people you are grateful for, and why.',
            index: 1)
Task.create(challenge_id: challenge_gratitude.id,
            name: 'Day 3',
            description: 'Don’t complain for a day, and write about your experience.',
            index: 2)

challenge_walking_desc = %(
  Walking is a great way to improve or maintain your overall health. Just 30 minutes every day can increase
  cardiovascular fitness, strengthen bones, reduce excess body fat, and boost muscle power and endurance.
).squish
challenge_walking = Challenge.create(category_id: category_exercise.id,
                                     name: 'Walking',
                                     description: challenge_walking_desc,
                                     duration: 3,
                                     schedule: 'Daily',
                                     creator_id: user_odyssey.id,
                                     color: 1)
Task.create(challenge_id: challenge_walking.id,
            name: 'Day 1',
            description: 'Go for a walk for at least 5 min today.',
            index: 0)
Task.create(challenge_id: challenge_walking.id,
            name: 'Day 2',
            description: 'Go for a walk for at least 10 min today.',
            index: 1)
Task.create(challenge_id: challenge_walking.id,
            name: 'Day 3',
            description: 'Go for a walk for at least 15 min today.',
            index: 2)



user_squirtle = User.create(username: 'Squirtle', display_name: 'Squirtle', password: 'password')
user_mario = User.create(username: 'Mario', display_name: 'Mario', password: 'password')
user_torchic = User.create(username: 'Torchic', display_name: 'Torchic', password: 'password')
user_luigi = User.create(username: 'Luigi', display_name: 'Luigi', password: 'password')


Friendship.create!(first_user_id: user_squirtle.id, second_user_id: user_mario.id)
Friendship.create!(first_user_id: user_squirtle.id, second_user_id: user_torchic.id)
Friendship.create!(first_user_id: user_squirtle.id, second_user_id: user_luigi.id)

user_challenge_walking = UserChallenge.new(user_id: user_squirtle.id, challenge_id: 1,
                                           started_at: 1.week.ago)
user_challenge_walking.schedule = Schedule.new(saturday: true, sunday: true)
user_challenge_walking.save!

user_challenge_walking = UserChallenge.new(user_id: user_mario.id, challenge_id: 1,
                                           started_at: 1.week.ago)
user_challenge_walking.schedule = Schedule.new(saturday: true, sunday: true)
user_challenge_walking.save!

user_challenge_walking = UserChallenge.new(user_id: user_torchic.id, challenge_id: 1,
                                           started_at: 1.week.ago)
user_challenge_walking.schedule = Schedule.new(saturday: true, sunday: true)
user_challenge_walking.save!

user_challenge_walking = UserChallenge.new(user_id: user_luigi.id, challenge_id: 1,
                                           started_at: 1.week.ago)
user_challenge_walking.schedule = Schedule.new(saturday: true, sunday: true)
user_challenge_walking.save!
