---
title: "Strava Has Poor vs Rich Data"
date: "2025-12-27"
description: "I opened the Strava heatmap to plan a run in Bangalore and noticed the lines follow rent prices, which says more about who logs a run than who actually moves."
tags: ["journal", "mindset", "city-life", "product"]
---

Today I opened Strava to plan my next run route. I wanted to see where people in Bangalore actually run, so I turned on the heatmap and started scrolling around the city.

After a few minutes of staring at the blue lines, I noticed a few things.

1. The blue lines sit mostly on straight, well-structured roads.

2. They are thickest where stays are expensive. Indiranagar and HSR Layout are covered in them.

3. In areas like Kammanahalli and parts of Hosur Road, there are almost no blue lines at all.

<img width="1080" height="1080" alt="image" src="https://github.com/user-attachments/assets/a934e1cc-849f-4417-93e9-274c429e782f" />

Without meaning to, Strava has drawn a map of rich and poor Bangalore.

My first explanation was simple. People who do physical work all day don't have energy left for a run. They come home tired and sleep. People with desk jobs have spare time, and they can afford to live close to the IT parks, so they don't lose two hours a day in traffic. They have both the time and the energy for a 6 am 5K.

I still think that's mostly right. But the longer I looked at the map, the more it felt like half the picture.

A construction worker probably lifts and walks more in one day than I do in a week. Plenty of people in the older parts of the city walk or cycle to work every morning because it's the cheapest way to get there. That is a lot of movement.

None of it shows up on Strava.

For a line to appear, someone has to own a phone or a watch, have the app installed, and remember to press start before heading out. That's a specific kind of person. So the heatmap isn't really showing who is fit. It's showing who has free time and the habit of recording it.

Even the time and energy argument has more to it. Running for fun needs a footpath that isn't broken or blocked by parked bikes. If you run early or late, you need streetlights. You need a park nearby, or at least a stretch of road where you won't get hit by a bus. Those are easier to find in HSR than in the lanes off Hosur Road.

Then there's the gear. Running shoes, a smartwatch, maybe a Strava subscription. None of it is essential, but every bit of it pushes the lines toward people who already have money.

And running as a hobby is itself a class thing. If your body is tired from work, going out to get more tired on purpose doesn't make much sense. Exercise becomes a hobby only after work stops being physical.

So my first guess holds. It just has more layers than I thought.

If this data only helped me pick a route, it would be harmless. But data like this gets reused.

Strava shares aggregated activity data with cities through a product called Strava Metro. The idea is good. Show planners where people run and cycle so they can build better paths. But if planners follow the lines, the budget follows the lines too. Areas with good roads get better roads, and the blank areas stay blank on paper.

It has already gone wrong in a different way. In 2018 people noticed that Strava's global heatmap was showing the outlines of military bases in places like Afghanistan and Syria. Soldiers were logging their runs, and in regions where almost nobody else used the app, their loops lit up clearly. Nobody's name was attached, but the pattern gave the bases away anyway.

This is the part that stuck with me as someone who builds products. A lot of product decisions start with "let's look at the user data." This map is a good reminder of what that data is. It's data about the users you already have. Anyone who isn't on your product doesn't show up, and it's very easy to read their absence as nobody being there.

The dark spots on the Strava map are not empty streets. People live and work there. They just don't press record.

Every dataset has a Kammanahalli somewhere in it. Do you notice it before you build on top of it, or after?
