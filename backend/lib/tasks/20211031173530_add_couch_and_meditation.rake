# frozen_string_literal: true
# rubocop:disable all

desc 'Add Couch to 5k and meditation challenges'
task add_couch_and_meditation: :environment do
  user_odyssey = User.find_by(username: 'odyssey')

  category_exercise = Category.find_by(title: 'Exercise')
  category_habits = Category.find_by(title: 'Habits')

  ActiveRecord::Base.transaction do
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
                                       original_creator: 'Josh Clark',
                                       link_to_reference: 'https://www.nhs.uk/live-well/exercise/couch-to-5k-week-by-week/',
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

    challenge_meditation_desc = %(
  Want to try meditation on your own but not sure how to go around it and how often to meditate, and for how long?
  This challenge will introduce you to the basics of meditation and provide a simple 21 Day Meditation Challenge Plan
  with more precise instructions and practical advice on how to start your meditation journey.
).squish
    challenge_meditation = Challenge.create(category_id: category_habits.id,
                                            name: 'Meditation',
                                            description: challenge_meditation_desc,
                                            duration: 21,
                                            schedule: 'Daily',
                                            creator_id: user_odyssey.id,
                                            original_creator: 'Dovile Sinke',
                                            link_to_reference: 'https://21dayhero.com/21-day-meditation-challenge-daily-plan/',
                                            color: 0)
    Task.create(challenge_id: challenge_meditation.id,
                name: 'Day 1 - Focus on your breath',
                description: 'Start with 5 min meditation session and when doing so, focus on your breath.
            Breath is the closest link we have with the present moment hence focusing on breathing will allow you to
            bring your mind and body together.',
                index: 0)
    Task.create(challenge_id: challenge_meditation.id,
                name: 'Day 2 - 5 min of meditation',
                description: 'Continue with 5 min of meditation of your choice. You could simply repeat the same meditation,
            if you like it, or experiment and choose a new one for each day.',
                index: 1)
    Task.create(challenge_id: challenge_meditation.id,
                name: 'Day 3 - 5 min of meditation',
                description: 'Continue with 5 min of meditation of your choice. You could simply repeat the same meditation,
            if you like it, or experiment and choose a new one for each day.',
                index: 2)
    Task.create(challenge_id: challenge_meditation.id,
                name: 'Day 4 - Think of someone you love',
                description: 'Do your 5 min of meditation but don’t stand up yet. Once you have finished your meditation,
            think of someone you love: your partner, family member, close friend or maybe even your pet.
            Imagine that person smiling and think how happy you are to have him/her in your life.
            Keep this positive energy with you for the rest of your day!',
                index: 3)
    Task.create(challenge_id: challenge_meditation.id,
                name: 'Day 5 - 5 min of meditation',
                description: 'Do 5 min of meditation of your choice. Whenever possible, try to stick to the same meditation
            time – be it morning, lunch break or evening. Having a set time will help you to establish your own
            meditation routine easier and help you form a positive habit.',
                index: 4)
    Task.create(challenge_id: challenge_meditation.id,
                name: 'Day 6 - 5 min of meditation',
                description: 'Do 5 min of meditation of your choice. Whenever possible, try to stick to the same meditation
            time – be it morning, lunch break or evening.',
                index: 5)
    Task.create(challenge_id: challenge_meditation.id,
                name: 'Day 7 - List 3 things you are grateful for',
                description: 'Once you have done your 5 min of meditation, sit down for a bit longer, take a piece of paper
             and list 3 things you are grateful about.',
                index: 6)
    Task.create(challenge_id: challenge_meditation.id,
                name: 'Day 8 - 5 min of meditation',
                description: 'To start your second week of daily meditation, prolong your session to 10 min. If 10 min
            is too much for you, keep it to 5 min and increase the time once you feel ready for it.  At this point,
            you are developing a habit of meditating hence consistency is more important than intensity.',
                index: 7)
    Task.create(challenge_id: challenge_meditation.id,
                name: 'Day 9 - Say 5 positive things about yourself',
                description: 'Meditate for 10 min. At the end of today’s meditation, think of 5 positive things about
            yourself and say them out loud. Not only will this boost your confidence and self-love, but will also
            make you less stressed and healthier.',
                index: 8)
    Task.create(challenge_id: challenge_meditation.id,
                name: 'Day 10 - List 3 things you are grateful for',
                description: 'Once you have done your 10 min of meditation, sit down for a bit longer, take a piece of paper
            and list 3 things you are grateful about.',
                index: 9)
    Task.create(challenge_id: challenge_meditation.id,
                name: 'Day 11 - 10 min of meditation',
                description: 'Do 10 min of meditation. Identify the time that has worked best so far for your
            meditation practice and stick to it as much you can to keep going forward. Now, think of a cue/action that
            triggers your meditation. This will be the action that will tell your brain “it’s time to meditate”.',
                index: 10)
    Task.create(challenge_id: challenge_meditation.id,
                name: 'Day 12 - List 3 positive things that happened today',
                description: 'Do 10 min of meditation. Before you go to sleep, think of your day and list 3 positive
             things that have happened to you today.',
                index: 11)
    Task.create(challenge_id: challenge_meditation.id,
                name: 'Day 13 - 10 min of meditation',
                description: 'Meditate for 10 min. Keep on going!',
                index: 12)
    Task.create(challenge_id: challenge_meditation.id,
                name: 'Day 14 - Visualize a place you love',
                description: 'Meditate for 10 min. At the end, close your eyes and think of a place you love. A place
             where you feel safe and happy. Visualize as if you were there right now and think of all the details:
              furniture, colors, sounds, texture.',
                index: 13)
    Task.create(challenge_id: challenge_meditation.id,
                name: 'Day 15 - List 3 things you are grateful for',
                description: 'Meditate for 10 min. List 3 things you are grateful for.',
                index: 14)
    Task.create(challenge_id: challenge_meditation.id,
                name: 'Day 16 - Take a few deep breaths outside',
                description: 'Meditate for 10 min. Today make sure to go outside, stand still and take 3-5
             deep long breaths: inhale deeply through. Taking a few deep breaths will help you to connect with
              yourself and make you be aware of the current moment.',
                index: 15)
    Task.create(challenge_id: challenge_meditation.id,
                name: 'Day 17 - 10 min of meditation',
                description: 'Meditate for 10 min. Only a few days left on this challenge!',
                index: 16)
    Task.create(challenge_id: challenge_meditation.id,
                name: 'Day 18 - Say 3 compliments to yourself',
                description: 'Meditate for 10 min. Think of all the great things about you and say out loud
            3 compliments to yourself. You can do it after your meditation practice, once you wake up or even in
               the middle of the day before an important meeting.',
                index: 17)
    Task.create(challenge_id: challenge_meditation.id,
                name: 'Dat 19 - List 3 positive things that happened today',
                description: 'Meditate for 10 min. List 3 great things that happened to you today before you fall asleep.',
                index: 18)
    Task.create(challenge_id: challenge_meditation.id,
                name: 'Day 20 - List 5 people you love',
                description: 'Meditate for 10 min. List 5 people you love and when doing so, think of each of
             the people for at least a few seconds. Remember them any time you feel down and be grateful for
             having them in your life.',
                index: 19)
    Task.create(challenge_id: challenge_meditation.id,
                name: 'Day 21 - Final 15 min meditation',
                description: 'Congratulations on coming this far! To celebrate your achievements, challenge yourself
             a bit more and prolong your meditation to 15 minutes today.',
                index: 20)
  end
end
# rubocop:enable all
