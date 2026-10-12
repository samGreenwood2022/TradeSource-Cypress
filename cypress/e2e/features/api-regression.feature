@api
Feature: Certifications API
  As a TradeSource user
  I want the Certifications tab to cope with different API responses
  So that the page behaves sensibly when the data changes or fails

  # The API response is replaced (stubbed) BEFORE the tab is opened, so it is ready when the request is sent
  Background:
    Given I have opened the TradeSource home page
    When I search for "vor"
    And I open the Manufacturers tab
    And I select the first result
    Then the URL should include "/manufacturer/vortix/vtxA1B2C3D4E5F6G7H8/overview"

  # test 09 - Rename the first certification
  Scenario: A certification can be renamed
    Given the API returns the first certification named "Stubbed Test Certification"
    When I open the Certifications tab
    Then the first certification should be named "Stubbed Test Certification"

  # test 10 - No certifications
  Scenario: The no results message shows when there are no certifications
    Given the API returns no certifications
    When I open the Certifications tab
    Then I should see the no results message "Sorry, no results were found"
    And no certification tiles should be shown

  # test 11 - Server error (the site shows nothing when the request fails, so this documents that gap)
  Scenario: Nothing is shown when the API returns a 500 error
    Given the API returns a 500 error
    When I open the Certifications tab
    Then no certifications or messages should be shown

  # test 12 - Dropped connection
  Scenario: Nothing is shown when the connection is dropped
    Given the API connection is dropped
    When I open the Certifications tab
    Then no certifications or messages should be shown

  # test 13 - Slow response
  Scenario: Certifications are shown after a slow response
    Given the API responds after 2 seconds
    When I open the Certifications tab
    Then I should see the loading message
    And the certification tiles should appear
