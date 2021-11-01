# frozen_string_literal: true
# rubocop:disable all

desc 'Add LEGO challenge, Mental Health Week challenge, and Happiness challenge'
task add_lego_mental_health_week_and_happiness: :environment do
  user_odyssey = User.find_by(username: 'odyssey')

  category_exercise = Category.find_by(title: 'Exercise')
  category_habits = Category.find_by(title: 'Habits')
  category_creativity = Category.find_by(title: 'Creativity')
  category_mindfulness = Category.find_by(title: 'Mindfulness')
  category_productivity = Category.find_by(title: 'Productivity')

  ########################################################################

  ActiveRecord::Base.transaction do
    challenge_lego_desc = 'Need inspiration as to what to build with LEGO? Take on this challenge and come up with creative designs centered around a different theme every day!'
    challenge_lego = Challenge.create(category_id: category_creativity.id,
                                      name: 'LEGO',
                                      description: challenge_lego_desc,
                                      duration: 30,
                                      schedule: 'Every day for 1 month',
                                      creator_id: user_odyssey.id,
                                      color: 3,
                                      original_creator: 'Fun Learning for Kids',
                                      link_to_reference: 'https://funlearningforkids.com/lego-challenge-calendar-building-ideas/')
    Task.create(challenge_id: challenge_lego.id,
                name: 'Day 1',
                description: 'Make something tall',
                index: 0)
    Task.create(challenge_id: challenge_lego.id,
                name: 'Day 2',
                description: 'Make something that flies',
                index: 1)
    Task.create(challenge_id: challenge_lego.id,
                name: 'Day 3',
                description: 'Make something that floats',
                index: 2)
    Task.create(challenge_id: challenge_lego.id,
                name: 'Day 4',
                description: 'Make something you can find in space',
                index: 3)
    Task.create(challenge_id: challenge_lego.id,
                name: 'Day 5',
                description: 'Make something you can find in the ocean',
                index: 4)
    Task.create(challenge_id: challenge_lego.id,
                name: 'Day 6',
                description: 'Make a robot',
                index: 5)
    Task.create(challenge_id: challenge_lego.id,
                name: 'Day 7',
                description: 'Make an animal',
                index: 6)
    Task.create(challenge_id: challenge_lego.id,
                name: 'Day 8',
                description: 'Make something you find at an amusement park',
                index: 7)
    Task.create(challenge_id: challenge_lego.id,
                name: 'Day 9',
                description: 'Make something from a fairy tale',
                index: 8)
    Task.create(challenge_id: challenge_lego.id,
                name: 'Day 10',
                description: 'Make a superhero',
                index: 9)
    Task.create(challenge_id: challenge_lego.id,
                name: 'Day 11',
                description: 'Make something you want to be when you grow up',
                index: 10)
    Task.create(challenge_id: challenge_lego.id,
                name: 'Day 12',
                description: 'Make something funny',
                index: 11)
    Task.create(challenge_id: challenge_lego.id,
                name: 'Day 13',
                description: 'Make something that rolls on wheels',
                index: 12)
    Task.create(challenge_id: challenge_lego.id,
                name: 'Day 14',
                description: 'Make a castle',
                index: 13)
    Task.create(challenge_id: challenge_lego.id,
                name: 'Day 15',
                description: 'Make a character from your favorite movie',
                index: 14)
    Task.create(challenge_id: challenge_lego.id,
                name: 'Day 16',
                description: 'Make something tiny',
                index: 15)
    Task.create(challenge_id: challenge_lego.id,
                name: 'Day 17',
                description: 'Make a form of transportation',
                index: 16)
    Task.create(challenge_id: challenge_lego.id,
                name: 'Day 18',
                description: 'Make a bridge',
                index: 17)
    Task.create(challenge_id: challenge_lego.id,
                name: 'Day 19',
                description: 'Make something inspired by your favorite book',
                index: 18)
    Task.create(challenge_id: challenge_lego.id,
                name: 'Day 20',
                description: 'Make something you can find in nature',
                index: 19)
    Task.create(challenge_id: challenge_lego.id,
                name: 'Day 21',
                description: 'Make your favorite food',
                index: 20)
    Task.create(challenge_id: challenge_lego.id,
                name: 'Day 22',
                description: 'Make a house',
                index: 21)
    Task.create(challenge_id: challenge_lego.id,
                name: 'Day 23',
                description: 'Make something long',
                index: 22)
    Task.create(challenge_id: challenge_lego.id,
                name: 'Day 24',
                description: 'Make your dream vehicle',
                index: 23)
    Task.create(challenge_id: challenge_lego.id,
                name: 'Day 25',
                description: 'Make a volcano',
                index: 24)
    Task.create(challenge_id: challenge_lego.id,
                name: 'Day 26',
                description: 'Make a gift for someone',
                index: 25)
    Task.create(challenge_id: challenge_lego.id,
                name: 'Day 27',
                description: 'Make something with only one type of brick',
                index: 26)
    Task.create(challenge_id: challenge_lego.id,
                name: 'Day 28',
                description: 'Make a game',
                index: 27)
    Task.create(challenge_id: challenge_lego.id,
                name: 'Day 29',
                description: 'Make something colorful',
                index: 28)
    Task.create(challenge_id: challenge_lego.id,
                name: 'Day 30',
                description: 'Make something you can wear',
                index: 29)

    challenge_mental_health_desc = 'Stressed out and need to relax? Take part in the Mental Health Week challenge to improve your mental health!'
    challenge_mental_health = Challenge.create(category_id: category_mindfulness.id,
                                               name: 'Mental Health Week',
                                               description: challenge_mental_health_desc,
                                               duration: 7,
                                               schedule: 'Every day for 1 week',
                                               creator_id: user_odyssey.id,
                                               color: 1,
                                               original_creator: 'Spectrum Mental Health',
                                               link_to_reference: 'https://mentalhealth.ie/blog/mental-health-week-7-day-challenge')
    Task.create(challenge_id: challenge_mental_health.id,
                name: 'Day 1 - Take Time to Laugh',
                description: 'Watch a comedy or check out your favorite comedian. Laughter helps reduce anxiety.',
                index: 0)
    Task.create(challenge_id: challenge_mental_health.id,
                name: 'Day 2 - Get to Bed 30 Minutes Earlier',
                description: "A good night's sleep helps us to recover from mental as well as physical exertion.",
                index: 1)
    Task.create(challenge_id: challenge_mental_health.id,
                name: 'Day 3 - Listen to a Podcast',
                description: 'Fuel your mind today by listening to a mental health podcast that is relatable to you.',
                index: 2)
    Task.create(challenge_id: challenge_mental_health.id,
                name: 'Day 4 - Relax in a Warm Bath',
                description: 'Try adding Epsom salts to soothe aches and pain and help boost magnesium levels, which can be depleted by stress.',
                index: 3)
    Task.create(challenge_id: challenge_mental_health.id,
                name: 'Day 5 - Drink Enough Water',
                description: "Use the '8 glass rule' and avoid symptoms of dehydration like mood swings, tiredness, headaches, and fatigue.",
                index: 4)
    Task.create(challenge_id: challenge_mental_health.id,
                name: 'Day 6 - Have a Phone-Free Night at Home',
                description: 'Set the phone aside and find new ways to occupy yourself - reading a book, chats with a loved one, or work on a creative project.',
                index: 5)
    Task.create(challenge_id: challenge_mental_health.id,
                name: "Day 7 - Don't Complain at all Today",
                description: 'Each time you get annoyed or frustrated by things, try turning your thinking to something positive.',
                index: 6)

    challenge_happiness_desc = 'It’s easy to believe that you need a new car and the perfect Instagram-worthy lifestyle in order to be happy. But does living your dream life without any challenges really make it better? Improve your happiness by taking part in this challenge!'
    challenge_happiness = Challenge.create(category_id: category_mindfulness.id,
                                           name: 'Happiness',
                                           description: challenge_happiness_desc,
                                           duration: 30,
                                           schedule: 'Every day for 1 month',
                                           creator_id: user_odyssey.id,
                                           color: 4,
                                           original_creator: 'Captivating Crazy',
                                           link_to_reference: 'https://captivatingcrazy.com/how-to-be-happy/')
    Task.create(challenge_id: challenge_happiness.id,
                name: 'Day 1 - Clean the Bed Sheets',
                description: 'Getting into a nice fresh bed at the end of the day is a great way to feel all your troubles & stress leave your body.',
                index: 0)
    Task.create(challenge_id: challenge_happiness.id,
                name: 'Day 2 - Listen to Music from your Younger Years',
                description: 'Listening to the music that you enjoyed in your younger years is one of the best ways to feel great & remember the good times!',
                index: 1)
    Task.create(challenge_id: challenge_happiness.id,
                name: 'Day 3 - Meditate for 30 Minutes',
                description: 'How often do you get to just sit & be alone with your thoughts? Take some time today to quiet your mind & appreciate the silence! You can even use a guided meditation from YouTube if you prefer.',
                index: 2)
    Task.create(challenge_id: challenge_happiness.id,
                name: 'Day 4 - Treat Yourself to some Flowers',
                description: 'Flowers can boost your mood by bringing a bright, colorful & cheerful atmosphere into your home. Either pick some from your garden or buy some from your local store & spend some time relaxing as you arrange them.',
                index: 3)
    Task.create(challenge_id: challenge_happiness.id,
                name: 'Day 5 - Compliment Someone & Yourself',
                description: 'Make a point today of bringing a little happiness to someone else’s day by complimenting them… make sure you share in that happy feeling by offering yourself some compliments too!',
                index: 4)
    Task.create(challenge_id: challenge_happiness.id,
                name: 'Day 6 - Dance like No One is Watching',
                description: 'We all know that exercise is a great way to release endorphins & other happy chemicals into our brains but it’s also so much fun to blast some loud music and dance about like crazy!',
                index: 5)
    Task.create(challenge_id: challenge_happiness.id,
                name: 'Day 7 - Take Yourself Out for Lunch',
                description: 'Create yourself a little picnic to enjoy in the park or if you prefer, visit a local bakery or cafe to enjoy some quality time having lunch by yourself.',
                index: 6)
    Task.create(challenge_id: challenge_happiness.id,
                name: 'Day 8 - Do Something Creative',
                description: 'There’s a quote by Kurt Vonnegut that says ‘practicing any art ― no matter how badly ― makes the soul grow. “So do it,”’ …& you don’t have to be a talented artist to get creative either… try doing some free writing where you just let your thoughts flow out onto the page, or cook a meal from scratch or simply put together a playlist of your favorite songs on Spotify.',
                index: 7)
    Task.create(challenge_id: challenge_happiness.id,
                name: 'Day 9 - Take a Lovely Hot Bath',
                description: 'Spend some time today having a lovely hot bath with your favorite bubbles. You can even light some candles & play some music while you enjoy your relaxing soak to make it feel even more luxurious!',
                index: 8)
    Task.create(challenge_id: challenge_happiness.id,
                name: 'Day 10 - Create a Pinterest Board Full of the Things you Love',
                description: 'Pinterest is a haven of feel-good inspiration & ideas… create a board and fill it with all the things you love! From beautiful locations to your favorite quotes & recipes…',
                index: 9)
    Task.create(challenge_id: challenge_happiness.id,
                name: 'Day 11 - Bake a Cake',
                description: 'Have a look on the Internet for some easy & delicious cake recipes & bake yourself or someone else a cake. It feels really good to give & receive food so you’ll make someone really happy when you hand over the delicious treat you baked yourself.',
                index: 10)
    Task.create(challenge_id: challenge_happiness.id,
                name: 'Day 12 - Go for a Walk',
                description: 'Go for a walk today & appreciate the fresh air blowing in your face & the nature around you.',
                index: 11)
    Task.create(challenge_id: challenge_happiness.id,
                name: 'Day 13 - Call a Friend',
                description: 'Everyone feels better after a good chat & giggle with a friend… I’m sure there’s a friend or family member who would love to hear from you today!',
                index: 12)
    Task.create(challenge_id: challenge_happiness.id,
                name: 'Day 14 - Read a Book',
                description: 'You might not be able to finish a whole book in one day but get started with a new good book or pick up the book you’re already halfway through!',
                index: 13)
    Task.create(challenge_id: challenge_happiness.id,
                name: 'Day 15 - Learn Something New',
                description: 'You can never have enough knowledge! Is there anything you’ve always been curious about? or something that you don’t understand how to do?  Maybe you don’t know how to bleed a radiator or maybe you wouldn’t know where to start with pumping up your car tires? Take some time today to look up the answers… you’ll give yourself a real boost in confidence too!',
                index: 14)
    Task.create(challenge_id: challenge_happiness.id,
                name: 'Day 16 - Try Something New',
                description: 'Learning a new skill is a really fun way to challenge yourself while giving you that happy feeling of accomplishment too! You could teach yourself the alphabet in another language or learn some new photography skills…',
                index: 15)
    Task.create(challenge_id: challenge_happiness.id,
                name: 'Day 17 - Help Someone',
                description: 'Help somebody else today in any way that you can! It will not only make you feel happier, you’ll also make someone else really happy too.',
                index: 16)
    Task.create(challenge_id: challenge_happiness.id,
                name: 'Day 18 - Start a Journal',
                description: 'Start a journal today to track & record your daily habits, write down your goals or list the things you really appreciate in your life right now.',
                index: 17)
    Task.create(challenge_id: challenge_happiness.id,
                name: 'Day 19 - Do a Gentle Yoga Practice',
                description: 'There are so many health benefits to practicing yoga & happiness is one of them.',
                index: 18)
    Task.create(challenge_id: challenge_happiness.id,
                name: 'Day 20 - Uplevel Something',
                description: 'Have you got anything in your life that needs a little upgrade? Maybe your underwear is a little ripped or maybe you’ve been wanting to buy a better shampoo for a while… Today, find something that isn’t filling you with joy & upgrade it to a better option. Buy yourself a new pair of undies that make you feel like a million bucks or treat yourself to that better shampoo… it doesn’t have to be expensive, just better than you had before! Go on, you deserve it!',
                index: 19)
    Task.create(challenge_id: challenge_happiness.id,
                name: 'Day 21 - Celebrate Every Win',
                description: 'There really are no small wins in life! Every tiny step forward deserves to be celebrated! So today, think of something you’ve achieved recently & celebrate that win! You can celebrate in many ways that don’t have to include spending a ton of money like cooking a nice meal, writing your win down in your journal, or baking some nice cookies.',
                index: 20)
    Task.create(challenge_id: challenge_happiness.id,
                name: 'Day 22 - Exercise',
                description: 'Exercise is always on the list when people want to know how to be happy! Just a 20-minute session of exercising will give you a mood boost that lasts for over 12 hours!',
                index: 21)
    Task.create(challenge_id: challenge_happiness.id,
                name: 'Day 23 - Cook a Meal from Scratch',
                description: 'Whip up a storm in the kitchen today & cook your dinner from scratch! Even better enjoyed with good company!',
                index: 22)
    Task.create(challenge_id: challenge_happiness.id,
                name: 'Day 24 - Make a Fancy Breakfast',
                description: 'Today, give your whole day & mood a positive boost by creating a breakfast that’s a little more fancier than you’re used to!',
                index: 23)
    Task.create(challenge_id: challenge_happiness.id,
                name: 'Day 25 - Sit Outside & Listen to the Birds',
                description: 'There’s nothing better for happiness than listening to the birds chirping away as they fly around the garden without a care in the world.',
                index: 24)
    Task.create(challenge_id: challenge_happiness.id,
                name: 'Day 26 - Tidy an Area of your Home',
                description: 'Bring about the happy feelings today by decluttering & tidying an area of your home. Once the area is tidied be sure to spend time enjoying the space & the feelings of accomplishment!',
                index: 25)
    Task.create(challenge_id: challenge_happiness.id,
                name: 'Day 27 - Visit Somewhere New',
                description: 'Go out today and visit somewhere you’ve never been before. It could be a historic attraction where you’ll learn something new or even a new park you haven’t explored before. It will help you to get curious & open your mind to new experiences & opportunities!',
                index: 26)
    Task.create(challenge_id: challenge_happiness.id,
                name: 'Day 28 - Watch the Sunrise',
                description: 'It’s an incredibly peaceful feeling to wake up before everyone else & enjoy a hot cup of coffee while you watch the sunrise! It feels like bonus time!',
                index: 27)
    Task.create(challenge_id: challenge_happiness.id,
                name: 'Day 29 - Eat Healthily',
                description: 'Being healthy isn’t about being slim or spending hours working up a sweat in the gym… it’s about treating your mind & your body the right way. You should definitely enjoy a slice of cake if you want some but you should also eat some healthy foods too… It’s all about balance! Today try to incorporate lots of healthy foods into your diet… your body will thank you!',
                index: 28)
    Task.create(challenge_id: challenge_happiness.id,
                name: 'Day 30 - Have a Pyjama Day',
                description: 'Spend the whole day today just chilling out in your pajamas doing nothing… after all, we all need a break to recharge & re-energize ourselves & you really shouldn’t feel guilty doing it either!',
                index: 29)
  end
end
# rubocop:enable all
