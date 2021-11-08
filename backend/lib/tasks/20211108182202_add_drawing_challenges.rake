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
desc 'Add drawing challenges'
task add_drawing_challenges: :environment do
  user_odyssey = User.find_by(username: 'odyssey')
  category_exercise = Category.find_by(title: 'Exercise')
  category_habits = Category.find_by(title: 'Habits')
  category_creativity = Category.find_by(title: 'Creativity')
  category_mindfulness = Category.find_by(title: 'Mindfulness')
  category_productivity = Category.find_by(title: 'Productivity')
  ########################################################################
  ActiveRecord::Base.transaction do
    challenge_drawing_desc = 'A Drawing a Day helps to cultivate a daily drawing habit that will have you sketching anything, and everything, you want. The challenge is a great way to keep up with the practice and to keep the inner critic away!'
    challenge_drawing = Challenge.create!(category_id: category_creativity.id,
                                               name: 'A Drawing a Day',
                                               description: challenge_drawing_desc,
                                               duration: 30,
                                               schedule: 'Every day for 1 month',
                                               creator_id: user_odyssey.id,
                                               color: 4,
                                               original_creator: "Sketchbook Skool",
                                               link_to_reference: 'https://sketchbookskool.com/blog/a-drawing-a-day-daily-drawing-prompts-for-september/')
    Map.create!(land: 0, challenge_id: challenge_drawing.id)
    tasks = [
        {
            description: "Your drawing prompt: Coffee"
        },
        {
            description: "Your drawing prompt: Morning"
        },
        {
            description: "Your drawing prompt: Robot"
        },
         {
            description: "Your drawing prompt: Moment"
        },
         {
            description: "Your drawing prompt: Fresh"
        },
         {
            description: "Your drawing prompt: Soothing"
        },
         {
            description: "Your drawing prompt: Pocket"
        },
         {
            description: "Your drawing prompt: Ritual"
        },
         {
            description: "Your drawing prompt: Fruit"
        },
         {
            description: "Your drawing prompt: Dance"
        }, {
            description: "Your drawing prompt: Messy"
        },
         {
            description: "Your drawing prompt: Strong"
        },
         {
            description: "Your drawing prompt: Temptation"
        },
         {
            description: "Your drawing prompt: Second"
        },
         {
            description: "Your drawing prompt: Sharing"
        },
         {
            description: "Your drawing prompt: Bag"
        },
         {
            description: "Your drawing prompt: Sister"
        },
         {
            description: "Your drawing prompt: Clouds"
        },
         {
            description: "Your drawing prompt: Multiple"
        },
         {
            description: "Your drawing prompt: Sandwich"
        },
         {
            description: "Your drawing prompt: Fall"
        },
         {
            description: "Your drawing prompt: Lucky"
        },
         {
            description: "Your drawing prompt: Plastic"
        },
         {
            description: "Your drawing prompt: Turn"
        },
         {
            description: "Your drawing prompt: Sound"
        },
         {
            description: "Your drawing prompt: Soft"
        },
         {
            description: "Your drawing prompt: Bicycle"
        },
         {
            description: "Your drawing prompt: Inspiration"
        },
         {
            description: "Your drawing prompt: Patient"
        },
         {
            description: "Your drawing prompt: Chain"
        },
  ]
  
  create_tasks(tasks, challenge_drawing.id)
  challenge_portrait_drawing_desc = "Want to get better at drawing portraits? This challenge is the one for you! Every day, draw a quick line drawing of any portrait reference you find, then overlay it to compare the differences and learn from your inaccuracies. Draw a full portrait on day 1 and day 30 to see how far you've come!"
    challenge_portrait_drawing = Challenge.create!(category_id: category_creativity.id,
                                               name: 'Portrait Drawing',
                                               description: challenge_portrait_drawing_desc,
                                               duration: 30,
                                               schedule: 'Every day for 1 month',
                                               creator_id: user_odyssey.id,
                                               color: 2,
                                               original_creator: "Scott H Young",
                                               link_to_reference: 'https://www.scotthyoung.com/blog/myprojects/portrait-challenge/')
    
                                               Map.create!(land: 0, challenge_id: challenge_portrait_drawing.id)
    tasks = [
      {
        description: "Draw a full portrait. It can be a self-portrait or any reference you find. Spend slightly more time on it to polish it to the best of your ability so that you can compare the differences at the end!"
      },
       {
        description: "Draw a quick line drawing of any portrait. Overlay your lines over the original reference and study the discrepancies, marking them out. Take special note of the proportion and placement of the facial features."
      },
       {
        description: "Draw a quick line drawing of any portrait. Overlay your lines over the original reference and study the discrepancies, marking them out."
      },
       {
        description: "Draw a quick line drawing of any portrait. Overlay your lines over the original reference and study the discrepancies, marking them out."
      },
       {
        description: "Draw a quick line drawing of any portrait. Overlay your lines over the original reference and study the discrepancies, marking them out."
      },
       {
        description: "Draw a quick line drawing of any portrait. Overlay your lines over the original reference and study the discrepancies, marking them out."
      },
       {
        description: "Draw a quick line drawing of any portrait. Overlay your lines over the original reference and study the discrepancies, marking them out."
      },
       {
        description: "Draw a quick line drawing of any portrait. Overlay your lines over the original reference and study the discrepancies, marking them out."
      },
       {
        description: "Draw a quick line drawing of any portrait. Overlay your lines over the original reference and study the discrepancies, marking them out."
      },
       {
        description: "Draw a quick line drawing of any portrait. Overlay your lines over the original reference and study the discrepancies, marking them out."
      },
       {
        description: "Draw a quick line drawing of any portrait. Overlay your lines over the original reference and study the discrepancies, marking them out."
      },
       {
        description: "Draw a quick line drawing of any portrait. Overlay your lines over the original reference and study the discrepancies, marking them out."
      },
       {
        description: "Draw a quick line drawing of any portrait. Overlay your lines over the original reference and study the discrepancies, marking them out."
      },
       {
        description: "Draw a quick line drawing of any portrait. Overlay your lines over the original reference and study the discrepancies, marking them out."
      },
       {
        description: "Draw a quick line drawing of any portrait. Overlay your lines over the original reference and study the discrepancies, marking them out."
      },
       {
        description: "Draw a quick line drawing of any portrait. Overlay your lines over the original reference and study the discrepancies, marking them out."
      },
       {
        description: "Draw a quick line drawing of any portrait. Overlay your lines over the original reference and study the discrepancies, marking them out."
      },
       {
        description: "Draw a quick line drawing of any portrait. Overlay your lines over the original reference and study the discrepancies, marking them out."
      },
       {
        description: "Draw a quick line drawing of any portrait. Overlay your lines over the original reference and study the discrepancies, marking them out."
      },
       {
        description: "Draw a quick line drawing of any portrait. Overlay your lines over the original reference and study the discrepancies, marking them out."
      },
       {
        description: "Draw a quick line drawing of any portrait. Overlay your lines over the original reference and study the discrepancies, marking them out."
      },
       {
        description: "Draw a quick line drawing of any portrait. Overlay your lines over the original reference and study the discrepancies, marking them out."
      },
       {
        description: "Draw a quick line drawing of any portrait. Overlay your lines over the original reference and study the discrepancies, marking them out."
      },
       {
        description: "Draw a quick line drawing of any portrait. Overlay your lines over the original reference and study the discrepancies, marking them out."
      },
       {
        description: "Draw a quick line drawing of any portrait. Overlay your lines over the original reference and study the discrepancies, marking them out."
      },
       {
        description: "Draw a quick line drawing of any portrait. Overlay your lines over the original reference and study the discrepancies, marking them out."
      },
       {
        description: "Draw a quick line drawing of any portrait. Overlay your lines over the original reference and study the discrepancies, marking them out."
      },
       {
        description: "Draw a quick line drawing of any portrait. Overlay your lines over the original reference and study the discrepancies, marking them out."
      },
       {
        description: "Draw a quick line drawing of any portrait. Overlay your lines over the original reference and study the discrepancies, marking them out."
      },
       {
        description: "Draw a quick line drawing of any portrait. Overlay your lines over the original reference and study the discrepancies, marking them out."
      },
       {
        description: "Congratulations on reaching the end! To see how much you have improved, take your time to draw a full portrait of the same reference you had in day 1. Extra: Post your before and after in the community to show your progress!"
      },
    ]
    create_tasks(tasks, challenge_portrait_drawing.id)
    end
end