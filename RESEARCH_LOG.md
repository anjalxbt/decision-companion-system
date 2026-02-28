# Full AI Prompts (Gists)
- **Landing Page Prompts:** https://gist.github.com/anjalxbt/eeabdbbfd1363ff425af0c4d3a7b55a1#file-landing-page-prompts-md
- **Decide Page Prompts:** https://gist.github.com/anjalxbt/eeabdbbfd1363ff425af0c4d3a7b55a1#file-decide-page-prompts-md
- **Readme Prompts:** https://gist.github.com/anjalxbt/eeabdbbfd1363ff425af0c4d3a7b55a1#file-readme-prompts-md
- **Research Log Prompts:** https://gist.github.com/anjalxbt/eeabdbbfd1363ff425af0c4d3a7b55a1#file-researchlog-prompts-md
---

# DAY 1 [Feb 17]:

### References & Search Queries
1. **Search Query:** "weighted scoring model" (Brave Search Summary)  
   https://search.brave.com/search?q=weighted+scoring+model&summary=1&conversation=08bf03f3b923fde9e32c6679a1527dd98f95
2. **Reference:** Weighted Scoring Model Article (Main structural influence for the app)  
    https://productschool.com/blog/product-fundamentals/weighted-scoring-model  

---

# Day 2 [Feb 18]:

### References & Design Inspiration
- **Reference:** https://21st.dev/community/components  
- **Reference:** https://ui.shadcn.com/ (Used for core accessible UI components)
- **Reference:** https://dribbble.com/ (For layout and typographic inspiration)

---

# Day 4 [Feb 20]:

### References (Zustand State Management)
- **Reference (Video):** https://youtu.be/6tEQ1nJZ51w?si=1fFIUEv8DtejlrSZ   
- **Reference (Video):** https://youtu.be/118ksTGQUs0?si=R0Sp6UPt_IXOh0mM   
- **Reference (Discussion):** https://www.reddit.com/r/reactjs/comments/riq9v6/i_chose_zustand_over_context_api_for_my_side/   

---

# Day 6 [Feb 22]:

### AI Prompts Used & Outcomes
- **Prompt:** "so i have a doubt in the scoring mechanism user always know whiich is good. but for a criteria like prize some poeple opt for higher prize and some people opt for lower prize. so how we handle this"
  - **Outcome (Accepted):** The AI confirmed that "good" is subjective and the user defines it based on context (e.g., lower price gets higher score). Implemented a UI tooltip to explicitly guide the user on this.
- **Prompt:** "in scoring out of 10 put float instead of integers. what do you think abou this change?"
  - **Outcome (Rejected):** The AI suggested floats could add precision but would clutter the UI. Fully rejected floats and retained whole integers, as precision benefits were negligible for subjective scores.
- **Prompt:** "do i need to include 0 (0-10) in scoring instead of 1-10"
  - **Outcome (Rejected):** Decided to stick with 1-10 as a more familiar scoring paradigm for humans.

### References (Table UI)
- https://ui.shadcn.com/docs/components/radix/table
- https://dribbble.com/search/table-ui
- https://21st.dev/community/components/s/table
- https://images.ctfassets.net/6nwv0fapso8r/7awAo8MqT0dLrhBs4TZpKt/896563f3592f6234cc8ebd72cc58b06f/Weighted_Scoring_Model_Example_I.svg

---

# Day 7 [Feb 23]:

### AI Prompts Used, Search Queries & Outcomes
- **Prompt:** "in next js how do we store state in local storage"
- **Prompt:** "does zustand have a feature of storing state in local storage"
  - **Outcome (Accepted):** AI directed me to the Zustand `persist` middleware. Accepted and successfully implemented local storage hydration without any backend.
- **Search Query:** "how to solve hydration error in next js"
  - **Reference:** https://nextjs.org/docs/messages/react-hydration-error 
- **Prompt:** "i am using this formuale for weighted decision making Score(option) = Σ (normalized_criteria_value × weight). so should i score the final value in 10 or 100"
  - **Outcome (Accepted):** Evaluated scaling to 100 for a more "percentage-like" feel that users easily understand.
- **Prompt:** "how i am supposed to handle tie in this situation"
- **Prompt:** "how to develop a dynamic explanation generator for the decision result. this is the data structure that is used to store the values."
  - **Outcome (Modified):** The AI gave a generic tiebreaker generator. Modified it heavily to explicitly *acknowledge* the tie and map out the strengths of the tied options instead of forcing a fake winner.

### References (Charts)
- **Search Query:** "graph components react" (https://search.brave.com/search?q=graph+components+react&summary=1&conversation=08c53e819a6c2df5ac3bfd23df85691f4c92)
- **Reference:** https://ui.shadcn.com/docs/components/radix/chart

---

# Day 8 [Feb 24]:

### AI Prompts Used & Outcomes
- **Prompt:** "how to handle tie when both options have same score"
  - **Outcome (Modified):** Instead of artificially selecting a winner based on minor weaknesses or strengths, modified the logic to explicitly acknowledge it as a true tie. The system now directs the user to "trust your guts" or add more criteria to manually break the tie, as mathematically the options are identical.
- **Prompt:** "what do to do when every options have identical scores"
  - **Outcome (Modified):** Handled edge cases where users input identical scores across every single criterion. Modified the explanation generator to suggest picking randomly or adding more criteria, as mathematically they are identical.

---

# Day 9 [Feb 25]:

### AI Prompts Used & Outcomes
- **Prompt:** "i am using localstorage for my app. what is the max storage capacity of local storage"
  - **Outcome (Accepted):** Discovered the 5MB-10MB limit. AI advised implementing a storage size check. Implemented a `try/catch` wrapper around storage saves.
- **Prompt:** "Duplicate option/criteria names allowed... Fix: Warn or prevent advancing when duplicates exist. do this"
  - **Outcome (Accepted):** AI implemented a `hasDuplicateOptions()` check to prevent Recharts from breaking on duplicate keys.

---

# Day 10 [Feb 26]:

### AI Prompts Used & Outcomes
- **Prompt:** "the user can't distribute perfectly with 3 equal criteria. what do i do either by using parseFloat() and allow decimals or by adding a 'distribute equally' button. which is the best way to fix this situation"
  - **Outcome (Accepted):** AI recommended the "Split Equally" button and putting the remainder in the first iteration. Accepted because adopting floats would make the UI messy with rounding issues (e.g., 99.99%).
---

# Day 11 [Feb 27]:

### AI Prompts Used & Outcomes
- **Prompt:** "i found that in the live link when the user loads that for the first time and when the user clicks on the make decision button it is not working. after few clicks it routes to the /decide page. is this becasue of the playClick()"
  - **Outcome (Accepted):** AI successfully diagnosed two overlapping bugs: the browser's autoplay policies forcefully rejecting the `audio.play()` Promise on the first, non-interacted click, and Next.js lacking a prefetch because it was a standard Button. Accepted the Fix (`try/catch` wrapper on `audio.play()` and semantic `<Link>` component).
### References
- **Lighthouse Web Vitals:** https://pagespeed.web.dev/analysis/https-decision-companion-five-vercel-app/nlw028dwc0?form_factor=desktop
---
- Please read [BUILD_PROCESS.md](./BUILD_PROCESS.md) thoroughly. It contains everything.