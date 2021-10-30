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
challenge_couch_desc = %(
  Couch to 5k is a fantastic program that's been designed to get just about anyone from the 
  couch to running 5 kilometers or 30 minutes in just 9 weeks.
).squish
challenge_couch = Challenge.create(category_id: category_exercise.id,
                                   name: 'Couch to 5k',
                                   description: challenge_couch_desc,
                                   duration: 63,
                                   schedule: '3 times a week, for 9 weeks',
                                   creator_id: user_odyssey.id,
                                   color: 0)
Task.create(challenge_id: challenge_couch.id,
            name: 'Week 1',
            description: 'Begin with a brisk 5 min walk, then alternate 1 min of running and 
            1.5 min of walking for a total of 20 min',
            index: 0)
Task.create(challenge_id: challenge_couch.id,
            name: 'Week 1',
            description: 'Begin with a brisk 5 min walk, then alternate 1 min of running and 
            1.5 min of walking for a total of 20 min',
            index: 1)
Task.create(challenge_id: challenge_couch.id,
            name: 'Week 1',
            description: 'Begin with a brisk 5 min walk, then alternate 1 min of running and 
            1.5 min of walking for a total of 20 min',
            index: 2)
Task.create(challenge_id: challenge_couch.id,
            name: 'Week 2',
            description: 'Begin with a brisk 5 min walk, then alternate 1.5 min of running and 
            2 min of walking for a total of 20 min',
            index: 3)
Task.create(challenge_id: challenge_couch.id,
            name: 'Week 2',
            description: 'Begin with a brisk 5 min walk, then alternate 1.5 min of running and 
            2 min of walking for a total of 20 min',
            index: 4)
Task.create(challenge_id: challenge_couch.id,
            name: 'Week 2',
            description: 'Begin with a brisk 5 min walk, then alternate 1.5 min of running and 
            2 min of walking for a total of 20 min',
            index: 5)
Task.create(challenge_id: challenge_couch.id,
            name: 'Week 3',
            description: 'Begin with a brisk 5 min walk, then 2 repitions of 1.5 min of running, 
            1.5 min of walking, 3 min of running and 3 min of walking',
            index: 6)
Task.create(challenge_id: challenge_couch.id,
            name: 'Week 3',
            description: 'Begin with a brisk 5 min walk, then 2 repitions of 1.5 min of running, 
            1.5 min of walking, 3 min of running and 3 min of walking',
            index: 7)
Task.create(challenge_id: challenge_couch.id,
            name: 'Week 3',
            description: 'Begin with a brisk 5 min walk, then 2 repitions of 1.5 min of running, 
            1.5 min of walking, 3 min of running and 3 min of walking',
            index: 8)
Task.create(challenge_id: challenge_couch.id,
            name: 'Week 4',
            description: 'Begin with a brisk 5 min walk, then 3 min of running, 1.5 min of walking, 
            5 min of running, 2.5 min of walking, 3 min of running, 1.5 min of walking, 5 min of running',
            index: 9)
Task.create(challenge_id: challenge_couch.id,
            name: 'Week 4',
            description: 'Begin with a brisk 5 min walk, then 3 min of running, 1.5 min of walking, 
            5 min of running, 2.5 min of walking, 3 min of running, 1.5 min of walking, 5 min of running',
            index: 10)
Task.create(challenge_id: challenge_couch.id,
            name: 'Week 4',
            description: 'Begin with a brisk 5 min walk, then 3 min of running, 1.5 min of walking, 
            5 min of running, 2.5 min of walking, 3 min of running, 1.5 min of walking, 5 min of running',
            index: 11)
Task.create(challenge_id: challenge_couch.id,
            name: 'Week 5',
            description: 'Begin with a brisk 5 min walk, then 5 min of running, 3 min of walking, 
            5 min of running, 3 min of walking, and 5 min of running',
            index: 12)
Task.create(challenge_id: challenge_couch.id,
            name: 'Week 5',
            description: 'Begin with a brisk 5 min walk, then 8 min of running, 5 min of walking, and 8 min of running',
            index: 13)
Task.create(challenge_id: challenge_couch.id,
            name: 'Week 5',
            description: 'Begin with a brisk 5 min walk, then 20 min of running with no walking',
            index: 14)
Task.create(challenge_id: challenge_couch.id,
            name: 'Week 6',
            description: 'Begin with a brisk 5 min walk, then 5 min of running, 3 min of walking, 
            8 min of running, 3 min of walking, and 5 min of running',
            index: 15)
Task.create(challenge_id: challenge_couch.id,
            name: 'Week 6',
            description: 'Begin with a brisk 5 min walk, then 10 min of running, 3 min of walking, 10 min of running',
            index: 16)
Task.create(challenge_id: challenge_couch.id,
            name: 'Week 6',
            description: 'Begin with a brisk 5 min walk, then 25 min of running',
            index: 17)
Task.create(challenge_id: challenge_couch.id,
            name: 'Week 7',
            description: 'Begin with a brisk 5 min walk, then 25 min of running',
            index: 18)
Task.create(challenge_id: challenge_couch.id,
            name: 'Week 7',
            description: 'Begin with a brisk 5 min walk, then 25 min of running',
            index: 19)
Task.create(challenge_id: challenge_couch.id,
            name: 'Week 7',
            description: 'Begin with a brisk 5 min walk, then 25 min of running',
            index: 20)
Task.create(challenge_id: challenge_couch.id,
            name: 'Week 8',
            description: 'Begin with a brisk 5 min walk, then 28 min of running',
            index: 21)
Task.create(challenge_id: challenge_couch.id,
            name: 'Week 8',
            description: 'Begin with a brisk 5 min walk, then 28 min of running',
            index: 22)
Task.create(challenge_id: challenge_couch.id,
            name: 'Week 8',
            description: 'Begin with a brisk 5 min walk, then 28 min of running',
            index: 23)
Task.create(challenge_id: challenge_couch.id,
            name: 'Week 9',
            description: 'Begin with a brisk 5 min walk, then 30 min of running',
            index: 24)
Task.create(challenge_id: challenge_couch.id,
            name: 'Week 9',
            description: 'Begin with a brisk 5 min walk, then 30 min of running',
            index: 25)
Task.create(challenge_id: challenge_couch.id,
            name: 'Week 9',
            description: 'Begin with a brisk 5 min walk, then 30 min of running',
            index: 26)
