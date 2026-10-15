@accessibility
Feature: Accessibility
  As a TradeSource tester
  I want each page scanned for accessibility problems
  So that violations are listed in the report

  # Violations are reported, not enforced: the scan never fails the scenario
  # Add a new page by adding a row to the table:
  #   page - a readable name, shown in the report
  #   path - the page address, relative to the base URL
  Scenario Outline: <page> is checked for accessibility violations
    Given I open the page at "<path>"
    Then the page should be scanned for accessibility violations

    Examples:
      | page                   | path                                                        |
      | Vortix overview        | /manufacturer/vortix/vtxA1B2C3D4E5F6G7H8/overview           |
      | Halden locks overview  | /manufacturer/halden-locks-uk/hldtIYD2mz1WnVtvyGn/overview  |
