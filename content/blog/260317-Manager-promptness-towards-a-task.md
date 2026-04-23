---
title: "Yogini's Promptness Towards a Task"
date: "2026-03-17"
description: "Yogini asked me to make a flow of solution where we can improve the understanding of active status or sync status of the vehicles as well as fleets, so tha..."
tags: ["technology", "product", "journal", "people"]
---

Yogini asked me to make a flow of solution where we can improve the understanding of active status or sync status of the vehicles as well as fleets, so that becomes easier to know what parameters to ask for during each sync call. Even the existing paramters are too confusing and again and again needs answers from either sudarshan or omar to fully udnerstand it.

So I just agrreed ok will work on it and next day when she asked about sync flow I was jot able to explain well, which led to anger on yogini side that we have discussed 3 times why you haven't documneted it yet anywhere. Then I also yes it should be documebted and decided to document after this. The questions were like what are situations where sync takes place, both for vehicle and fleet.

For fleet it was at the vehicle page and when the user clicks on refresh button whereas vehicle is done only on vehicle details page. Then for fleet it goes like just passes fleet unique id and based on that parameter api call designed on aws triggers and updates the bubble database using data api.

Then similarly for the vehicle we pass fleet and vehicle id and api triggers and updates latest data every 5 minute for both. And it's done on frontend all time.

So I was not able to prepare proper solution as I was dreaming about final outputs rather than core solution but what yogini did was made a detail workflow of how things are happening and and modified to show what can be done to make it better in same workflow it was damn simple no fancy designs just used basic confluence table structures to make it ER dia style.

I was unhappy because I have already done similar thing while working on challan module and after that I ended with appreciations but now when they expected me to do I wasted 2 days and not even able to complete it by 50%.

It was bit dissapointing I decided from next onwards I will follow this simple method, I will draw detail and simple to understand flows, like yogini did and propose where is the gap what is wrong and then modified the flow to show better solution and propose it. This should include 3 sides always, bubble frontend, backend and pgdb I have to work on Roster module in same structure now.
