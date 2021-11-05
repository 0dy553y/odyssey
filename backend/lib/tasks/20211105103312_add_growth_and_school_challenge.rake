# frozen_string_literal: true
# rubocop:disable all

desc 'Add Growth Challenge and Back-To-School Challenge'
task add_growth_and_school_challenge: :environment do
  user_odyssey = User.find_by(username: 'odyssey')

  category_exercise = Category.find_by(title: 'Exercise')
  category_habits = Category.find_by(title: 'Habits')
  category_creativity = Category.find_by(title: 'Creativity')
  category_mindfulness = Category.find_by(title: 'Mindfulness')
  category_productivity = Category.find_by(title: 'Productivity')

  ########################################################################

  ActiveRecord::Base.transaction do
    challenge_growth_desc = 'Ready to make this year your best yet? Then you’re in the right place. It takes hard work, resilience, and persistence to make this thirty-day challenge happen. But if you do? You’ll be strapped to a rocket and ready to make this the best year of your entire life. Whether you follow this thirty-day challenge to the ‘T’ or adapt your own, use this as a framework for creating the change you want to see in your life this year.'
    challenge_growth = Challenge.create!(category_id: category_habits.id,
                                      name: 'Growth Challenge',
                                      description: challenge_growth_desc,
                                      duration: 28,
                                      schedule: 'Every day for 1 month',
                                      creator_id: user_odyssey.id,
                                      color: 2,
                                      original_creator: 'Matt Valentine',
                                      link_to_reference: 'https://www.goalcast.com/30-day-growth-challenge/')
    Map.create!(land: 0, challenge_id: challenge_growth.id)

    Task.create!(challenge_id: challenge_growth.id,
                name: 'Day 1',
                description: 'Last last year behind and commit to no expectations. This could be something as simple as taking a short walk on the beach and allowing yourself to let the past rest behind you.',
                index: 0)

    Task.create!(challenge_id: challenge_growth.id,
                 name: 'Day 2',
                 description: 'Set goals for the year (or reevaluate them if you already have). What do you want to accomplish this year? You won’t get very far if you’re not clear on what you want.',
                 index: 1)

    Task.create!(challenge_id: challenge_growth.id,
                 name: 'Day 3',
                 description: 'Break those down into quarterly goals and use a weekly accountability system to track your progress.',
                 index: 2)

    Task.create!(challenge_id: challenge_growth.id,
                 name: 'Day 4',
                 description: 'List important assets you need to accomplish those goals. Chances are, you don’t have everything you need to accomplish your goals. Make a list and figure how you’ll acquire the assets you need to do that (such as skills, new contacts, etc.).',
                 index: 3)

    Task.create!(challenge_id: challenge_growth.id,
                 name: 'Day 5',
                 description: 'Make a vision board. I know, sounds hoaky – but it’s not. Don’t pass this one up! (Even if it takes more than a day.)',
                 index: 4)

    Task.create!(challenge_id: challenge_growth.id,
                 name: 'Day 6',
                 description: 'Start a journal',
                 index: 5)

    Task.create!(challenge_id: challenge_growth.id,
                 name: 'Day 7',
                 description: 'Today is a free day. Use this time to have a break, or make up for missed objectives!',
                 index: 6)

    Task.create!(challenge_id: challenge_growth.id,
                 name: 'Day 8',
                 description: 'Wake up thirty minutes earlier. Even if you don’t do anything with it, rising early makes you feel great and puts you in the right state of mind for the day ahead.',
                 index: 7)

    Task.create!(challenge_id: challenge_growth.id,
                 name: 'Day 9',
                 description: 'Design a morning routine. Take it one step further and design a morning routine that jumpstarts your day.',
                 index: 8)

    Task.create!(challenge_id: challenge_growth.id,
                 name: 'Day 10',
                 description: 'Adopt a nightly ritual. Like the morning routine, but this is all about optimizing your sleep and well-being by placing you in the right physical and mental state of being before retiring for the day.',
                 index: 9)

    Task.create!(challenge_id: challenge_growth.id,
                 name: 'Day 11',
                 description: 'Minimize or get rid of T.V. I know, you can’t do without Game of Thrones. That’s okay, as long as you reduce your T.V. consumption down to just a few hours a week you’re good.',
                 index: 10)

    Task.create!(challenge_id: challenge_growth.id,
                 name: 'Day 12',
                 description: 'Do a smartphone/app cleaning. Chances are, you have a ton of apps you really don’t need or which distract you regularly but bring you little value. Time to do away with all of it.',
                 index: 11)

    Task.create!(challenge_id: challenge_growth.id,
                 name: 'Day 13',
                 description: 'Cleanse your social. Social is one of the biggest time sinks and a constant source of distractions. Reduce the number of sites you’re on, who you follow, and weed out the bad associations.',
                 index: 12)

    Task.create!(challenge_id: challenge_growth.id,
                 name: 'Day 14',
                 description: 'Today is a free day. Use this time to have a break, or make up for missed objectives!',
                 index: 13)

    Task.create!(challenge_id: challenge_growth.id,
                 name: 'Day 15',
                 description: 'Meditate for five minutes. Preferably, make this a daily habit.',
                 index: 14)

    Task.create!(challenge_id: challenge_growth.id,
                 name: 'Day 16',
                 description: 'Try a brain game. These are great for optimizing your cognitive functions.',
                 index: 15)

    Task.create!(challenge_id: challenge_growth.id,
                 name: 'Day 17',
                 description: 'Adopt a mindfulness practice.',
                 index: 16)

    Task.create!(challenge_id: challenge_growth.id,
                 name: 'Day 18',
                 description: 'Start exercising. It’s important you find a method that works for you so you’ll be excited to work out.',
                 index: 17)

    Task.create!(challenge_id: challenge_growth.id,
                 name: 'Day 19',
                 description: 'Start using the Pomodoro method while you work.',
                 index: 18)

    Task.create!(challenge_id: challenge_growth.id,
                 name: 'Day 20',
                 description: 'Create the habit of doing problem tasks first. There needs to be a sense of order and logic to how you work. This is the second step to optimizing that and it influences both your productivity and creativity.',
                 index: 19)

    Task.create!(challenge_id: challenge_growth.id,
                 name: 'Day 21',
                 description: 'Today is a free day. Use this time to have a break, or make up for missed objectives!',
                 index: 20)

    Task.create!(challenge_id: challenge_growth.id,
                 name: 'Day 22',
                 description: 'Start reading. Depending on your profession, this can be anything that brings you value. Same goes for the next point.',
                 index: 21)

    Task.create!(challenge_id: challenge_growth.id,
                 name: 'Day 23',
                 description: 'Start listening to podcasts. Unlike books, which require your undivided attention, podcasts are great because you can take them on the go. So are audiobooks. Highly recommended.',
                 index: 22)

    Task.create!(challenge_id: challenge_growth.id,
                 name: 'Day 24',
                 description: 'Search for a mastermind or group of like individuals. If you don’t already have a group of people you communicate with regularly that are in your profession or are at a similar professional level, start searching for a group or community.',
                 index: 23)

    Task.create!(challenge_id: challenge_growth.id,
                 name: 'Day 25',
                 description: 'Do one thing you’re afraid of. The ability to consistently step outside of your comfort zone is a skill that can and should be developed now as it will serve you in everything you do.',
                 index: 24)

    Task.create!(challenge_id: challenge_growth.id,
                 name: 'Day 26',
                 description: 'Reach out to one person that can move your career forward. This is all about building professional connections. Most of us have a hard time bringing ourselves to make that initial contact, let alone build entire new relationships with people. This is about taking that initial step, everything else tends to happen naturally from there, because we’re motivated to continue.',
                 index: 25)

    Task.create!(challenge_id: challenge_growth.id,
                 name: 'Day 27',
                 description: 'Perform an act of kindness. You’ll notice this doesn’t seem to fit with the theme of this week. However, I’ve found that most of us have lost touch with (or never knew) the power of helping others without expecting anything in return. This knowledge, and the understanding that you always have the ability to exercise it, doesn’t just make you happier and more fulfilled, it can serve you in your career in a big way. Such acts of kindness are the perfect way to start off a long and beautiful business relationship or personal connection.',
                 index: 26)

    Task.create!(challenge_id: challenge_growth.id,
                 name: 'Day 28',
                 description: 'Today is the last day of the challenge. Use this time to make up for missed objectives and congratulate yourself on completing the challenge.!',
                 index: 27)

    challenge_back_to_school_desc = 'Embark on this challenge to help yourself get back into the swing of school. Each day, prepare a picture (or text post) following that day’s prompt!'
    challenge_back_to_school = Challenge.create!(category_id: category_productivity.id,
                                         name: 'Back to School Challenge',
                                         description: challenge_back_to_school_desc,
                                         duration: 30,
                                         schedule: 'Every day for 1 month',
                                         creator_id: user_odyssey.id,
                                         color: 4,
                                         original_creator: 'universi-tea',
                                         link_to_reference: 'https://universi-tea.tumblr.com/post/149710375896/30-day-back-to-school-challenge')
    Map.create!(land: 0, challenge_id: challenge_back_to_school.id)

    Task.create!(challenge_id: challenge_back_to_school.id,
                 name: 'Day 1',
                 description: 'Your prompt: Goals for the semester',
                 index: 0)

    Task.create!(challenge_id: challenge_back_to_school.id,
                 name: 'Day 2',
                 description: 'Your prompt: What are you excited about?',
                 index: 1)

    Task.create!(challenge_id: challenge_back_to_school.id,
                 name: 'Day 3',
                 description: "Your prompt: What's in your bag?",
                 index: 2)

    Task.create!(challenge_id: challenge_back_to_school.id,
                 name: 'Day 4',
                 description: "Your prompt: Study essentials",
                 index: 3)

    Task.create!(challenge_id: challenge_back_to_school.id,
                 name: 'Day 5',
                 description: "Your prompt: Favourite study snack",
                 index: 4)

    Task.create!(challenge_id: challenge_back_to_school.id,
                 name: 'Day 6',
                 description: "Your prompt: Your handwriting",
                 index: 5)

    Task.create!(challenge_id: challenge_back_to_school.id,
                 name: 'Day 7',
                 description: "Your prompt: Daily routine",
                 index: 6)

    Task.create!(challenge_id: challenge_back_to_school.id,
                 name: 'Day 8',
                 description: "Your prompt: Before / after",
                 index: 7)

    Task.create!(challenge_id: challenge_back_to_school.id,
                 name: 'Day 9',
                 description: 'Your prompt: Good morning!',
                 index: 8)

    Task.create!(challenge_id: challenge_back_to_school.id,
                 name: 'Day 10',
                 description: 'Your prompt: Good night!',
                 index: 9)

    Task.create!(challenge_id: challenge_back_to_school.id,
                 name: 'Day 11',
                 description: 'Your prompt: Favourite subject',
                 index: 10)

    Task.create!(challenge_id: challenge_back_to_school.id,
                 name: 'Day 12',
                 description: 'Your prompt: Least favourite subject',
                 index: 11)

    Task.create!(challenge_id: challenge_back_to_school.id,
                 name: 'Day 13',
                 description: 'Your prompt: Something you are proud of',
                 index: 12)

    Task.create!(challenge_id: challenge_back_to_school.id,
                 name: 'Day 14',
                 description: 'Your prompt: How you study best',
                 index: 13)

    Task.create!(challenge_id: challenge_back_to_school.id,
                 name: 'Day 15',
                 description: 'Your prompt: School supplies and reviews',
                 index: 14)

    Task.create!(challenge_id: challenge_back_to_school.id,
                 name: 'Day 16',
                 description: 'Your prompt: Shelfie or pictures of your books',
                 index: 15)

    Task.create!(challenge_id: challenge_back_to_school.id,
                 name: 'Day 17',
                 description: 'Your prompt: Your favourite part of your school',
                 index: 16)

    Task.create!(challenge_id: challenge_back_to_school.id,
                 name: 'Day 18',
                 description: "Your prompt: What's in your pencil case?",
                 index: 17)

    Task.create!(challenge_id: challenge_back_to_school.id,
                 name: 'Day 19',
                 description: "Your prompt: Show off your favourite back-to-school outfit!",
                 index: 18)

    Task.create!(challenge_id: challenge_back_to_school.id,
                 name: 'Day 20',
                 description: "Your prompt: Doodles",
                 index: 19)

    Task.create!(challenge_id: challenge_back_to_school.id,
                 name: 'Day 21',
                 description: "Your prompt: Coffee or tea?",
                 index: 20)

    Task.create!(challenge_id: challenge_back_to_school.id,
                 name: 'Day 22',
                 description: "Your prompt: Your study style",
                 index: 21)

    Task.create!(challenge_id: challenge_back_to_school.id,
                 name: 'Day 23',
                 description: "Your prompt: Favourite way to take a study break",
                 index: 22)

    Task.create!(challenge_id: challenge_back_to_school.id,
                 name: 'Day 24',
                 description: "Your prompt: Study playlist",
                 index: 23)

    Task.create!(challenge_id: challenge_back_to_school.id,
                 name: 'Day 25',
                 description: "Your prompt: What motivates you?",
                 index: 24)

    Task.create!(challenge_id: challenge_back_to_school.id,
                 name: 'Day 26',
                 description: "Your prompt: Favourite quote",
                 index: 25)

    Task.create!(challenge_id: challenge_back_to_school.id,
                 name: 'Day 27',
                 description: "Your prompt: Favourite study spot",
                 index: 26)

    Task.create!(challenge_id: challenge_back_to_school.id,
                 name: 'Day 28',
                 description: "Your prompt: Your To-Do List",
                 index: 27)

    Task.create!(challenge_id: challenge_back_to_school.id,
                 name: 'Day 29',
                 description: "Your prompt: The best thing about school",
                 index: 28)

    Task.create!(challenge_id: challenge_back_to_school.id,
                 name: 'Day 30',
                 description: "Your prompt: Your top 3 tips for school",
                 index: 29)
  end
end
# rubocop:enable all
