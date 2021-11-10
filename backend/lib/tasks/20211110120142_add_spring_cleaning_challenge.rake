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

desc 'Add Spring Cleaning challenge'
task add_spring_cleaning_challenge: :environment do
  user_odyssey = User.find_by(username: 'odyssey')
  category_exercise = Category.find_by(title: 'Exercise')
  category_habits = Category.find_by(title: 'Habits')
  category_creativity = Category.find_by(title: 'Creativity')
  category_mindfulness = Category.find_by(title: 'Mindfulness')
  category_productivity = Category.find_by(title: 'Productivity')

  ########################################################################

  ActiveRecord::Base.transaction do
    challenge_spring_cleaning_desc = "Many people avoid spring cleaning simply because they don't know where to begin. But the process of decluttering and then cleaning a space is actually pretty easy. Each task is quick; the tough part is getting started.\nThat’s where this 30-day challenge comes in. This spring cleaning plan outlines a set of tasks to help you declutter and clean every nook and cranny in your home. It will keep you moving from room to room, which goes against traditional advice to work on one room until it's complete before heading to the next. But with a big project like spring cleaning an entire home, the impulse to quit when you get overwhelmed or bored can be strong. So tackling a few projects each day will ensure that you stay motivated."

    challenge_spring_cleaning = Challenge.create!(category_id: category_productivity.id,
                                                  name: 'Spring Cleaning',
                                                  description: challenge_spring_cleaning_desc,
                                                  duration: 30,
                                                  schedule: 'Every day for 1 month',
                                                  creator_id: user_odyssey.id,
                                                  color: 3,
                                                  original_creator: 'Elizabeth Larkin',
                                                  link_to_reference: 'https://www.thespruce.com/spring-cleaning-guide-4134151')

    Map.create!(land: 0, challenge_id: challenge_spring_cleaning.id)

    tasks = [
      {
        name: 'Day 1: Dust',
        description: "- Take a broom to the corners of the ceiling to catch any cobwebs in your kitchen, living room, bedrooms, and bathrooms. Then, sweep or vacuum the floors.\n- Dust the undersides of every chair and table in your home, and then vacuum and mop the floors around them.\n- Clean every mirror in your home, including ones in the bathrooms, bedrooms, and entryway.\n- Dust your books and the knick-knacks on your bookshelves."
      },
      {
        name: 'Day 2: Take Inventory of Your Clothing',
        description: "- If the weather has changed, switch out your seasonal clothing.\n- Wash your winter gloves, hats, and scarves, and pack them up for next year. Take your winter coats to the dry cleaner if necessary.\n- Sort your under-bed storage boxes. Add any applicable items to the donate or mend boxes.\n- Remove odd socks from your sock drawer, and either toss them or use them as cleaning rags.\n- Go through your dresser, and pull out items of clothing you haven’t worn in a year and have no plans to wear again. Put them in your donation box."
      },
      {
        name: 'Day 3: Clean Out Your Medicine Cabinet',
        description: "- Throw away expired medicines. Look up local regulations on how to properly dispose of medicines.\n- Organize your emergency supplies. Make sure you're stocked on first aid necessities.\n- Declutter your linen closet. Pull out the old towels and sheets you no longer use, and put them into your donation box."
      },
      {
        name: 'Day 4: Sort Your Shoes',
        description: "- Sort through your shoes. Add any that you want to donate or repair to those respective boxes.\n- Clean the floors of your closets, and get rid of any unused storage solutions.\n- Wash your slippers."
      },
      {
        name: 'Day 5: Clean Small Appliances',
        description: "- Clean your appliances, including their plugs, tops, bottoms, sides, and any accessories that came with them.\n- Deep clean your coffee maker, following manufacturer instructions.\n- Thoroughly clean utensils, such as can openers, that might not be washed on a regular basis.\n- Replace old kitchen sponges and rubber gloves."
      },
      {
        name: 'Day 6: Clean Your Car',
        description: "- Use a vacuum to clean the inside of your car. Declutter while you go. Don't neglect cleaning the floor mats. Then, wipe down interior surfaces with a cleaning solution and rag.\n- Wash the outside of your car (or bring it to a car wash)."
      },
      {
        name: 'Day 7: Deep Clean Your Fridge and Cabinets',
        description: "- Thoroughly clean your fridge and freezer by removing all shelves, racks, and storage containers and washing them in your bathtub. Toss any old food. Wash your ice cube trays. Wipe down the sides of the fridge and freezer. Then, put everything back in. If you’re afraid of food spoiling, use a cooler to keep food cold while you work.\n- Take everything out of your cabinets, and clean all the surfaces before replacing the items.\n- Check the cabinets for any unexpired food you don't plan to eat that can be donated. Throw out expired or questionable food."
      },
      {
        name: 'Day 8: Toss Clutter in the Bathroom',
        description: "- Declutter and clean your bathroom storage. Take everything out, and clean the backs, sides, and bottoms of the cabinets and drawers.\n- Dispose of any expired bathroom cleaning products.\n- Replace any old, worn toothbrushes and/or razors.\nWash or replace your shower curtain liner."
      },
      {
        name: 'Day 9: Wash Household Linens',
        description: "- Wash your couch covers, pillowcases, and other linens used around the house.\n- Launder the drapes in your living room, dining room, and bedrooms. If you can’t wash them on site, bring them to the dry cleaners.\n- Wash your ironing board cover\n- Wash your tea towels and kitchen towels.\n- Toss small rugs, bathroom mats, and bathrobes in the wash."
      },
      {
        name: 'Day 10: Clean Your Electronics',
        description: "- Clean your remote controls.\n- Clean your phones and tablets.\n- Dust the screens of televisions and computers.\n- Clean your keyboards.\n- Sort through your old CDs and VHS tapes for items to donate."
      },
      {
        name: 'Day 11: Remove Junk',
        description: "- Organize your junk drawer to make sure all items in it have a purpose.\n- Tend to your plants. Remove dead leaves, toss old cut flowers, etc.\n- Get rid of worn pet toys."
      },
      {
        name: 'Day 12: Clean Your Oven',
        description: "- Deep clean your oven following manufacturer instructions.\n- Clean your cooktop and ventilation hood."
      },
      {
        name: 'Day 13: Clean Your Windows',
        description: "- Remove your window screens, and vacuum them using the handheld attachment on your vacuum cleaner. Then, soak them in soapy water before rinsing.\n- Use dish soap diluted in water and a microfiber cloth to wipe down your windows. Then, spray on vinegar diluted in water, and wipe the windows with a clean towel to dry them.\n- Dust your windowsills and frames, and touch up any chipped paint around the sills."
      },
      {
        name: 'Day 14: Toss Old Papers, Magazines, and Newspapers',
        description: "- Recycle old magazines, newspapers, and packing materials.\n- Organize old paper or plastic shopping bags that are lying around in one location, so you can reuse them.\n- Shred sensitive documents you don't need anymore. Scan important papers, and shred the originals if they don’t need to be saved."
      },
      {
        name: 'Day 15: Wash Your Makeup and Hair Brushes',
        description: "- Deep clean your makeup brushes and hair brushes.\n- Toss any liquid makeup over 3 months old and any powdered makeup over a year old."
      },
      {
        name: 'Day 16: Clean Out Your Plumbing',
        description: "- Clean every drain in your home using this method: Pour boiling hot water down the drain, add baking soda, and then add vinegar. Then, cover the drain with a plug for a few minutes. Follow with another pour of boiling water.\n- Schedule a plumber for any leaky or otherwise damaged faucets you can't fix yourself."
      },
      {
        name: 'Day 17: Switch Out Seasonal Decor',
        description: "- Remove any winter decorations still hanging around, including throw pillows, candle holders, throw blankets, and vases.\n- Switch scented candles, hand soaps, etc. from winter scents to fresh spring ones.\nIf you have a fireplace, thoroughly clean it to remove dirt and debris from winter use."
      },
      {
        name: 'Day 18: Vacuum Furniture',
        description: "- Move the couch and any heavy chairs, and clean and vacuum underneath them.\nUse the handheld attachment to vacuum the couch and chairs themselves."
      },
      {
        name: 'Day 19: Clean Your Garage',
        description: "- Declutter your garage, and throw out any unneeded items you haven’t touched since last spring.\n- Wash your gardening gloves, and rinse and wipe off the shoes you wear to do yard work.\n- Sweep your porch, patio, or front steps."
      },
      {
        name: 'Day 20: Clean Out Office Items',
        description: "- Go through your desk drawers, and toss broken items, such as dead pens.\n- Collect and keep office items, such as paper clips, all in one place in your home.\n- Take your stash of coins to a coin machine or the bank."
      },
      {
        name: 'Day 21: Sort Your Mugs and Glasses',
        description: "- Declutter your mugs and glasses. Donate the ones you no longer want, and wash and put away the rest.\n- Wash reusable water bottles and water-filtering pitchers. Then, change the filters."
      },
      {
        name: 'Day 22: Organize Bags',
        description: "- Organize your bags, including backpacks, briefcases, and suitcases. Declutter the insides, and then clean and store them.\n- Clean out your everyday bag or wallet.\n- Wash and store reusable shopping bags all in one place."
      },
      {
        name: 'Day 23: Repair Broken or Damaged Clothing',
        description: "- Either mend any damaged clothing yourself, or take it to a tailor.\n- Take any shoes or boots that need repairs to a cobbler."
      },
      {
        name: 'Day 24: Organize Hobby Supplies and Other Collections',
        description: "- Organize your hobby supplies. This can include crafting supplies, board games, or sporting equipment.\n- Polish silver jewelry, silverware, and any other items that have become tarnished."
      },
      {
        name: 'Day 25: Get the Kids Involved in the Cleaning',
        description: "- If you have young children, teach them how to clean something in their room, and make that their chore from now on.\n- Go through your books (including kids’ books), and donate ones you don't want anymore."
      },
      {
        name: 'Day 26: Dust and Vacuum Some More',
        description: "- Dust your blinds, and then vacuum the floor around them.\n- Dust around your stairs, and then vacuum them.\n- Wipe down your baseboards and other molding where dust tends to collect. Then, vacuum the floor near them."
      },
      {
        name: 'Day 27: Wash the Walls',
        description: "- Wash any interior walls that have marks or stains.\n- Touch up chipped or discolored paint."
      },
      {
        name: 'Day 28: Wash Your Bed Linens',
        description: "- Wash your bed linens, including any mattress covers, duvet covers, pillow liners, throw blankets, and throw pillows.\n- If you have a guest room and the bed hasn’t been used in a while, strip the bed down to the mattress and wash all the linens."
      },
      {
        name: 'Day 29: Sell or Donate Unwanted Items',
        description: "- Did you keep a list of items to sell? Now is the day to take your items to the consignment store or to photograph them to sell online.\n- Bring donations to a local charity."
      },
      {
        name: 'Day 30: Throw It Away',
        description: "- Take a trip to the dump to get rid of any large items that are beyond repair.\n- Check your local regulations for how to get rid of other unwanted items, such as old paint.\n- Wash your garbage cans and recycling bins. Either do this outside or in your bathroom, scrubbing your tub afterward."
      },
    ]

    create_tasks(tasks, challenge_spring_cleaning.id, 30)
  end
end
