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


