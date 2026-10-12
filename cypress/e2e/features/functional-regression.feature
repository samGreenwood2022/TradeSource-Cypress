@functional
Feature: Functional regression
  As a user of TradeSource
  I want a manufacturer's overview page to show the correct details
  So that I can find and contact the manufacturer

  # Runs before every scenario: search for "vor" and open the Vortix overview page
  Background:
    Given I have opened the TradeSource home page
    When I search for "vor"
    And I open the Manufacturers tab
    And I select the first result
    Then the URL should include "/manufacturer/vortix/vtxA1B2C3D4E5F6G7H8/overview"

  # test 01 - Page title
  Scenario: The page has the correct title
    Then the page title should include "Vortix | Overview | TradeSource"

  # test 02 - H1 header
  Scenario: The h1 header shows the manufacturer name
    Then the h1 header should contain "Vortix"
    And the h1 header should be visible

  # test 03 - Header paragraph
  Scenario: The header paragraph shows the tagline
    Then the header paragraph should say "Commercial cleaning equipment, built for daily use"
    And the header paragraph should be visible

  # test 04 - Telephone link
  Scenario: The telephone link is correct
    Then the telephone link should be visible
    And the telephone link "href" attribute should include "tel:08001234567"
    And the telephone link "title" attribute should be "Call Vortix"

  # test 05 - Website link
  Scenario: The website link is correct
    Then the website link should be visible
    And the website link "href" attribute should include "https://www.vortix-commercial.example/overview"
    And the website link "title" attribute should be "Visit https://www.vortix-commercial.example/overview"
    And the website link "target" attribute should be "_blank"

  # test 06 - Login
  Scenario: A user can sign in
    When I sign in
    Then I should see the user avatar
