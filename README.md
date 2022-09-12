# TrainEnglish Dictionary and Training Tool

## Description of the program

### Features has been released:

- Cache based on Symbol Table for quick loading word entries. Each word entry writes to the table once it has been searched. At the second time the entry reads from the cache. The feature effectively decrease a count of request to a server.
- Asynchronous timers which can compose to the change of asynchronous calls. It allow us to construct a training game feature with question/answer, pending/score phases.

### How to use

- First you should search a word entry and save it to the **train List**. Training exercises based on the Train List. You can change the list at any time.
- When your Training List is ready you can get started with **Drill**. The Drill is a special type of exercise based on timer. The Drill includes two main phases: pending your answer and show you the right answer. When all the saved words will be drilled the program ended the training and calculate your score.

## Technologies applied:

- Javascript ES6+
- React 18
- Redux 8
