@visual
Feature: Visual regression
  As a TradeSource tester
  I want each page to look the same as its saved baseline image
  So that unexpected visual changes are caught

  # Add a new page by adding a row to the table:
  #   page     - a readable name, shown in the report
  #   path     - the page address, relative to the base URL
  #   snapshot - the baseline image name (run "npm run bdd:baseline" to create a new one)
  Scenario Outline: <page> matches its visual baseline
    Given I open the page at "<path>"
    Then the page should match the "<snapshot>" visual snapshot

    Examples:
      | page                  | path                                                        | snapshot                      |
      | Vortix overview       | /manufacturer/vortix/vtxA1B2C3D4E5F6G7H8/overview           | vortix-overview-direct        |
      | Halden locks overview | /manufacturer/halden-locks-uk/hldtIYD2mz1WnVtvyGn/overview  | halden-locks-overview-direct  |
