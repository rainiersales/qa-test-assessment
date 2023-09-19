/// <reference types="cypress" />

// Import necessary types
import {
    Chainable,
    TypeOptions,
    CommandOptions,
  } from 'cypress';
  
  // Extend Cypress Chainable interface with your custom commands
  declare global {
    namespace Cypress {
      interface Chainable {
        searchForCharacter(characterName: string): Chainable<void>;
        searchForPlanet(planetName: string): Chainable<void>;
        assertCharacterSearchResults(): Chainable<void>;
        assertPlanetSearchResults(): Chainable<void>;
        assertNotFoundResult(): Chainable<void>;
      }
    }
  }
  
  // Extend Cypress.Commands interface to add types for custom commands
  declare namespace Cypress {
    interface Commands {
      searchForCharacter(
        characterName: string,
        options?: Partial<TypeOptions>,
        commandOptions?: Partial<CommandOptions>
      ): Chainable<void>;
  
      searchForPlanet(
        planetName: string,
        options?: Partial<TypeOptions>,
        commandOptions?: Partial<CommandOptions>
      ): Chainable<void>;
  
      assertCharacterSearchResults(
        options?: Partial<TypeOptions>,
        commandOptions?: Partial<CommandOptions>
      ): Chainable<void>;
  
      assertPlanetSearchResults(
        options?: Partial<TypeOptions>,
        commandOptions?: Partial<CommandOptions>
      ): Chainable<void>;
  
      assertNotFoundResult(
        options?: Partial<TypeOptions>,
        commandOptions?: Partial<CommandOptions>
      ): Chainable<void>;
    }
  }
  
  // Use CommandContext to add types for custom commands
  declare global {
    namespace Cypress {
      interface CommandContext {
        searchForCharacter(characterName: string): void;
        searchForPlanet(planetName: string): void;
        assertCharacterSearchResults(): void;
        assertPlanetSearchResults(): void;
        assertNotFoundResult(): void;
      }
    }
  }

// commands.ts
import { Selectors } from '../fixtures/selectors';
import { CharacterExpectedResults, PlanetExpectedResults, paths } from '../fixtures/data';

// Function to search for a character by name
Cypress.Commands.add('searchForCharacter', (characterName) => {
    cy.visit(paths.HOME);
    cy.get(Selectors.SEARCH_INPUT_FIELD).type(characterName);
    cy.get(Selectors.SEARCH_BUTTON).click();
  });
  
  // Function to search for a planet by name
  Cypress.Commands.add('searchForPlanet', (planetName) => {
    cy.visit(paths.HOME);
    cy.get(Selectors.PLANET_RADIO).click();
    cy.get(Selectors.SEARCH_INPUT_FIELD).type(planetName);
    cy.get(Selectors.SEARCH_BUTTON).click();
  });
  
  // Function to assert character search results
  Cypress.Commands.add('assertCharacterSearchResults', () => {
    cy.get(Selectors.CHARACTER_RESULT).should('be.visible');
    cy.get(Selectors.GENDER_RESULT_LABEL).should('contain', CharacterExpectedResults.MALE);
    cy.get(Selectors.BIRTH_YEAR_RESULT_LABEL).should('contain', CharacterExpectedResults.BIRTH_YEAR);
    cy.get(Selectors.EYE_COLOR_RESULT_LABEL).should('contain', CharacterExpectedResults.EYE_COLOR);
    cy.get(Selectors.SKIN_COLOR_RESULT_LABEL).should('contain', CharacterExpectedResults.SKIN_COLOR);
  });
  
  // Function to assert planet search results
  Cypress.Commands.add('assertPlanetSearchResults', () => {
    cy.get(Selectors.PLANET_NAME_RESULT_LABEL).should('be.visible');
    cy.get(Selectors.PLANET_NAME_RESULT_LABEL).should('contain', PlanetExpectedResults.NAME);
    cy.get(Selectors.PLANET_POPULATION_RESULT_LABEL).should('be.visible');
    cy.get(Selectors.PLANET_POPULATION_RESULT_LABEL).should('contain', PlanetExpectedResults.POPULATION);
    cy.get(Selectors.PLANET_CLIMATE_RESULT_LABEL).should('be.visible');
    cy.get(Selectors.PLANET_CLIMATE_RESULT_LABEL).should('contain', PlanetExpectedResults.CLIMATE);
    cy.get(Selectors.PLANET_GRAVITY_RESULT_LABEL).should('be.visible');
    cy.get(Selectors.PLANET_GRAVITY_RESULT_LABEL).should('contain', PlanetExpectedResults.GRAVITY);
  });
  
  // Function to assert "Not found" result
  Cypress.Commands.add('assertNotFoundResult', () => {
    cy.get(Selectors.NOT_FOUND_RESULT_LABEL).should('be.visible');
    cy.get(Selectors.NOT_FOUND_RESULT_LABEL).should('contain', CharacterExpectedResults.NOT_FOUND);
  });
  