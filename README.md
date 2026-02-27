# Decision Companion System

**Live Demo:** [https://decision-companion-five.vercel.app/](https://decision-companion-five.vercel.app/)

## My understanding of the problem
Making decisions is easy when there is only one criterion to evaluate (e.g., choosing a laptop based *only* on RAM). The complexity arises when we must weigh multiple different criteria (like Budget, Performance, and Portability) across several comparable options. A true decision companion should be so intuitive and accessible that absolutely anyone can use it from a phone or laptop without any hurdles.

## Assumptions made
* **Aware of existing options:** The user is aware of the options they have to choose from.
* **Aware of key criteria:** The user is aware of the criteria that matter the most to their decision.
* **Users can determine their priorities:** The system assumes users can objectively assign percentage weights to their criteria based on importance.
* **Capable of evaluation:** The user is capable of evaluating and scoring the best options for each specific criterion.
* **Scoring is subjective:** "Good" is subjective. For some, a lower price is better and deserves a high score (9/10), while for others seeking premium quality, a higher price might receive a higher score. The user determines the context.
* **Privacy is preferred by default:** Users might want to make decisions without storing the data permanently. They want frictionless access without logging into an account.

## Why I structured the solution this way
* **Web-Based for Accessibility:** Chose Next.js and React over a CLI application (like Rust) to ensure the tool is widely accessible through any web browser. A CLI would restrict the user base to developers.
* **Familiar Form-like UI:** Structured the application like a step-by-step survey (similar to Typeform or Google Forms). By isolating evaluations to one criterion at a time, users are less overwhelmed.
* **Local Storage & No Auth:** Implemented state persistence via local storage using Zustand. This completely removes the barrier to entry (no login required) and guarantees data privacy, processing everything directly on the user's device. Included a "Save Result" button mimicking "temporary chats"—giving users the choice to save or discard data.
* **Weighted Scoring Model:** Structured the core logic around the Product School decision framework: define criteria &rarr; assign weights &rarr; score options isolated by criterion &rarr; calculate weighted scores using `Score(option) = Σ (normalized_criteria_value × weight)`.

## Design decisions and trade-offs
* **Handling Ties:** When options result in a tie, the system explicitly acknowledges the tie instead of forcing a fake winner via an automated tiebreaker (like fewest weaknesses). Giving the user transparent data empowers them to either make the final call or add more criteria.
* **Integer Scoring over Decimals:** Decided to use whole integers (1-10 for scores, percentages for weights) rather than floating-point numbers. Decimals clutter the UI and provide negligible accuracy benefits for highly subjective metrics.
* **Temporary vs. Saved States:** Trade-off between unlimited storage in a cloud DB and strict 5MB-10MB local storage limits. To mitigate this, users manually choose to "Save Result", and a built-in storage full indicator helps manage capacity gracefully.
* **Tactile Feedback & Visual Breakdown:** Implemented a typewriter sound effect (`playClick()`) on action buttons during the decision flow to add a tactile, engaging feel that mimics physical processing. Additionally, integrated Recharts (`<BarChart />`) on the results page to render grouped bar charts, allowing users to visually break down exactly where an option gained or lost points across criteria, rather than relying on plain text.

## Edge cases considered
* **Zero Weight / Empty Criteria:** The UI prevents users from proceeding if a criterion is left empty or has a 0% weight, as it would mathematically have no impact on the final decision.
* **Equal Distribution Remainder:** Splitting 100% weight across 3 criteria equally yields 33.33%. Because inputs are integers, this creates a 99% total with 1% remainder. Handled this by appending the remainder to the first criterion when using the "Split Equally" utility.
* **Identical Options:** Addressed the dynamic explanation generator failing or providing skewed summaries when two options receive identical scores across the board.
* **UI/UX Limits:** Hard-capped the maximum number of criteria and options to 8 each, preventing the UI and charts from becoming unreadable or breaking on mobile devices.
* **Duplicate Entries:** Handled duplicate option/criteria names by implementing a duplicate finder in the store, as duplicate keys break the Recharts rendering logic.
* **LocalStorage Quota Limits:** Wrapped storage saves in a try-catch block to handle the 5-10MB quota limits, providing a visual "Storage Full" feedback warning to the user to clean up old results.

## How to run the project

### Prerequisites
Make sure you have Node.js and a package manager (`npm`, `yarn`, `pnpm`, or `bun`) installed, or Docker.

### Local Development
1. Clone the repository and navigate to the project folder.
2. Install the dependencies:
   ```bash
   npm install
   # or yarn install, pnpm install, bun install
   ```
3. Run the development server:
   ```bash
   npm run dev
   # or yarn dev, pnpm dev, bun dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) with your browser to use the app.

### Using Docker
1. Build and run the container:
   ```bash
   docker compose up -d --build
   ```
2. The app will be available at [http://localhost:3000](http://localhost:3000).

## What I would improve with more time
* **Auth & Cloud Storage:** Introduce optional authentication and a cloud database for users who explicitly want to sync and store their decision data across multiple devices.
* **Advanced Visualizations:** Introduce alternative chart types (e.g., Radar/Spider charts) to compare overlap and weaknesses of varying options more effectively.
* **Data Exportation:** Allow users to export their decision matrix and explanations to a PDF or CSV format for sharing or record-keeping.
* **Custom Configurable Tie-Breakers:** Give advanced users the option to choose their preferred tie-breaker strategy (e.g., automatically win based on the heaviest weighted criterion).
* **"What If" Scenarios:** Enhance the dynamic explanation generator to provide contextual hints, such as "If you valued your Budget 10% more, Option B would have won."
* **Internationalization:** Add multi-language support to push the original goal of making it accessible to absolutely anyone.
