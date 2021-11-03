# frozen_string_literal: true
# rubocop:disable all

desc 'Add First Pull Up challenge, Music Production challenge, and Squat challenge'
task add_pull_up_music_production_and_squat: :environment do
  user_odyssey = User.find_by(username: 'odyssey')

  category_exercise = Category.find_by(title: 'Exercise')
  category_habits = Category.find_by(title: 'Habits')
  category_creativity = Category.find_by(title: 'Creativity')
  category_mindfulness = Category.find_by(title: 'Mindfulness')
  category_productivity = Category.find_by(title: 'Productivity')

  ########################################################################

  ActiveRecord::Base.transaction do
    challenge_your_desc = 'In this challenge, Ryan Hurst (Head Coach at GMB Fitness) will walk you through building a solid pull-up, starting with the foundations. With just 3 simple exercises, you’ll quickly and safely build your pulling strength.'
    challenge_your = Challenge.create(category_id: category_exercise.id,
                                      name: 'Your First Pull-Up',
                                      description: challenge_your_desc,
                                      duration: 28,
                                      schedule: '3 times a week, for 4 weeks',
                                      creator_id: user_odyssey.id,
                                      color: 0,
                                      original_creator: 'Ryan Hurst',
                                      link_to_reference: 'https://gmb.io/pull-ups/',
                                      prize_name: 'Golden Gauntlet')
    Task.create(challenge_id: challenge_your.id,
                name: 'Week 1',
                description: "Pulling Prep: complete 3-5 sets of 5-10 reps.\nReverse Row Sit Back: complete 3-5 sets of 6-8 reps.",
                index: 0)
    Task.create(challenge_id: challenge_your.id,
                name: 'Week 1',
                description: "Pulling Prep: complete 3-5 sets of 5-10 reps.\nReverse Row Sit Back: complete 3-5 sets of 6-8 reps.",
                index: 1)
    Task.create(challenge_id: challenge_your.id,
                name: 'Week 1',
                description: "Pulling Prep: complete 3-5 sets of 5-10 reps.\nReverse Row Sit Back: complete 3-5 sets of 6-8 reps.",
                index: 2)
    Task.create(challenge_id: challenge_your.id,
                name: 'Week 2',
                description: "Pulling Prep: complete 3-5 sets of 5-10 reps.\nReverse Row Sit Back: complete 3-5 sets of 6-8 reps.\nNegative Pull-Ups (jump to hold, then lower): complete 8 sets of 1-3 reps.",
                index: 3)
    Task.create(challenge_id: challenge_your.id,
                name: 'Week 2',
                description: "Pulling Prep: complete 3-5 sets of 5-10 reps.\nReverse Row Sit Back: complete 3-5 sets of 6-8 reps.\nNegative Pull-Ups (jump to hold, then lower): complete 8 sets of 1-3 reps.",
                index: 4)
    Task.create(challenge_id: challenge_your.id,
                name: 'Week 2',
                description: "Pulling Prep: complete 3-5 sets of 5-10 reps.\nReverse Row Sit Back: complete 3-5 sets of 6-8 reps.\nNegative Pull-Ups (jump to hold, then lower): complete 8 sets of 1-3 reps.",
                index: 5)
    Task.create(challenge_id: challenge_your.id,
                name: 'Week 3',
                description: "Pulling Prep: complete 3-5 sets of 5-10 reps.\nReverse Row Sit Back: complete 3-5 sets of 6-8 reps.\nNegative Pull-Ups (jump to halfway mark, then pull to top): complete 8 sets of 1-3 reps.",
                index: 6)
    Task.create(challenge_id: challenge_your.id,
                name: 'Week 3',
                description: "Pulling Prep: complete 3-5 sets of 5-10 reps.\nReverse Row Sit Back: complete 3-5 sets of 6-8 reps.\nNegative Pull-Ups (jump to halfway mark, then pull to top): complete 8 sets of 1-3 reps.",
                index: 7)
    Task.create(challenge_id: challenge_your.id,
                name: 'Week 3',
                description: "Pulling Prep: complete 3-5 sets of 5-10 reps.\nReverse Row Sit Back: complete 3-5 sets of 6-8 reps.\nNegative Pull-Ups (jump to halfway mark, then pull to top): complete 8 sets of 1-3 reps.",
                index: 8)
    Task.create(challenge_id: challenge_your.id,
                name: 'Week 4',
                description: "Pulling Prep: complete 3-5 sets of 5-10 reps.\nReverse Row Sit Back: complete 3-5 sets of 6-8 reps.\nNegative Pull-Ups (jump to halfway mark, pull to top, slow lower to halfway mark, then pull to top again): complete 8 sets of 1-3 reps.",
                index: 9)
    Task.create(challenge_id: challenge_your.id,
                name: 'Week 4',
                description: "Pulling Prep: complete 3-5 sets of 5-10 reps.\nReverse Row Sit Back: complete 3-5 sets of 6-8 reps.\nNegative Pull-Ups (jump to halfway mark, pull to top, slow lower to halfway mark, then pull to top again): complete 8 sets of 1-3 reps.",
                index: 10)
    Task.create(challenge_id: challenge_your.id,
                name: 'Week 4',
                description: "Pulling Prep: complete 3-5 sets of 5-10 reps.\nReverse Row Sit Back: complete 3-5 sets of 6-8 reps.\nNegative Pull-Ups (jump to halfway mark, pull to top, slow lower to halfway mark, then pull to top again): complete 8 sets of 1-3 reps.",
                index: 11)

    challenge_30_day_desc = "There's plenty of time at home so there's plenty of time for making music, but sometimes the well of inspiration runs dry. That's why MusicTech is bringing you a 30 day challenge to help you stay creative while you stay at home. Try approaches old and new, and most importantly have fun doing it."
    challenge_30_day = Challenge.create!(category_id: category_creativity.id,
                                         name: 'Music Production',
                                         description: challenge_30_day_desc,
                                         duration: 30,
                                         schedule: 'Every day for 1 month',
                                         creator_id: user_odyssey.id,
                                         color: 0,
                                         original_creator: 'MusicTech',
                                         link_to_reference: 'https://www.instagram.com/p/B-wxFCIATgG/',
                                        prize_name: 'Antique Disc')
    Task.create!(challenge_id: challenge_30_day.id,
                 name: 'Day 1',
                 description: 'Resample one of your own tracks',
                 index: 0)
    Task.create!(challenge_id: challenge_30_day.id,
                 name: 'Day 2',
                 description: 'Download free sample packs',
                 index: 1)
    Task.create!(challenge_id: challenge_30_day.id,
                 name: 'Day 3',
                 description: 'Make a custom drum kit from samples',
                 index: 2)
    Task.create!(challenge_id: challenge_30_day.id,
                 name: 'Day 4',
                 description: 'Learn how to make drums using a synth',
                 index: 3)
    Task.create!(challenge_id: challenge_30_day.id,
                 name: 'Day 5',
                 description: 'Try a new freeware synth',
                 index: 4)
    Task.create!(challenge_id: challenge_30_day.id,
                 name: 'Day 6',
                 description: 'Make an edit of a famous track',
                 index: 5)
    Task.create!(challenge_id: challenge_30_day.id,
                 name: 'Day 7',
                 description: 'Sample items from around the house',
                 index: 6)
    Task.create!(challenge_id: challenge_30_day.id,
                 name: 'Day 8',
                 description: 'Collaborate with a friend online',
                 index: 7)
    Task.create!(challenge_id: challenge_30_day.id,
                 name: 'Day 9',
                 description: 'Build a new DAW project template',
                 index: 8)
    Task.create!(challenge_id: challenge_30_day.id,
                 name: 'Day 10',
                 description: 'Learn every function on a plug-in',
                 index: 9)
    Task.create!(challenge_id: challenge_30_day.id,
                 name: 'Day 11',
                 description: 'Make a track with no undo',
                 index: 10)
    Task.create!(challenge_id: challenge_30_day.id,
                 name: 'Day 12',
                 description: 'Start a track at 70 BPM',
                 index: 11)
    Task.create!(challenge_id: challenge_30_day.id,
                 name: 'Day 13',
                 description: 'Make a 32-bar loop without any sustained sounds',
                 index: 12)
    Task.create!(challenge_id: challenge_30_day.id,
                 name: 'Day 14',
                 description: 'Create a beat 30 BPM slower than your usual tempo',
                 index: 13)
    Task.create!(challenge_id: challenge_30_day.id,
                 name: 'Day 15',
                 description: 'Recreate your favourite beat',
                 index: 14)
    Task.create!(challenge_id: challenge_30_day.id,
                 name: 'Day 16',
                 description: 'Record your voice to make samples',
                 index: 15)
    Task.create!(challenge_id: challenge_30_day.id,
                 name: 'Day 17',
                 description: "Remix a friend's track",
                 index: 16)
    Task.create!(challenge_id: challenge_30_day.id,
                 name: 'Day 18',
                 description: 'Make a track in a genre you hate',
                 index: 17)
    Task.create!(challenge_id: challenge_30_day.id,
                 name: 'Day 19',
                 description: 'Start a track at 180 BPM',
                 index: 18)
    Task.create!(challenge_id: challenge_30_day.id,
                 name: 'Day 20',
                 description: "Collaborate with someone you've never met",
                 index: 19)
    Task.create!(challenge_id: challenge_30_day.id,
                 name: 'Day 21',
                 description: 'Mix using only compression plug-ins',
                 index: 20)
    Task.create!(challenge_id: challenge_30_day.id,
                 name: 'Day 22',
                 description: 'Use a single sample to make an entire track',
                 index: 21)
    Task.create!(challenge_id: challenge_30_day.id,
                 name: 'Day 23',
                 description: 'Make a track without quantising',
                 index: 22)
    Task.create!(challenge_id: challenge_30_day.id,
                 name: 'Day 24',
                 description: 'Make a 32-bar track with no drums',
                 index: 23)
    Task.create!(challenge_id: challenge_30_day.id,
                 name: 'Day 25',
                 description: 'Record only hardware or real instruments',
                 index: 24)
    Task.create!(challenge_id: challenge_30_day.id,
                 name: 'Day 26',
                 description: 'Finish a track in a day',
                 index: 25)
    Task.create!(challenge_id: challenge_30_day.id,
                 name: 'Day 27',
                 description: 'Remix a track from last week',
                 index: 26)
    Task.create!(challenge_id: challenge_30_day.id,
                 name: 'Day 28',
                 description: 'Make a 32-bar track in 3/4 time',
                 index: 27)
    Task.create!(challenge_id: challenge_30_day.id,
                 name: 'Day 29',
                 description: 'Make a dub version of a track',
                 index: 28)
    Task.create!(challenge_id: challenge_30_day.id,
                 name: 'Day 30',
                 description: 'Master and upload your best tracks',
                 index: 29)

    challenge_squat_desc = "This 30-day squat challenge starts with foundational exercises and adds targeted challenges. This method improves postural alignment, core strength, and functional stability so that it's easier to maintain your hard-earned results."
    challenge_squat = Challenge.create!(category_id: category_exercise.id,
                                        name: 'Squat Workout',
                                        description: challenge_squat_desc,
                                        duration: 30,
                                        schedule: 'Every day for 1 month',
                                        creator_id: user_odyssey.id,
                                        color: 1,
                                        original_creator: 'Verywell Fit',
                                        link_to_reference: 'https://www.verywellfit.com/30-day-squat-challenge-4174865',
                                      prize_name: 'Peach')

    Task.create!(challenge_id: challenge_squat.id,
                 name: 'Day 1 - Slow Squats',
                 description: 'Perform 10 slow squats. Focus on perfect form.',
                 index: 0)
    Task.create!(challenge_id: challenge_squat.id,
                 name: 'Day 2 - Barefoot Squats',
                 description: 'Perform 10 slow squats without shoes on.',
                 index: 1)
    Task.create!(challenge_id: challenge_squat.id,
                 name: 'Day 3 - Eccentric Squats',
                 description: 'Perform 15 eccentric squats.',
                 index: 2)
    Task.create!(challenge_id: challenge_squat.id,
                 name: 'Day 4 - Concentric Squats',
                 description: 'Perform 15 concentric squats.',
                 index: 3)
    Task.create!(challenge_id: challenge_squat.id,
                 name: 'Day 5 - Plie Squats',
                 description: 'Perform 15 plie squats.',
                 index: 4)
    Task.create!(challenge_id: challenge_squat.id,
                 name: 'Day 6 - Narrow Squats',
                 description: 'Complete 20 narrow squats. Repeat for a total of 15 sets.',
                 index: 5)
    Task.create!(challenge_id: challenge_squat.id,
                 name: 'Day 7 - Rest',
                 description: 'Congratulations on completing Week 1! Enjoy a well-deserved rest!',
                 index: 6)
    Task.create!(challenge_id: challenge_squat.id,
                 name: 'Day 8 - Squat Reach',
                 description: 'Complete 20 squat reach.',
                 index: 7)
    Task.create!(challenge_id: challenge_squat.id,
                 name: 'Day 9 - Kickback Squats',
                 description: 'Complete 10 kickback squats on the right, and another 10 on the left.',
                 index: 8)
    Task.create!(challenge_id: challenge_squat.id,
                 name: 'Day 10 - Stair Squats',
                 description: 'Complete 10 squat repetitions with one foot on a stair. Complete another 10 repetitions with the other foot on the stair.',
                 index: 9)
    Task.create!(challenge_id: challenge_squat.id,
                 name: 'Day 11 - Weight Shift Squats',
                 description: 'Complete 10 squats with weight shifted right and 10 squats with weight shifted left.',
                 index: 10)
    Task.create!(challenge_id: challenge_squat.id,
                 name: 'Day 12 - Curtsy Squats',
                 description: 'Complete 20 squats, alternating sides.',
                 index: 11)
    Task.create!(challenge_id: challenge_squat.id,
                 name: 'Day 13 - Pistol Squats',
                 description: 'Complete 10 squats using only the left leg. Repeat on the other side.',
                 index: 12)
    Task.create!(challenge_id: challenge_squat.id,
                 name: 'Day 14 - Rest',
                 description: 'Congratulations on completing Week 2! Enjoy a well-deserved rest!',
                 index: 13)
    Task.create!(challenge_id: challenge_squat.id,
                 name: 'Day 15 - Dumbbell Squats',
                 description: 'Complete 20 repetitions of dumbbell squats.',
                 index: 14)
    Task.create!(challenge_id: challenge_squat.id,
                 name: 'Day 16 - Wall Squats',
                 description: 'Hold in a squat position with your back in contact with a wall for 30 seconds (beginner) to 60 seconds (intermediate to advanced).',
                 index: 15)
    Task.create!(challenge_id: challenge_squat.id,
                 name: 'Day 17 - Plié Dumbbell Squats',
                 description: 'Complete 20 repetitions of Plié dumbbell squats.',
                 index: 16)
    Task.create!(challenge_id: challenge_squat.id,
                 name: 'Day 18 - Walking Squats',
                 description: 'Begin in a lowered squat position. Maintain this lowered stance as you walk forward four steps. Then walk back four steps. Lift to standing and repeat five times.',
                 index: 17)
    Task.create!(challenge_id: challenge_squat.id,
                 name: 'Day 19 - Squat Presses',
                 description: 'Complete 10-20 repetitions of squat presses.',
                 index: 18)
    Task.create!(challenge_id: challenge_squat.id,
                 name: 'Day 20 - Wall Squat with Weights',
                 description: 'Get into a wall squat position and place a weight on your lap. Hold for 30 seconds (beginner) to 60 seconds (intermediate to advanced).',
                 index: 19)
    Task.create!(challenge_id: challenge_squat.id,
                 name: 'Day 21 - Rest',
                 description: 'Congratulations on completing Week 3! Enjoy a well-deserved rest!',
                 index: 20)
    Task.create!(challenge_id: challenge_squat.id,
                 name: 'Day 22 - Dumbbell Squat with Lift',
                 description: 'Complete 20 repetitions of dumbbell squats with lift.',
                 index: 21)
    Task.create!(challenge_id: challenge_squat.id,
                 name: 'Day 23 - Squat Jump',
                 description: 'Complete 10-20 repetitions of squat jumps.',
                 index: 22)
    Task.create!(challenge_id: challenge_squat.id,
                 name: 'Day 24 - Knee Tap Squats',
                 description: 'Complete 10-20 repetitions of knee tap squats.',
                 index: 23)
    Task.create!(challenge_id: challenge_squat.id,
                 name: 'Day 25 - Dorothy Squats',
                 description: 'Complete 10-20 repetitions of Dorothy squats.',
                 index: 24)
    Task.create!(challenge_id: challenge_squat.id,
                 name: 'Day 26 - Forward Squat Jumps',
                 description: 'Complete 5-10 repetitions of forward squat jumps. Turn around and complete another 5-10 more to move back to your starting location.',
                 index: 25)
    Task.create!(challenge_id: challenge_squat.id,
                 name: 'Day 27 - Box Jumps',
                 description: 'Complete 10-20 repetitions of a forward squat jump to an elevated box or stair.',
                 index: 26)
    Task.create!(challenge_id: challenge_squat.id,
                 name: 'Day 28 - Rest',
                 description: 'Congratulations on completing Week 4! Enjoy a well-deserved rest!',
                 index: 27)
    Task.create!(challenge_id: challenge_squat.id,
                 name: 'Day 29 - Your Choice',
                 description: "You've made it to the second last day of the challenge. You've earned the right to choose your routine during the last two days. Pick any exercise from the series and complete double the repetitions.",
                 index: 28)
    Task.create!(challenge_id: challenge_squat.id,
                 name: 'Day 30 - Your Choice',
                 description: "You've made it to the last day of the challenge. You've earned the right to choose your routine during the last two days. Pick any exercise from the series and complete double the repetitions.",
                 index: 29)
  end
end
# rubocop:enable all
