# Day 1 [Feb 17]:
***
## [morning]
Yesterday I got the mail and read through all the requirements. First of all, I thought about building a CLI tool because agentic workflows are trending right now and becoming mainstream with the arrival of Claude Code, OpenCode, and the agentic thing called OpenClaw.

A few months back, I built a CLI number guessing game (https://github.com/anjalxbt/numba-wumbo) using Rust to learn the language. I published it as a crate and it got 500+ all-time downloads (https://crates.io/crates/numba-wumbo).

Recently, I also started working on a small CLI/TUI project called mooncap (https://github.com/anjalxbt/mooncap) to notify users when a certain crypto coin reaches a target market cap using the Dexscreener API. I’m still working on it and adding more features. I’m using the ratatui framework for TUI and Rust because I want to get better at Rust and improve my skills in building TUI applications.

Most of the code in mooncap is vibecoded because I wanted to explore how powerful these AI tools actually are. This video stuck in my mind (https://x.com/thorstenball/status/2022310010391302259?s=20).

Then I started thinking, I don’t have that much knowledge in Rust yet. What if there’s a bug? Can I actually trace the program flow properly and fix it confidently?

Also, if I build a CLI decision companion, it can only be accessed by people with developer knowledge or at least someone who owns a laptop. I kept thinking, this system should be so simple and flawless that even my grandparents can use it. That’s how we can truly drive adoption.

A decision companion system shouldn’t be constrained to a small group of users. Everyone needs a system that helps them make better decisions.

So the better way to build this is as a web interface, so anyone with a phone or laptop can access it easily.

That’s why I’m choosing Next.js/React for this project. I’ve already built a few projects with this stack and have some OSS contributions as well.
***
## [evening]

Now I’ve decided what kind of thing I want to build. Now I need to decide why I should build this and how I should build this.

I thought about this all day and came to a conclusion. If I’m selecting from options based on only one criterion, I don’t really need a decision companion. I can easily pick the best one because there’s only one thing to worry about.

For example, choosing a laptop from a list. If my only criterion is higher RAM, I’ll just go for the laptop with the highest RAM. Simple.

Same in the case of selecting a candidate from a given list based only on their React skills. I can choose the one with more React projects and stronger fundamentals.

The real problem arises when there are two options with the same result, or when we are considering multiple different criteria. That’s when we need a decision companion to make a better decision.

For example, in the laptop case, let’s say I’m only considering RAM. But there are two laptops with the same RAM spec that I need. Now I’m confused. So I introduce another criterion.

Let’s say the second criterion is budget. In that case, I’ll select the laptop with the lower price, since both of them have the same RAM.

This is where decision-making starts getting layered.
***
## [night]
Now I need to decide how to build this. Nowadays AI is very powerful. But before building anything, I want to train my brain to clearly define the “how” and the constraints.

Until this point, I didn’t look at any resources. I wanted to think everything through on my own. I gave enough time to my brain to formulate a solution because I’ve been thinking about this problem since morning.

So I came to a conclusion.

A user can always select the best option if there is only one criterion. But if the options involve different criteria, we can isolate each criterion and evaluate them separately.

So I thought about giving ratings to each option based on each criterion. Then multiply those ratings with the priority (weight) of that criterion. In that way, we can calculate a final score and find the best choice among the options.

This was my solution.

After that, I started searching about the `weighted scoring model`. I found a good article and attached it in today’s `RESEARCH_LOG.md` file. It gave me a much clearer structure, and most of my assumptions were actually right.

Now it’s time to build the project.
***
# Day 2 [Feb 18]:
## [evening]
### Decision Framework (Inspired by Product School)

After reading the article from Product School, I decided to follow this structured evaluation flow:

1. Define the criteria that matter most
2. Assign weights to each criterion
3. Score each option against the criteria
4. Calculate the weighted scores
5. Analyze the results and prioritize


### Development Updates

- Installed Tailwind CSS for utility-first styling.
- Installed shadcn/ui for ready-to-use, customizable components.
- Began exploring design inspiration for UI direction.

## [night]
- Designed a simple landing page which describes what the app does.
- Added a call to action on the landing page that routes to `/decide`, which is not implemented yet.
- Also added a `/how-it-work` link at the top right corner of the landing page to describe how the app works. For now it’s empty will implement it once the app is complete.
***
# Day 3 [Feb 19]:
## [morning]
- From the above flow, the first thing I should ask the user is: “What do you want to decide?” because this helps identify the actual question they are trying to make a decision about.

- I thought about the UI for a while and came to the conclusion that a form-like UI is better because people are very familiar with Google Forms, Typeform, and Airtable. These feel like surveys, and users already understand that flow.

- So I developed a `/decide` page with a step tracker at the top to show where they are in the process. A question appears as the title, with an input field below it, and a button to move to the next card.

- For every card, I decided to implement an “i” button at the right corner because any value change can alter the whole decision. These info buttons provide better clarity.

- Added shadcn components like buttons, dialog, card, and input.

- I’m also thinking about adding navigation buttons at the bottom for better navigation.
## [night]
The next step is to input different options.

- From this step onwards, the code is getting bigger.
- Now I need to think about state management.
- First, I thought about adding authentication and a database. Then I paused. I want to make this simple and accessible for everyone without any hurdles. So I decided to avoid auth and store the previous results in local storage instead.

My main inspiration for this was https://www.ilovepdf.com/ because whenever I need to do anything with a PDF, I go to that site. It doesn’t require any login and it does everything related to PDFs for me.

But the concern was, I think they process the data on their servers. So I decided to avoid processing any data in a database and instead handle everything locally using local storage.
***
# Day 4 [Feb 20]:
## [night]
- The `/decide` page is getting bigger, so I introduced the Zustand state management library. I’m not a big fan of adding too many dependencies, but Zustand is very lightweight and it doesn’t require a provider.
- Moved all the state into the store.
- Now I need to split the steps into different components.

*Nowadays shipping code is easy, but maintaining the code is hard.*
***
# Day 5 [Feb 21]:
## [evening]
### thoughts
- Today we had a call from the Vonnue team. I think I am on the right track.
- One small modification I am considering is about how I document the process. Usually, I write my thinking process in my laptop’s text editor, then I use ChatGPT to check the grammar and convert it into markdown code. I commit the updates from the browser itself because it gives a live preview, and the commit message is generated by GitHub Copilot.
- Most of my development commits follow https://www.conventionalcommits.org/en/v1.0.0/. This was introduced to me earlier when I was participating in a hackathon. Since I am using GitHub to document everything, I will add a `docs` prefix for commits on `.md` files so that judges can easily evaluate things.

### Development Updates
- Developed step three for entering the criteria and their priority.
- In my mind, I was thinking about inputting the criteria and their priority in the same card.
- Later, I decided to split that card into two sub-parts: the first part for entering the criteria, and the second part for entering their priority weights.
- This approach also enables the user to verify their criteria in the second part and make sure they entered everything correctly.

### edge case
- I was testing step 3 with different inputs, and I found a bug / edge case in my code. The user can move to the next step even if the priority weight of a criterion is 0%.
- This shouldn’t be allowed because a criterion with 0% weight is pointless. It doesn’t affect the result at all, so there is no need to include it.
- Therefore, I need to change the code in a way that the user can move to the next step if and only if every criterion has a weight greater than 0%. If a criterion with 0% is present, the app should display a warning asking the user to remove that criterion from the previous step. And it’s easy to remove from the previous step because everything is stored in separate state.

## [night]
### bug found
- Encountered a bug while testing step (3), which is the step for entering criteria. I was allowing the user to go to part 2 of step 3 even if there were empty criteria.
- I found the bug in this way: I added three criteria with 50%, 30%, and 20%. Then I went back, removed the letters in the last criterion, and clicked next. The card displayed only two criteria, but the total still reflected 100%. The expected value was 80%.
- Therefore, I updated the `canAdvanceCriteriaNames` function in the store to make sure all criteria are properly filled. If there is any criterion left empty, the app displays a warning asking the user to delete it.

### thought / planning
- Tomorrow I am planning to develop step 4, which is scoring weights against each option.
- Like the previous card, it will follow a similar structure to step 3. It will contain sub-parts. The number of sub-parts is directly proportional to the number of criteria. If there are 5 criteria, there will be 5 sub-parts in step 4.
- The UI design will be similar to part two of step 3 (criteria weights). The heading will show the criterion. Below that, there will be a label for each option, and opposite to that there will be an input box to enter the score.
- Scoring will be out of 10. There is no condition like the previous step where the total should add up to some value.
- The user can score each option out of 10 for every criterion.
***

# Day 6 [Feb 22]:
## [evening]
- Developed the weighing step as I mentioned above.
- Why I developed this step in this way is because from the beginning itself it was clear that a user can always choose the best option if there is only one criterion.
- Therefore, in this component, instead of giving scores in a single go, I developed it in a way that the user can compare options based on one criterion at a time, isolating each one.

## [night]
### edge case
- One thing I noticed is that in most cases this can be ignored, but for criteria like `price`, some people prefer a higher price and some people prefer a lower price. So I need to clearly define how to handle this. I will come back after researching about it.
- After the research, I found out that scoring is subjective. The user defines what “good” means. If the user prefers a low price, they should score a $500 laptop as 9/10 and a $2000 laptop as 2/10. If the user prefers a premium product, they should reverse the score.
- So I updated the help dialog in step 4 (`step-weigh.tsx`) for better clarity.

### thoughts / planning
- I also thought about changing the data type of the score to float.
- I thought about changing the scale from 1–10 to 0–10.
- After researching, I rejected both.
- For the last step, I am thinking about displaying a table to show all the values the user has entered, just to make sure everything is correct. I will be referring to the weighted model example table from the article I mentioned in the research log (Product School article).
- Below that, there will be a “Decide” button to calculate the result.

### Development Updates
- developed the last step that displays all the entered values to take the final decision
***
# Day 7 [Feb 23]:
## [morning]
### thoughts / planning
- Before calculating the final result, I want to do one thing. The main problem that arises when filling a form-like application is that if a refresh happens or the connection is lost, all the previously entered data is gone.
- To avoid that, I want to store the result in local storage after completion.
- That is why I put a curly bracket of localStorage on the client state in the design diagram.
### Development Updates
- After researching, I found out that Zustand has a `persist` middleware for handling local storage. So I implemented that feature.
- It was causing a flash in the UI because of hydration issues. This happened due to the difference in state between the server and the browser. I fixed it by adding a `useEffect` in the page.
- Also developed a “Start Over” button to clear all the client state and start a new decision.

## [evening]
### thoughts / planning
- Now it’s time to build the core logic of the decision. I will be following this formula:  
  `Score(option) = Σ (normalized_criteria_value × weight)`.
- I also need to decide how to calculate and handle ties.

### Development Updates
- Developed the core logic for taking the decision based on the above-mentioned formula.
- For now, I am giving the same rank when a tie occurs. I will figure out what to do when a tie happens later.
- Decided to go with a score range from 1–100.

## [night]
### thoughts / planning
- I need to develop a dynamic explanation generator.
- Need to build the UI to display the result with the explanation.
- Planning to add some graphs, maybe.
- So by today or by tomorrow, 90% of the app will be built.

### Development Updates
- built a dynamic explanation generator

***
# Day 8 [Feb 24]:
## [morning]
### development update
- Developed the result card.
- Displayed the rank in a leaderboard style.
- Below that, rendered the explanation.
- Instead of graphs, used charts to show the score by criteria.

### thoughts / planning
- Next, I need to develop a profile page to display all the previous results.
- Want to store the final result in local storage for this.

### edge case
- I tested two options with the same values.
- They are getting the same rank, but the explanation generator is only giving a summary for the first entered option by comparing it with the second one. The problem is both are actually the same.
- I need to think about how to handle this situation.

## [evening]
- Developed a “Save Result” button in the result card to store the result in local storage.
- Wrote functions for writing and deleting results from local storage.
- Built a profile button at the top right corner of all pages.
- Rendered all the saved results on the profile page.

## [night]
- After researching how to handle ties, three options came up:  
  1) Acknowledge the tie  
  2) Tiebreaker by Best Single Criterion  
  3) Tiebreaker by Fewest Weaknesses  
