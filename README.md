## CashMate

### Installation:

### Commands:

- **`cashmate`**: Initialize intractable interface.

- **`cashmate add <type> <amount> <desc>`**: Add a new record

    ``` js
    type: {
        choices: [
            'expense', 
            'earning'
        ],
        alias  : {
            'expense': ['exp','1'],
            'earning': ['ern','2'],
        }
    }
    ```


- **`cashmate show [type]`**: Show records

    ``` js
    type: {
        choices: [
            'all',  // Default
            'expense', 
            'earning'
        ],
        alias  : {
            'expense': ['exp','1'],
            'earning': ['ern','2'],
        }
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