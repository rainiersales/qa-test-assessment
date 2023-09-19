import { Selectors } from '../fixtures/selectors';
import { CharacterData, PlanetData, paths } from '../fixtures/data';

describe('Feature: Character and Planet Search', () => {
  beforeEach(() => {
    cy.visit(paths.HOME);
  });

  it('Scenario: Given I navigate to the search page, when I search for a valid character, then the character details should be provided', () => {
    cy.searchForCharacter(CharacterData.VALID_CHARACTER_NAME);
    cy.assertCharacterSearchResults();
  });

  it('Scenario: Given I navigate to the search page, when I search for an invalid character, then "Not found" should be displayed', () => {
    cy.searchForCharacter(CharacterData.INVALID_CHARACTER_NAME);
    cy.assertNotFoundResult();
  });

  it('Scenario: Given I navigate to the search page, when I search for a valid planet, then the planet details should be provided', () => {
    cy.searchForPlanet(PlanetData.VALID_PLANET_NAME);
    cy.assertPlanetSearchResults();
  });

  it('Scenario: Given I navigate to the search page, when I search for an invalid planet, then "Not found" should be displayed', () => {
    cy.searchForPlanet(PlanetData.INVALID_PLANET_NAME);
    cy.assertNotFoundResult();
  });

  it('Scenario: Given I navigate to the search page, when I search for a character and clear the search, then the result list should be empty', () => {
    cy.searchForCharacter(CharacterData.VALID_CHARACTER_NAME);
    cy.assertCharacterSearchResults();

    // Clear the search form
    cy.get(Selectors.SEARCH_INPUT_FIELD).clear();

    // Trigger the search button again
    cy.get(Selectors.SEARCH_BUTTON).click();

    // Verify that the result list is empty
    cy.get(Selectors.CHARACTER_RESULT).should('not.exist');
  });

  it('Scenario: Given I navigate to the search page, when I search for a planet and clear the search, then the result list should be empty', () => {
    cy.searchForPlanet(PlanetData.VALID_PLANET_NAME);
    cy.assertPlanetSearchResults();

    // Clear the search form
    cy.get(Selectors.SEARCH_INPUT_FIELD).clear();

    // Trigger the search button again
    cy.get(Selectors.SEARCH_BUTTON).click();

    // Verify that the result list is empty
    cy.get(Selectors.PLANET_RESULT).should('not.exist');
  });

  it('Scenario: Given I navigate to the search page, when I search for a character, then the character details should be provided', () => {
    cy.searchForCharacter(CharacterData.VALID_CHARACTER_NAME);
    cy.assertCharacterSearchResults();
  });

  it('Scenario: Given I navigate to the search page, when I search for a character by pressing "Enter," then the character details should be provided', () => {
    // Type a valid character name in the search input field
    cy.get(Selectors.SEARCH_INPUT_FIELD).type(CharacterData.VALID_CHARACTER_NAME);

    // Trigger the search action by pressing "Enter" on the search field
    cy.get(Selectors.SEARCH_INPUT_FIELD).type('{enter}');

    cy.assertCharacterSearchResults();
  });

  it('Scenario: Given I navigate to the search page, when I search for a planet and switch to character search with no matching people, then "Not found" should be displayed', () => {
    cy.searchForPlanet(PlanetData.VALID_PLANET_NAME);
    cy.assertPlanetSearchResults();

    // Switch to character search
    cy.get(Selectors.CHARACTER_RADIO).click();

    // Type the same search term that has no matching people
    cy.get(Selectors.SEARCH_INPUT_FIELD).clear().type(PlanetData.VALID_PLANET_NAME);

    // Trigger the character search action
    cy.get(Selectors.SEARCH_BUTTON).click();

    cy.assertNotFoundResult();
  });

  it('Scenario: Given I navigate to the search page, when I search for a partial planet name, then multiple planet results should be displayed', () => {
    cy.searchForPlanet(PlanetData.PARTIAL_PLANET_NAME);
    cy.get(Selectors.PLANET_NAME_RESULT_LABEL).should('be.visible');

    // Switch to character search
    cy.get(Selectors.CHARACTER_RADIO).click();

    // Type a partial character name in the search input field
    cy.get(Selectors.SEARCH_INPUT_FIELD).clear().type(CharacterData.PARTIAL_CHARACTER_NAME);

    // Trigger the character search action
    cy.get(Selectors.SEARCH_BUTTON).click();

    cy.get(Selectors.CHARACTER_RESULT).should('be.visible');
  });
});