- I chose option 1 because the whole point of this app is to help users decide with clarity. Forcing a fake winner is not the point. When it’s genuinely tied, the user should understand what each option is best at and make the final decision themselves. Or they can add more criteria to break the tie.
- So I modified the explanation generator to handle these situations.
- Another thing: what if the user gives the same scores for each option across all criteria? There is no real point in adding identical scores everywhere, but the explanation generator is capable of handling this case as well.


# Day 9 [Feb 25]:
## [morning]
### thoughts / planning
- You may ask why I put a “Save Result” button instead of saving the result directly to local storage.
- The inspiration came from ChatGPT. Even though we can ask questions and they get saved in chat history, they also implemented a `temporary chat` feature to search something without saving it. So what if the user wants to take a decision without storing any data? If the user wants to save it, they have the option to do so.
- We are not forcing the user to save data. Everything is the user’s choice.

## [evening]
### development updates
- The app is almost mature now.
- Today I mainly focused on refactoring the code for better maintainability.
### thoughts / planning
- Now I need to test the app with different cases to find any flaws.

## [night]
### findings and solutions
- After testing with different test cases, I found some flaws.
- Adding more than 8 options or criteria makes the app unusable and the chart unreadable. Therefore, I fixed the maximum number of options and criteria to 8.
- Also found out that I can add the same options and criteria repeatedly. So I implemented a duplicate finder in the store to prevent that.
- Because the data is stored in local storage, after researching I found that the maximum capacity is around 5MB–10MB. So I added a storage full indicator, so the user can delete unwanted results and then come back and save new ones.

***
# Day 10 [Feb 26]:
## [morning]
### edge case
- This edge case came in an unexpected way. I got a split of 33.33 rupees on Google Pay, and then I thought, what if there are 3 criteria and I want to split them equally?
- The thing is, I am taking integers as input. So I can’t split equally because 33 + 33 + 33 = 99. One percent is remaining.
- Then I researched about this. I found that allowing decimals would make the UI messy, and adding decimals gives almost nothing in accuracy.
- Therefore, I implemented a “Distribute Equally” button. The first criterion gets the extra 1%.

### development updates
- implemented the how it works page
- improved the seo optimization

## [night]
- Implemented Docker for a better setup.
- The app is almost complete.
- Now I need to write the README and set up things for submission.
***
# Day 11 [Feb 27]:
- deployed the project on vercel
- checked web vitals in https://pagespeed.web.dev/ and found some contrast issues everything is fixed now