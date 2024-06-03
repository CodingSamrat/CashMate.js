## CashMate

### Installation:
- Open terminal & clone [cashmate]('https://github.com/CodingSamrat/CashMate.js.git') git repo
    ``` sh
    https://github.com/CodingSamrat/CashMate.js.git
    ```

- Go to  `CashMate.js` directory
    ``` sh
    cd CashMate.js
    ```
- Install dependencies
    ``` sh
    npm install
    ```

- Install `cashmate` globally 
    ``` sh
    npm install -g .
    ```


### Commands:

- **`cashmate`**: Initialize intractable interface.

- **`cashmate add <type> <amount> <desc>`**: Add a new record

    ``` js
    type: {
        choices: [
            'expense', // alias : ['exp']
            'earning'  // alias : ['ern']
        ]
    }
    ```


- **`cashmate show [type]`**: Show records

    ``` js
    type: {
        choices: [
            'all',     // default
            'expense', // alias : ['exp']
            'earning'  // alias : ['ern']
        ]
    }
    ```

### Examples:

#### Add:-
`cashmate add expense 95 Food`: Add a expense record

`cashmate add earning 5000 job`: Add a earning record


#### Show:-
`cashmate show`: Shows all records

`cashmate show expense`: Shows all expenses

`cashmate show earning`: Shows all earnings