# QA Engineer Assessment Solution
##### Name: Rainier Sales, Austria | +43 676 5215 593
## **1. Introduction**
This test framework is enhanced as a part of QA assessment using Cypress, JavaScript & TypeScript. 

## **2. Getting Started**
### **Pre-requisites**
    node - v19.6.0 (minimum requirement - v12+)
    Cypress - v13.2.0

### **Dependency Installation**
#### The test dependencies are installed using the commands below
    npm install
  
### Running the Tests
#### Run with cypress interface
    npm run cy:open
#### Run without cypress interface
    npm run cy:run
    
## **3.Features tested**

### Search for character (person)
* ***PASSED*** - When you search for a character and it’s a valid one, then you should be able to see his / her “Gender”, “Birth year”, “Eye color” and “Skin color”.
* ***PASSED*** - When you search for a character and it’s not a valid one, then you should be able to see “Not found” in the results. ()

### Search for planet
* ***PASSED*** - When you search for a planet and it’s a valid one, then you should be able to see its “Population”, “Climate” and “Gravity”.
* ***PASSED*** - When you search for a planet and it’s not a valid one, then you should be able to see “Not found” in the results.

### Additional flows
* ***FAILED***	When you search for either a character or a planet and you get one or more results for it, clear the “Search form” and hit the Search button again, you should then get an empty result list (previous search results are removed).
* ***PASSED***	You can search for results by clicking the “Search” button or by pressing “enter” on the search field.
* ***PASSED***	When for example you have searched for a full planet name and you’ve got results, if you switch to People and search for the same thing (that has no matching people based on a partial name), you should get a “Not found” in the results.
* ***PASSED***	You can have more than one results, for both Planets and Names (partial matching)

