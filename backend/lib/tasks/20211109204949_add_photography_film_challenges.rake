# frozen_string_literal: true
# rubocop:disable all
# task_list is a list of the form { name: string, description: string }[].
# If the name parameter is omitted, then the name of the task will simply be "Day x"
def create_tasks(task_list, challenge_id, num_tasks)
  raise "Tasks don't match expected number of task" if  num_tasks != task_list.length
  task_list.length.times do |i|
    task = task_list[i]
    Task.create!(challenge_id: challenge_id,
                 name: task[:name] || "Day #{i + 1}",
                 description: task[:description],
                 index: i)
  end
end

desc 'Add photography and film challenges'
task add_photography_film_challenges: :environment do
  user_odyssey = User.find_by(username: 'odyssey')
  category_exercise = Category.find_by(title: 'Exercise')
  category_habits = Category.find_by(title: 'Habits')
  category_creativity = Category.find_by(title: 'Creativity')
  category_mindfulness = Category.find_by(title: 'Mindfulness')
  category_productivity = Category.find_by(title: 'Productivity')

  ########################################################################

  ActiveRecord::Base.transaction do
    challenge_photography_desc = 'This 30 day photo challenge will help you grow. If you take a picture everyday for 30 days you will see growth in your images. However, why not join one that pushes you to learn all new types of photography skills that you can continue to use? Join our 30 day challenge to get photography ideas to use each day when you pick up your camera.'

    challenge_photography = Challenge.create!(category_id: category_creativity.id,
                                          name: 'A Photo a Day',
                                          description: challenge_photography_desc,
                                          duration: 30,
                                          schedule: 'Every day for 1 month',
                                          creator_id: user_odyssey.id,
                                          color: 2,
                                          original_creator: "Click It Up A Notch",
                                          link_to_reference: 'https://clickitupanotch.com/30-day-photo-challenge/')

    Map.create!(land: 0, challenge_id: challenge_photography.id)

    tasks = [
      {
        description: "Frame within the frame:\nUse the natural elements within your frame to frame your subject helps you create a unique photo that will draw the viewer into the images."
      },
      {
        description: "Long exposure:\nShow movement by using a slow shutter speed. Don’t forget to use a tripod or put you camera on a steady surface when using this technique."
      },
      {
        description: "Still life:\nGive your pets, friends, kids or spouse a break today. Let’s focus on capturing still life."
      },
      {
        description: "Tell a story:\nToday you are going to take more than one photo. Take at least three different images to tell a story with only your photos."
      },
      {
        description: "Rule of Thirds:\nAlthough this is a common compositional guide it is still powerful."
      },
      {
        description: "Starburst:\nBy adjusting your aperture to a smaller f/stop you can create beautiful starburst effect in your photos."
      },
      {
        description: "Smaller f-stop:\nMost people want to shoot wide open so they can get blurry backgrounds. However, shooting with a smaller f/stop can create powerful images as well"
      },
      {
        description: "Connection:\nWhen photographing people you want to make sure your are able to help the viewer feel their connection in the photo."
      },
      {
        description: "Negative space:\nLeaving empty space in your photo helps to pull your viewer directly to your subject and leaves room for your subject to breathe in the photo."
      },
      {
        description: "Depth:\nThis can be achieved with different lenses or adding layers to your photo."
      },
      {
        description: "Fill the frame:\nQuite different than negative space, for this one you want to fill the frame with your subject."
      },
      {
        description: "Landscape:\nTry your hand at landscape photography."
      },
      {
        description: "Symmetry:\nCreating balance and symmetry in your image is something you can look for in natural elements or create."
      },
      {
        description: "Low light:\nYou don’t need a wall of windows to create beautiful photos. Understanding how to embrace shadows and low light adds depth to your photos."
      },
      {
        description: "Backlighting:\nPeople often think of golden hour when they think of backlighting but there are many types of backlighting."
      },
      {
        description: "Candid:\nStep back and observe the situation. Capture a candid moment."
      },
      {
        description: "Leading lines:\nSeeing lines in your environment and using them properly to draw your viewer in will create a powerful photo."
      },
      {
        description: "Mood:\nThis can be achieved by emotion or shadows. Get creative."
      },
      {
        description: "Silhouettes:\nWhether you find an open field of a door frame the important thing to remember is to meter off of the light source."
      },
      {
        description: "Self portrait:\nPlease don’t be afraid to get in front of the camera. It’s important that you are in the photos as well."
      },
      {
        description: "Reflection:\nAdd a layer of interest to your photo by using a reflective surface."
      },
      {
        description: "Bokeh:\nIt’s so easy to create bokeh with any longer lens while shooting wide open, but I wanted to create the same effect in the foreground."
      },
      {
        description: "Black & white image:\nKeep in mind not every image makes a strong black and white. Instead, you want to capture a photo with strong shadows and bright lights."
      },
      {
        description: "Food:\nI’m not talking about a quick snap of your plate at a restaurant. Take the time to style and set up your shot."
      },
      {
        description: "Dramatic light:\nAll you need is one window, light and shadows. You can create amazing dramatic light images."
      },
      {
        description: "Indoor natural light:\nLearn to see the light in your home. Remember, it’s important that you turn off all overhead lights for today or your white balance will be messed up."
      },
      {
        description: "Portrait:\nDon’t worry, it doesn’t have to be a self portrait this time. Feel free to ask anyone in your life, your child, friend, spouse, or neighbor."
      },
      {
        description: "Street Photography:\nYou don’t have to live in a large city to practice street photography."
      },
      {
        description: "Minimal:\nWhen you approach minimalism look for elements of light, shadows, colors, textures, lines and space. The focus of your subject will be isolated and projected with minimal detail."
      },
      {
        description: "Patterns:\nUsing patterns as a compositional technique adds harmony and rhythm to your photo. You can look for patterns of lines, color, light, shapes, form, curves, objects."
      },
    ]

    create_tasks(tasks, challenge_photography.id, 30)

    challenge_film_script_desc = 'You must attempt to write a script for each of the 30 briefs, with only a day to work on each. Once the day has ended, you can not return to the script, and must publish it in its current state, whether finished or unfinished. I welcome you all to try this challenge.'
    challenge_film_script = Challenge.create!(category_id: category_creativity.id,
                                           name: 'A Film Script a Day',
                                           description: challenge_film_script_desc,
                                           duration: 30,
                                           schedule: 'Every day for 1 month',
                                           creator_id: user_odyssey.id,
                                           color: 3,
                                           original_creator: 'mrvideochap',
                                           link_to_reference: 'https://www.reddit.com/r/Filmmakers/comments/g07exc/30day_script_challenge/')
    Map.create!(land: 0, challenge_id: challenge_film_script.id)

    tasks = [
      {
        description: "A script with a colour in the title"
      },
      {
        description: "A script with a number in the title"
      },
      {
        description: "A script based around summertime"
      },
      {
        description: "A script that reminds you of something you would rather forget"
      },
      {
        description: "A script that needs to be read twice"
      },
      {
        description: "A script that makes you move"
      },
      {
        description: "A script based around exploration"
      },
      {
        description: "A script about drugs or alcohol"
      },
      {
        description: "A script that makes you happy"
      },
      {
        description: "A script that makes you sad"
      },
      {
        description: "A script that you never get tired of"
      },
      {
        description: "A script set in your pre-teens"
      },
      {
        description: "A script based in the 70s"
      },
      {
        description: "A script based around a wedding"
      },
      {
        description: "A script based off another work"
      },
      {
        description: "A script based off a classic favourite"
      },
      {
        description: "A script you wrote with someone else"
      },
      {
        description: "A script set in the year you were born"
      },
      {
        description: "A script that makes you think about life"
      },
      {
        description: "A script that has many meanings"
      },
      {
        description: "A script with the name of a person in the title"
      },
      {
        description: "A script that makes you move forward"
      },
      {
        description: "A script you think everyone should read"
      },
      {
        description: "A script about a group of people who are no longer together"
      },
      {
        description: "A script about someone who is no longer alive"
      },
      {
        description: "A script that makes you want to fall in love"
      },
      {
        description: "A script that breaks your heart"
      },
      {
        description: "A script by someone who is outspoken"
      },
      {
        description: "A script about something you remember in childhood"
      },
      {
        description: "A script that reminds you of yourself"
      },
    ]
    create_tasks(tasks, challenge_film_script.id, 30)


    challenge_film_desc = "This 30 Day Film Challenge is an exciting new way to go through your collection and take an unexpected journey through films you love and some you don’t. The challenge is as follows: watch one film every day that corresponds with the correct instruction. Each day has a different requirement so the films stay versatile and unique. The challenge requires you to watch a variety of films that have some kind of person connection to you and your experience."

    challenge_film = Challenge.create!(category_id: category_creativity.id,
                                             name: '30 films in 30 days',
                                             description: challenge_film_desc,
                                             duration: 30,
                                             schedule: 'Every day for 1 month',
                                             creator_id: user_odyssey.id,
                                             color: 5,
                                             original_creator: "Nerdbot",
                                             link_to_reference: 'https://nerdbot.com/2020/05/22/test-your-might-the-30-day-film-challenge/')
    Map.create!(land: 0, challenge_id: challenge_film.id)

    tasks = [
      {
        description: "The first film you remember watching"
      },
      {
        description: "A film you like that starts with the first letter of your name"
      },
      {
        description: "A film that has more than five words"
      },
      {
        description: "A film with a number in the title"
      },
      {
        description: "A film where a character has a job you want"
      },
      {
        description: "Your favourite animated film"
      },
      {
        description: "A film that you never get tired of"
      },
      {
        description: "A film where you liked the soundtrack more"
      },
      {
        description: "A film you hate that everyone else liked"
      },
      {
        description: "Your favourite superhero film"
      },
      {
        description: "A film you like from your least favourite genre"
      },
      {
        description: "A film that you hate from your favourite genre"
      },
      {
        description: "A film that puts you in deep thoughts"
      },
      {
        description: "A film that gave you depression"
      },
      {
        description: "A film that makes you happy"
      },
      {
        description: "A film that is personal to you"
      },
      {
        description: "Your favourite film sequel"
      },
      {
        description: "A film that stars your favourite actor/actress"
      },
      {
        description: "A film made by your favourite director"
      },
      {
        description: "A film that changed your life"
      },
      {
        description: "A film that you dozed off in"
      },
      {
        description: "A film that made you angry"
      },
      {
        description: "A film made by a director that is dead"
      },
      {
        description: "A film you wish you saw in theatres"
      },
      {
        description: "A film you like that is not set in the current era"
      },
      {
        description: "A film you like that is adapted from somewhere"
      },
      {
        description: "A film that is visually striking to you"
      },
      {
        description: "A film that made you feel uncomfortable"
      },
      {
        description: "A film that makes you want to fall in love"
      },
      {
        description: "A film with your favourite ending"
      },
    ]

    create_tasks(tasks, challenge_film.id, 30)
  end
end
