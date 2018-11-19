Feature: Navigate To GETSTATS
    
    @TypeScriptScenario
    Scenario: Navigate to the base url
        Given I have loaded GETSTATS 6.0
        Then the title should be "GETSTATS"
        Then the pagination should be "true"
        Then the table pages length should be 10
        And the table row length should be 1
        