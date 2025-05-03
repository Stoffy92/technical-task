# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about the recommended Project Setup and IDE Support in the [Vue Docs TypeScript Guide](https://vuejs.org/guide/typescript/overview.html#project-setup).

# How to run
npm run dev

# Run the tests
npx vitest

# Improvements

This project has been structured in a component based approach, this promotes 
* consistency
* collaboration
* scalability
- We can improve this structure further by applying concepts from domain-driven design, which will come naturally as we add more components/stores

* Responsiveness was an after thought
* Did not spend a lot of time with styling, a lot of improvements could be made - like a theming object to store variables 
* Better typing - not sure if it was an issue with my environment but I could not get this to work as intended, I was aiming for strong typing on my racingStore but didn't quite get there.

# Main gotcha

I was trying to destructure my store, which ended up killing the reactivity

const { nextToGoRaces, loading, error, fetchNextToGoRaces } = useRacingStore(); // this does not work :(

# Last minute improvements - Had some extra time on hands, wanted to improve the task further
* improved type safety and autocomplete when racingStore gets used inside components
* seperated timer logic to seperate component
* added styling to timer component for better UX
* added unit test to timer
* fix unit test imports
* fix linting errors
