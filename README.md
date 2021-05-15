# Ricochet Robots solver

[Solver site](https://solver.orthog.uk/)

A browser-based solver for the board game [Ricochet Robots](http://riograndegames.com/Game/163-Ricochet-Robots) designed by [Alex Randolph](https://en.wikipedia.org/wiki/Alex_Randolph).

## Credits

Although all the code is original, the ideas are not and this solver would not exist without prior work by:

* Randy Coulman and his [RubyConf 2015 talk](https://youtu.be/fvuK0Us4xC4)
* [Michael Fogleman](https://www.michaelfogleman.com/projects/ricochet-robot/)
* [Michael Henke](https://github.com/smack42/DriftingDroids)

## Up and running

You will need [NodeJS v14+](https://nodejs.org/en/) and [Docker](https://www.docker.com/).

1. Clone this repository
2. Run `npm install`
3. Run `npm dev` or `npm prod`
4. Run `docker-compose up -d`
5. Visit [localhost:2501](http://localhost:2501/)

## Stack

1. [Typescript](https://www.typescriptlang.org/)
2. [React](https://reactjs.org/)
3. [Redux](https://redux.js.org/)
4. [Webpack](https://webpack.js.org/)

Uses React to provide an interface to set up a game, then a web worker to run the solver.

## History

This solver originally started as a server side PHP implementation to go alongside the main [Orthogonal Automatons](https://orthog.uk) which itself was an attempt to make an online multiplayer version of Ricochet Robots.

The PHP version worked and was planned to be used as an incentive ("you can do this in 3 moves fewer") as well as to validate the difficulty of randomly generated regular challenges but with work on OA stalled (for various reasons) the solver never went anywhere.

I initially held off doing a JavaScript version of the solver primarily as the people I planned on playing OA with would abuse the heck out of it but with OA going nowhere, there doesn't seem any harm now.

This Typescript version is an almost method-for-method re-implementation of the PHP version (currently closed source as no one should see _that_ codebase) but Typescript at least moves the code towards correctness.

## Todo list

1. Trace fixer - the traces for the moves aren't really readable when they overlay one another
2. Tests - ensure the validity of simple and more complex set ups
3. More complete ruleset implementation - no bouncebacks, prisms etc.
4. Board builder - place obstacles as well as robots and a target
5. Stats gatherer - figure out where the bottlenecks lie, ask visitors whether they're okay submitting their data
6. Optimisation - there's likely a huge number of places that can be improved, low hanging fruit would likely be:
   * Valid move calculation
   * Better heuristic calculation
   * Multiple threads - can A* even be threaded?

## Copyright notices 

The original German version of the game is published by and copyright [Hans im Glück Verlags-GmbH](https://www.hans-im-glueck.de/). The English version of the game is published by [Rio Grande Games](http://riograndegames.com/).

The robot icon is used under [Creative Commons Attribution 4.0 International license](https://creativecommons.org/licenses/by/4.0/) from [FontAwesome](https://fontawesome.com/license).
