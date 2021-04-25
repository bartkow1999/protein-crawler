# protein-crawler
This application is the web crawler, which fetches offers from SFD store (sfd.pl). It calculates, which protein (WPC) costs the least per one serving (30g).

## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Setup](#setup)

## General info
The project was made in **March 2021**.

## Technologies
* JavaScript
* Node.js
* Cheerio
* request

## Setup
It`s preferred to open in Visual Studio Code.

Clone this repository using git bash:
```
https://github.com/bartosztkowalski/protein-crawler.git
```
In terminal execute:
```javascript
node program.js
```


The result is a list of offers, sorted by price per serving (30g) in PLN.
Notation:
```
[ 
...
[ <offer title>, <price per whole packaging [PLN]>, <packaging weight [g]>, <price per 30g [PLN]>  ]
...
]
```
For example:
```
[
  [ 'WPC 80 Pure Protein', 23.99, '700g', 1.03 ],
  [ 'Dzikie Białko', 119, '3000g', 1.19 ],
  [ 'WPC Protein Econo', 99.99, '2250g', 1.33 ],
  [ 'WPC Protein Econo', 34.99, '750g', 1.4 ],
  [ 'Protein 80', 109, '2250g', 1.45 ]
]
  ```