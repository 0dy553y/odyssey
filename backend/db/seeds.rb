# frozen_string_literal: true

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

user_odyssey = User.create(username: 'Odyssey', display_name: 'Odyssey', password: 'password')

user_unclesoo = User.create(username: 'unclesoo', password: 'password')

category_exercise = Category.create(title: 'Exercise')
category_habits = Category.create(title: 'Habits')

challenge_running = Challenge.create(category_id: category_exercise.id, name: 'Couch to 5k',
                                     description: 'Couch to 5K is a running plan for absolute beginners.
                                     It was developed by a new runner, Josh Clark,
                                     who wanted to help his 50-something mum get off the couch and start running, too.',
                                     schedule: '3 times a week, alternate days',
                                     duration: 30,
                                     creator_id: user_odyssey.id,
                                     color: 0)
user_challenge_running = UserChallenge.new(user_id: user_unclesoo.id, challenge_id: challenge_running.id,
                                              started_at: 1.week.ago)
user_challenge_running.schedule = Schedule.new(saturday: true, sunday: true)
user_challenge_running.save!

challenge_drinking = Challenge.create(category_id: category_habits.id, name: 'Water Drinking',
                                      description: 'Get hydrated with Jialin', schedule: 'Daily', duration: 36_464_572,
                                      creator_id: user_odyssey.id, color: 1)
user_challenge_drinking = UserChallenge.new(user_id: user_unclesoo.id, challenge_id: challenge_drinking.id,
                                               started_at: 2.weeks.ago)
user_challenge_drinking.schedule = Schedule.new(monday: true, tuesday: true, wednesday: true,
                                                thursday: true, friday: true)
user_challenge_drinking.save!

30.times do |i|
  description = "Welcome to the #{(i + 1).ordinalize} day of Couch to 5k. Today, you will run till you drop. Okay, go!"
  task = Task.create(challenge_id: challenge_running.id, name: "Day #{i + 1}: Warming Up",
                     description: description, index: i)
  UserTask.create(user_id: user_unclesoo.id, user_challenge_id: user_challenge_running.id, task_id: task.id,
                  completed_at: i < 1.week.in_days ? 1.week.ago + i.days : nil,
                  scheduled_for: 1.week.ago + i.days)
end

30.times do |i|
  description = "Jialin drank #{i + 1} cups of water today. Can you?"
  task = Task.create(challenge_id: challenge_drinking.id, name: "Day #{i + 1}: Bling Blong",
                     description: description, index: i)
  UserTask.create(user_id: user_unclesoo.id, user_challenge_id: user_challenge_drinking.id, task_id: task.id,
                  completed_at: i < 2.weeks.in_days ? 2.weeks.ago + i.days : nil,
                  scheduled_for: 2.weeks.ago + i.days)
end
