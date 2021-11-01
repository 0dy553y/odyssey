# frozen_string_literal: true
# rubocop:disable all

desc 'Add Healthy Eating challenge, Social Media Detox challenge, and CS3216 challenge'
task add_healthy_eating_social_media_detox_and_cs3216: :environment do
  user_odyssey = User.find_by(username: 'odyssey')

  category_exercise = Category.find_by(title: 'Exercise')
  category_habits = Category.find_by(title: 'Habits')
  category_creativity = Category.find_by(title: 'Creativity')
  category_mindfulness = Category.find_by(title: 'Mindfulness')
  category_productivity = Category.find_by(title: 'Productivity')

  ########################################################################

  ActiveRecord::Base.transaction do
    challenge_eating_desc = "Want to eat more vegetables? Fuel up with fruits? Ditch added sugars and ingredients you can't pronounce? Feed your body right with 30 days of real food. Rather than restriction, this 30-day reset focuses on all the delicious whole food you will be eating. Includes 30 days of healthy real food dinners."
    challenge_eating = Challenge.create(category_id: category_habits.id,
                                        name: 'Healthy Eating',
                                        description: challenge_eating_desc,
                                        duration: 30,
                                        schedule: 'Every day for 1 month',
                                        creator_id: user_odyssey.id,
                                        color: 3,
                                        original_creator: 'Jessica Ball',
                                        link_to_reference: 'https://www.eatingwell.com/article/290467/30-days-of-whole-food-challenge/')
    Task.create(challenge_id: challenge_eating.id,
                name: 'Day 1 - Try this Recipe',
                description: 'This Mediterranean Chicken with Orzo Salad (https://www.eatingwell.com/recipe/261766/mediterranean-chicken-with-orzo-salad/) is packed with veggies, whole-wheat orzo and chicken for a balanced, nutritious main. The easy homemade Greek-style vinaigrette pulls together the dishes flavors and adds a boost of healthy fat. Plus, it makes great leftovers.',
                index: 0)
    Task.create(challenge_id: challenge_eating.id,
                name: 'Day 2 - Make it from Scratch',
                description: 'One easy way to eat more whole foods is to make more of your meals and snacks from scratch. Make hummus (https://www.eatingwell.com/recipe/252614/classic-hummus/) from scratch to pair with vegetables as a healthy, filling snack. Homemade hummus is cheaper than store bought versions and you can adjust the flavors to be exactly the way you want. Try adding herbs, spices or other roasted vegetables for something new.',
                index: 1)
    Task.create(challenge_id: challenge_eating.id,
                name: 'Day 3 - Plan Ahead with Snacks',
                description: "Planning ahead to have whole food-focused snacks available will help you make the healthy choice the easy choice. Bring a bag of mixed nuts with you today in case hunger strikes when you don't expect it. The healthy fat and protein in nuts will tide you over until your next meal.",
                index: 2)
    Task.create(challenge_id: challenge_eating.id,
                name: 'Day 4 - Skip the Alcohol',
                description: 'Though alcohol can have a place in a healthy eating pattern, it’s a good idea to take a night off every now and then. Try skipping the booze tonight (or for longer) and feel the benefits from better hydrate, better sleep and more (https://www.eatingwell.com/article/291290/what-happens-to-your-body-when-you-quit-drinking/). Skipping the alcohol doesn’t need to mean missing out on flavor, swap in one of our easy mocktail recipes (https://www.eatingwell.com/gallery/11437/easy-mocktail-ideas-for-celebrating-without-alcohol/) tonight instead.',
                index: 3)
    Task.create(challenge_id: challenge_eating.id,
                name: 'Day 5 - Try this Recipe',
                description: 'This Hearty Chickpea & Spinach Stew (https://www.eatingwell.com/recipe/270568/hearty-chickpea-spinach-stew/) is on the table in just 30 minutes and is bursting with flavor. The protein-rich main adds in frozen spinach, onions and carrots to make increasing the veg in your day easy and delicious.',
                index: 4)
    Task.create(challenge_id: challenge_eating.id,
                name: 'Day 6 - Read Labels',
                description: 'Take the guesswork out of packaged food by reading the label and ingredients list. Sources of added sugar and sodium come in a variety of names, many of which are unfamiliar. For this challenge, try and avoid packaged foods with a long ingredient list and too much added sugar or sodium.',
                index: 5)
    Task.create(challenge_id: challenge_eating.id,
                name: 'Day 7 - Enjoy a Treat',
                description: 'A healthy eating pattern doesn’t mean cutting out dessert (that would be sad). Instead of skipping sweets all together, make our No-Bake Vegan Date Brownies (https://www.eatingwell.com/recipe/267765/no-bake-vegan-date-brownies/) to satisfy your sweet tooth tonight. It relies on dates for its sweetness so you will get a fiber boost as well.',
                index: 6)
    Task.create(challenge_id: challenge_eating.id,
                name: 'Day 8 - Go Meatless',
                description: 'Use tofu in a stir-fry in place of chicken or beef tonight. Beyond the variety of health benefits of going meatless (https://www.eatingwell.com/article/291622/the-health-benefits-of-eating-a-plant-based-diet-and-how-to-get-started/), it can also help save you money and make your plate more earth-friendly.',
                index: 7)
    Task.create(challenge_id: challenge_eating.id,
                name: 'Day 9 - Fire up the Grill',
                description: 'Even as the weather cools, grilling out is a great option for making whole foods super flavorful. Grill our Grilled Vegetables in Foil (https://www.eatingwell.com/recipe/279523/grilled-vegetables-in-foil/) for a simple side that will leave everyone smiling.',
                index: 8)
    Task.create(challenge_id: challenge_eating.id,
                name: 'Day 10 - Try this Recipe',
                description: 'This Philly Cheesesteak Stuffed Peppers (https://www.eatingwell.com/recipe/270428/philly-cheesesteak-stuffed-peppers/) is a veggie-packed take on a classic sandwich. Not only is this dish packed with protein, but also swapping in peppers in place of the bread helps add an extra serving of veggies to your day.',
                index: 9)
    Task.create(challenge_id: challenge_eating.id,
                name: 'Day 11 - Have Fruit for Dessert',
                description: 'Want an easy dessert that focuses on whole foods and requires little to no prep? Fruit is a perfect treat that is naturally sweet and packed with flavor. Have fruit on hand to make the healthy choice the easy choice when a sweet craving strikes.',
                index: 10)
    Task.create(challenge_id: challenge_eating.id,
                name: 'Day 12 - Fill up with Healthy Fats',
                description: 'Focusing on including a variety of healthy fats in your diet can help you stay fuller and feel more satisfied for longer. Top your salad with nuts and seeds instead of croutons for a healthy fat boost.',
                index: 11)
    Task.create(challenge_id: challenge_eating.id,
                name: 'Day 13 - Prep Breakfast at Night',
                description: "Streamline your mornings by making breakfast in advance. Whether it's one of our healthy overnight oats recipes (https://www.eatingwell.com/recipes/21919/mealtimes/breakfast-brunch/cereals/oatmeal/overnight/) or a freezer breakfast burrito (https://www.eatingwell.com/recipe/268870/vegan-freezer-breakfast-burritos/), there are plenty of delicious breakfast recipes (https://www.eatingwell.com/gallery/12838/make-ahead-breakfast-recipes/?slide=recipeId%3D252646#recipeId=252646) that can be made ahead for grab-and-go.",
                index: 12)
    Task.create(challenge_id: challenge_eating.id,
                name: 'Day 14 - Sip on Tea',
                description: 'Beyond being super relaxing, tea boasts some impressive health benefits (https://www.eatingwell.com/article/153683/health-benefits-of-tea/). From slashing stroke and cancer risk to improving sleep and boosting mood, there are plenty of reasons to enjoy a warm cup of tea tonight.',
                index: 13)
    Task.create(challenge_id: challenge_eating.id,
                name: 'Day 15 - Try this Recipe',
                description: 'These Baked Fish Tacos with Avocado (https://www.eatingwell.com/recipe/263566/baked-fish-tacos-with-avocado/) are prepared in the oven instead of a deep-fryer to help cut down on the type of fat that can harm our heart. The zesty seasoning and bright pico de gallo give this healthy recipe flavors that everyone will love.',
                index: 14)
    Task.create(challenge_id: challenge_eating.id,
                name: 'Day 16 - Eat Beans Today',
                description: 'Beans and legumes are some of the most nutritious foods around. They are packed with nutrients, protein and fiber to help you feel full and at your best. Not to mention, they are some of the most affordable proteins in the grocery store. Try them in one of our healthy bean recipes (https://www.eatingwell.com/recipes/18236/ingredients/beans/) today.',
                index: 15)
    Task.create(challenge_id: challenge_eating.id,
                name: 'Day 17 - Stay Hydrated',
                description: 'Bring a water bottle with you throughout your day to make meeting your hydration goals easy. Sip whenever you think of or see your bottle, to avoid long periods of time without drinking water.',
                index: 16)
    Task.create(challenge_id: challenge_eating.id,
                name: 'Day 18 - Utilize your Slow Cooker',
                description: 'Set it and forget it with some of our favorite slow-cooker recipes for fall (https://www.eatingwell.com/gallery/7913458/easy-slow-cooker-dinner-recipes-to-bring-in-fall/). Using the slow cooker helps cut down on cleanup and lets you have a flavorful dinner ready with minimal active time.',
                index: 17)
    Task.create(challenge_id: challenge_eating.id,
                name: 'Day 19 - Make Homemade Salad Dressing',
                description: 'Store bought salad dressings can have added sugar and preservatives to give it a specific taste and texture. In this challenge, make your own using only whole foods, oils and vinegars. Our tasty recipes can get even the biggest skeptic to fall in love with salad (https://www.eatingwell.com/gallery/11431/our-top-10-vinaigrettes-that-will-make-you-love-salad-again/).',
                index: 18)
    Task.create(challenge_id: challenge_eating.id,
                name: 'Day 20 - Try this Recipe',
                description: 'These Sheet-Pan Fajita Bowls (https://www.eatingwell.com/recipe/274851/sheet-pan-chicken-fajita-bowls/) are served on a bed of warm greens for a healthy boost. Not to mention, they are easy to make and leave you with minimal dishes to clean.',
                index: 19)
    Task.create(challenge_id: challenge_eating.id,
                name: 'Day 21 - Infuse your Water',
                description: 'One easy way to spruce up your water is by infusing it with fruit, cucumber, citrus and herbs. You can get a specific water bottle meant for infusing (https://www.eatingwell.com/article/7826279/anthropologie-fruity-infuser-water-bottle/), but adding slices directly to your glass works too. ',
                index: 20)
    Task.create(challenge_id: challenge_eating.id,
                name: 'Day 22 - Add a Side Salad',
                description: 'An easy way to up your vegetable and fiber intake is by adding a side salad to your meals. This can be as simple as a bowl of greens paired with homemade salad dressing that can be thrown together in minute.',
                index: 21)
    Task.create(challenge_id: challenge_eating.id,
                name: 'Day 23 - Shop Local',
                description: 'When you are trying to eat more whole foods, it can be helpful to get to know the local producers in your area. Check out a local farmers market or co-op to see what is in season in your area.',
                index: 22)
    Task.create(challenge_id: challenge_eating.id,
                name: 'Day 24 - Snack on Nuts',
                description: 'Nuts are an easy, shelf-stable snack that is perfect for grab and go. Their combination of healthy fats, protein and fiber will help keep you full for whatever your day holds.',
                index: 23)
    Task.create(challenge_id: challenge_eating.id,
                name: 'Day 25 - Try this Recipe',
                description: 'Enjoy the flavors of fall with our Massaged Kale Salad with Roasted Sweet Potatoes & Black Beans (https://www.eatingwell.com/recipe/7913360/massaged-kale-salad-with-roasted-sweet-potato-black-beans/). This vegetarian salad gets a boost of protein and healthy fats from quinoa, feta and pepitas.',
                index: 24)
    Task.create(challenge_id: challenge_eating.id,
                name: 'Day 26 - Order Takeout',
                description: "Learn to take the principals of the 30-Day Healthy Eating Challenge into your daily life by ordering a takeout meal that features whole foods. Whether it's a salad, grain bowl or hearty stew, there are whole food options at most restaurants when you need a break from cooking.",
                index: 25)
    Task.create(challenge_id: challenge_eating.id,
                name: 'Day 27 - Switch to Seltzer',
                description: 'Think twice before cracking open a can of soda or other sugar-sweetened beverage. Seltzer is naturally sugar-free and can help you get your fizzy fix with no added calories.',
                index: 26)
    Task.create(challenge_id: challenge_eating.id,
                name: 'Day 28 - Snack on Popcorn',
                description: 'Believe it or not, popcorn (https://www.eatingwell.com/article/287900/is-popcorn-good-for-weight-loss/) is actually a whole grain. This fiber-rich whole food is perfect for snacking. Make your own to help you control the added fat and sodium.',
                index: 27)
    Task.create(challenge_id: challenge_eating.id,
                name: 'Day 29 - Try this Recipe',
                description: 'Try our Salmon & Quinoa Bowls with Green Beans, Olives & Feta (https://www.eatingwell.com/recipe/280167/greek-salmon-bowl/) tonight. This dish showcases Mediterranean flavors with nutritious vegetables, filling protein and whole grains for a balanced dinner.',
                index: 28)
    Task.create(challenge_id: challenge_eating.id,
                name: 'Day 30 - Celebrate with a Mocktail',
                description: 'Congratulations! You are almost finished with the 30-Day Whole Food Challenge. Celebrate this healthy-eating refresh with one of our delicious mocktail recipes (https://www.eatingwell.com/gallery/11437/easy-mocktail-ideas-for-celebrating-without-alcohol/).',
                index: 29)

    challenge_detox_desc = 'Did you know that the average person spends 2 hours a day on social media? And we wonder where all of our time goes. No one’s disputing the potential of social media to connect with friends and family. It’s nice in our modern age when families are often separated by distance because it gives people an easy way to keep in touch. But, despite the benefits of social media, it has its definite pitfalls. Anyone with Facebook or Instagram can tell you how easy it is to hop on with the intention of checking out your feed for a second, then nearly an hour later realizing how much time has passed.'
    challenge_detox = Challenge.create(category_id: category_habits.id,
                                       name: 'Social Media Detox',
                                       description: challenge_detox_desc,
                                       duration: 30,
                                       schedule: 'Every day for 1 month',
                                       creator_id: user_odyssey.id,
                                       color: 4,
                                       original_creator: 'Lori Geurin',
                                       link_to_reference: 'https://lorigeurin.com/social-media-detox-challenge/')
    Task.create(challenge_id: challenge_detox.id,
                name: 'Day 1',
                description: 'Turn off social media push notifications',
                index: 0)
    Task.create(challenge_id: challenge_detox.id,
                name: 'Day 2',
                description: 'Delete all unused apps',
                index: 1)
    Task.create(challenge_id: challenge_detox.id,
                name: 'Day 3',
                description: 'Limit social media to a single 30-minute window',
                index: 2)
    Task.create(challenge_id: challenge_detox.id,
                name: 'Day 4',
                description: 'No phone at meals all day',
                index: 3)
    Task.create(challenge_id: challenge_detox.id,
                name: 'Day 5',
                description: 'Unfollow people who aren’t real friends or don’t interest you',
                index: 4)
    Task.create(challenge_id: challenge_detox.id,
                name: 'Day 6',
                description: 'Leave your phone in a separate room when you go to bed',
                index: 5)
    Task.create(challenge_id: challenge_detox.id,
                name: 'Day 7',
                description: 'No Facebook or Twitter all day',
                index: 6)
    Task.create(challenge_id: challenge_detox.id,
                name: 'Day 8',
                description: 'No checking your phone until after all of your morning tasks are complete',
                index: 7)
    Task.create(challenge_id: challenge_detox.id,
                name: 'Day 9',
                description: 'Meditate for 5 minutes today',
                index: 8)
    Task.create(challenge_id: challenge_detox.id,
                name: 'Day 10',
                description: 'No Instagram all day',
                index: 9)
    Task.create(challenge_id: challenge_detox.id,
                name: 'Day 11',
                description: 'Instagram free day!',
                index: 10)
    Task.create(challenge_id: challenge_detox.id,
                name: 'Day 12',
                description: 'Put your phone away for 3 straight hours',
                index: 11)
    Task.create(challenge_id: challenge_detox.id,
                name: 'Day 13',
                description: 'No social media all day',
                index: 12)
    Task.create(challenge_id: challenge_detox.id,
                name: 'Day 14',
                description: 'Limit of 15 minutes of social media today',
                index: 13)
    Task.create(challenge_id: challenge_detox.id,
                name: 'Day 15',
                description: 'Halfway there! No social media all day',
                index: 14)
    Task.create(challenge_id: challenge_detox.id,
                name: 'Day 16',
                description: 'Try a new activity for 1 hour today',
                index: 15)
    Task.create(challenge_id: challenge_detox.id,
                name: 'Day 17',
                description: 'Only 30 minutes of social media all day',
                index: 16)
    Task.create(challenge_id: challenge_detox.id,
                name: 'Day 18',
                description: 'No Facebook, Twitter, or Instagram all day',
                index: 17)
    Task.create(challenge_id: challenge_detox.id,
                name: 'Day 19',
                description: 'Facebook free day!',
                index: 18)
    Task.create(challenge_id: challenge_detox.id,
                name: 'Day 20',
                description: 'Spend 15 minutes outside in nature',
                index: 19)
    Task.create(challenge_id: challenge_detox.id,
                name: 'Day 21',
                description: 'Write about what you’re thankful for – 10 minutes',
                index: 20)
    Task.create(challenge_id: challenge_detox.id,
                name: 'Day 22',
                description: 'Practice deep breathing for 10 minutes',
                index: 21)
    Task.create(challenge_id: challenge_detox.id,
                name: 'Day 23',
                description: 'Twitter free day!',
                index: 22)
    Task.create(challenge_id: challenge_detox.id,
                name: 'Day 24',
                description: 'No social media until after 5 p.m.',
                index: 23)
    Task.create(challenge_id: challenge_detox.id,
                name: 'Day 25',
                description: 'Call 2 friends today',
                index: 24)
    Task.create(challenge_id: challenge_detox.id,
                name: 'Day 26',
                description: 'Read for 45 minutes today',
                index: 25)
    Task.create(challenge_id: challenge_detox.id,
                name: 'Day 27',
                description: 'Only 15 minutes of social media all day',
                index: 26)
    Task.create(challenge_id: challenge_detox.id,
                name: 'Day 28',
                description: 'Go on a walk or stretch for 15 minutes',
                index: 27)
    Task.create(challenge_id: challenge_detox.id,
                name: 'Day 29',
                description: 'No social media for the entire day',
                index: 28)
    Task.create(challenge_id: challenge_detox.id,
                name: 'Day 30',
                description: 'No phone for the entire day',
                index: 29)

    challenge_cs3216_desc = 'Planning on taking CS3216 - Software Product Engineering for Digital Markets? Unsure of whether you have what it takes to survive the module? Fret not, for this challenge was made to ease you into CS3216. You will build a mobile cloud application just like in Assignment 3 of CS3216.'
    challenge_cs3216 = Challenge.create(category_id: category_productivity.id,
                                        name: 'CS3216',
                                        description: challenge_cs3216_desc,
                                        duration: 19,
                                        schedule: 'Every day for 3 weeks',
                                        creator_id: user_odyssey.id,
                                        color: 5,
                                        original_creator: 'Uncle Soo',
                                        link_to_reference: 'https://cs3216.com/coursework/mobile')
    Task.create(challenge_id: challenge_cs3216.id,
                name: 'Milestone 0',
                description: 'Describe the problem that your application solves.',
                index: 0)
    Task.create(challenge_id: challenge_cs3216.id,
                name: 'Milestone 1',
                description: "Describe your application and explain how you intend to exploit the characteristics of mobile cloud computing to achieve your application's objectives, i.e. why does it make the most sense to implement your application as a mobile cloud application?",
                index: 1)
    Task.create(challenge_id: challenge_cs3216.id,
                name: 'Milestone 2',
                description: 'Describe your target users. Explain how you plan to promote your application to attract your target users.',
                index: 2)
    Task.create(challenge_id: challenge_cs3216.id,
                name: 'Milestone 3',
                description: 'Draw an Entity-Relationship diagram for your database schema.',
                index: 3)
    Task.create(challenge_id: challenge_cs3216.id,
                name: 'Milestone 4',
                description: 'Explore one alternative to REST API (may or may not be from the list above). Give a comparison of the chosen alternative against REST (pros and cons, the context of use, etc.). Between REST and your chosen alternative, identify which might be more appropriate for the application you are building for this project. Explain your choice.',
                index: 4)
    Task.create(challenge_id: challenge_cs3216.id,
                name: 'Milestone 5',
                description: 'Design and document all your REST API. If you already use Apiary to collaborate within your team, you can simply submit an Apiary link. The documentation should describe the requests in terms of the triplet mentioned above. Do provide us with an explanation of the purpose of each request for reference. Also, explain how your API conforms to the REST principles and why you have chosen to ignore certain practices (if any). You will be penalised if your design violates principles for no good reason.',
                index: 5)
    Task.create(challenge_id: challenge_cs3216.id,
                name: 'Milestone 6',
                description: 'Identify some queries (at least 3) in your application that require database access. Provide the actual SQL queries you use (if you are using an ORM, find out the underlying query and provide both the ORM query and the underlying SQL query). Explain what the query is supposed to be doing.',
                index: 6)
    Task.create(challenge_id: challenge_cs3216.id,
                name: 'Milestone 7',
                description: 'Create an attractive icon and splash screen for your application. Try adding your application to the home screen to make sure that they are working properly. Include an image of the icon and a screenshot of the splash screen in your write-up. If you did not implement a splash screen, justify your decision with a short paragraph. Add your application to the home screen to make sure that they are working properly. Make sure at least Safari on iOS and Chrome on Android are supported.',
                index: 7)
    Task.create(challenge_id: challenge_cs3216.id,
                name: 'Milestone 8',
                description: 'Style different UI components within your application using CSS in a structured way (i.e. marks will be deducted if you submit messy code). Explain why your UI design is the best possible UI for your application. Choose one of the CSS methodologies (or others if you know of them) and implement it in your application. Justify your choice of methodology.',
                index: 8)
    Task.create(challenge_id: challenge_cs3216.id,
                name: 'Milestone 9',
                description: "Set up HTTPS for your application, and also redirect users to the https:// version if the user tries to access your site via http://. HTTPS doesn't automatically make your end-to-end communication secure. List 3 best practices for adopting HTTPS for your application.",
                index: 9)
    Task.create(challenge_id: challenge_cs3216.id,
                name: 'Milestone 10',
                description: "Implement and briefly describe the offline functionality of your application. Explain why the offline functionality of your application fits users' expectations. Implement and explain how you will keep your client synchronised with the server if your application is being used offline. Elaborate on the cases you have taken into consideration and how they will be handled.",
                index: 10)
    Task.create(challenge_id: challenge_cs3216.id,
                name: 'Milestone 11',
                description: 'Compare the advantages and disadvantages of token-based authentication against session-based authentication. Justify why your choice of authentication scheme is the best for your application.',
                index: 11)
    Task.create(challenge_id: challenge_cs3216.id,
                name: 'Milestone 12',
                description: 'Justify your choice of framework/library by comparing it against others. Explain why the one you have chosen best fulfils your needs. Lastly, list down some (at least 5) of the mobile site design principles and which pages/screens demonstrate them.',
                index: 12)
    Task.create(challenge_id: challenge_cs3216.id,
                name: 'Milestone 13',
                description: "Describe 3 common workflows within your application. Explain why those workflows were chosen over alternatives with regards to improving the user's overall experience with your application.",
                index: 13)
    Task.create(challenge_id: challenge_cs3216.id,
                name: 'Milestone 14',
                description: 'Embed Google Analytics or equivalent alternatives in your application.',
                index: 14)
    Task.create(challenge_id: challenge_cs3216.id,
                name: 'Milestone 15',
                description: 'Achieve a score of at least 8/9 for the Progressive Web App category on mobile (automated checks only) and include the Lighthouse HTML report in your repository.',
                index: 15)
    Task.create(challenge_id: challenge_cs3216.id,
                name: 'Milestone 16',
                description: 'Identify and integrate with social network(s) containing users in your target audience. State the social plugins you have used. Explain your choice of social network(s) and plugins.',
                index: 16)
    Task.create(challenge_id: challenge_cs3216.id,
                name: 'Milestone 17',
                description: 'Make use of the Geolocation API in your application.',
                index: 17)
    Task.create(challenge_id: challenge_cs3216.id,
                name: 'Milestone 18',
                description: 'Congratulations, your application is complete! Now, acquire at least 100 users.',
                index: 18)
  end
end
# rubocop:enable all
