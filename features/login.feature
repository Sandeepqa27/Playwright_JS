Feature:login feature

@regression
  Scenario: Successful login with valid credentials
    Given the user is on the login page of saucedemo
    When the user enters valid credentials of saucedemo
    Then the user should be redirected to the dashboard of saucedemo

@smoke
  Scenario: Successful login with valid credentials
    Given the user is on the login page of saucedemo
    When the user enters valid credentials of saucedemo
    Then the user should be redirected to the dashboard of saucedemo



