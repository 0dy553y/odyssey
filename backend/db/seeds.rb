# frozen_string_literal: true

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

user_unclesoo = User.create(username: 'unclesoo', password: 'password')

category_exercise = Category.create(title: 'Exercise')
category_habits = Category.create(title: 'Habits')

challenge_running = Challenge.create(category_id: category_exercise.id, name: 'Couch to 5k',
                                     description: 'Get off the couch ya lazy potato!', schedule: '3 times a week',
                                     duration: 30)
user_challenge_running = UserChallenge.create(user_id: user_unclesoo.id, challenge_id: challenge_running.id,
                                              started_at: 1.week.ago)
challenge_drinking = Challenge.create(category_id: category_habits.id, name: 'Water Drinking',
                                      description: 'Get hydrated with Jialin', schedule: 'Daily', duration: 36_464_572)
user_challenge_drinking = UserChallenge.create(user_id: user_unclesoo.id, challenge_id: challenge_drinking.id,
                                               started_at: 2.weeks.ago)

30.times do |i|
  description = "Welcome to the #{(i + 1).ordinalize} day of Couch to 5k. Today, you will run till you drop. Okay, go!"
  task = Task.create(challenge_id: challenge_running.id, name: "Day #{i + 1}: Warming Up",
                     description: description, index: i)
  UserTask.create(user_id: user_unclesoo.id, user_challenge_id: user_challenge_running, task_id: task.id,
                  is_completed: i < 1.week.in_days)
end

30.times do |i|
  description = "Jialin drank #{i + 1} cups of water today. Can you?"
  task = Task.create(challenge_id: challenge_drinking.id, name: "Day #{i + 1}: Bling Blong",
                     description: description, index: i)
  UserTask.create(user_id: user_unclesoo.id, user_challenge_id: user_challenge_drinking, task_id: task.id,
                  is_completed: i < 2.weeks.in_days)
end
