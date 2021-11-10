# frozen_string_literal: true
# rubocop:disable all
# task_list is a list of the form { name: string, description: string }[].
# If the name parameter is omitted, then the name of the task will simply be "Day x"
def create_tasks(task_list, challenge_id)
  task_list.length.times do |i|
    task = task_list[i]
    Task.create!(challenge_id: challenge_id,
                 name: task[:name] || "Day #{i + 1}",
                 description: task[:description],
                 index: i)
  end
end
desc 'Add abs challenges'
task add_abs_and_focus_and_love_challenge: :environment do
  user_odyssey = User.find_by(username: 'odyssey')
  category_exercise = Category.find_by(title: 'Exercise')
  category_habits = Category.find_by(title: 'Habits')
  category_creativity = Category.find_by(title: 'Creativity')
  category_mindfulness = Category.find_by(title: 'Mindfulness')
  category_productivity = Category.find_by(title: 'Productivity')
  ########################################################################
  ActiveRecord::Base.transaction do
    challenge_abs_desc = "It starts off pretty simple on day 1 but by day 30 you will be an abs master! My goal here is that I wanted to constantly challenge you by increasing the reps every single day. Result? You get stronger and fitter."
    challenge_abs = Challenge.create!(category_id: category_exercise.id,
                                        name: 'Abs Workout',
                                        description: challenge_abs_desc,
                                        duration: 30,
                                        schedule: 'Every day for 1 month',
                                        creator_id: user_odyssey.id,
                                        color: 4,
                                        original_creator: "Blogilates",
                                        link_to_reference: "https://www.blogilates.com/30-day-flat-abs-challenge/")
    Map.create!(land: 1, background: 2, environment_object: 1, challenge_id: challenge_abs.id)
    30.times do |i|
        reps = i + 15
        Task.create!(
            challenge_id: challenge_abs.id,
            name: "Day #{i + 1}",
            description: "#{reps} Reverse Crunch \n #{reps} Double Leg Lift \n #{reps} Ankle Reach \n #{reps} Cross Cross \n #{reps} Roll Up",
            index: i
        )
    end

    challenge_focus_desc = "In today's world of distractions, it is increasingly harder to focus on our important but boring tasks. Set aside some time every day to intentionally practise the skill of focusing -- put away your phone, eliminate all distraction and put your full concentration into your work."
    challenge_focus = Challenge.create!(category_id: category_productivity.id,
                                        name: 'Developing Focus',
                                        description: challenge_focus_desc,
                                        duration: 30,
                                        schedule: 'Every day for 1 month',
                                        creator_id: user_odyssey.id,
                                        color: 6
    )
    Map.create!(land: 5, background: 0, environment_object: 0, challenge_id: challenge_focus.id)
    30.times do |i|
        duration = (i/3) * 5 + 15
        Task.create!(
            challenge_id: challenge_focus.id,
            name: "Day #{i + 1}",
            description: "To the best of your ability, fully focus for #{duration} min today when doing your work.",
            index: i
        )
    end

    challenge_love_desc = "Get a week’s worth of simple, science-based steps you can take to help foster a deeper connection between you and your partner. Learn a bit more about each other and discover new ways to strengthen your bond."
    challenge_love = Challenge.create!(category_id: category_mindfulness.id,
                                        name: 'Love and Relationship',
                                        description: challenge_love_desc,
                                        duration: 7,
                                        schedule: 'Every day for 1 week',
                                        creator_id: user_odyssey.id,
                                        color: 4,
                                        link_to_reference: "https://www.nytimes.com/programs/love-challenge",
                                        original_creator: "Tara Parker-Pope"
    )
    Map.create!(land: 1, background: 1, environment_object: 2, challenge_id: challenge_love.id)
    tasks = [
      {
        name: 'Day 1: Keeping Score',
        description: "Identify at least five things your partner routinely does to show love. Focus on being nice to each other -- keep track of the big and little things both of you do or say that make you feel loved and connected to each other: include things as small as a compliment or a kiss goodbye or more grand gestures like flowers, cooking dinner or cleaning up.",
      },
      {
        name: 'Day 2: Lending a Hand',
        description: "Find as many opportunities as you can to hold hands: sitting at the breakfast table, heading out the door, watching television. Then spend a few minutes together talking about something in your life that is causing you stress and anxiety. Take turns talking about a stressful issue and hold each other's hands tightly during the entire conversation."
      },
      {
        name: "Day 3: Story Time",
        description: "You and your partner should spend some time today thinking of a favorite story. It could be an excerpt from a book or magazine, a children's book or a poem. Find a quiet moment to read your selections to each other. After you're both done reading, take some time to talk about why you each selected the piece you read. Did it have special meaning to you?"
      },
      {
        name: "Day 4: Acceptance Therapy",
        description: "Each of you should write down one or two annoyances that create occasional conflict in your relationship. Share your lists with each other and talk about them, but try to identify a positive trait that might explain the behavior that is irking you. Choose one of the behaviors you listed and decide to accept it, even embrace it as a reminder of the love you have for each other."
      },
      {
        name: "Day 5: Your Perfect Day",
        description: "For today’s challenge I want you and your partner to both think about your perfect day. Share your perfect day with your partner and what is it about your perfect day that you love so much. You’ll get even more benefit out of this challenge if you plan some version of your perfect day and experience it together."
      },
      {
        name: "Day 6: Hands-on-Hearts",
        description: "Have a one-minute timer ready, but don’t start it yet. Now stand and face each other. Each of you should place your right hand on the other’s chest, just over the heart. Now bring your left hand to your own chest and rest it on your partner’s hand. Start the timer. Now spend the next minute with your hands on each other’s hearts looking into each other’s eyes. Try not to giggle or speak, just feel your partner’s touch and heartbeat."
      },
      {
        name: "Day 7: Gratitude for Two",
        description: "Write down three things about your partner for which you feel grateful. Once you’ve both completed the challenge, take a moment to read what you wrote about each other. Are you surprised by your partner’s feelings? Talk about these moments of gratitude and how they make you feel more connected to each other."
      }
    ]

    create_tasks(tasks, challenge_love.id)



end
end
    
