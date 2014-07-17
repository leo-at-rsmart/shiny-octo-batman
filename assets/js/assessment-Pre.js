// Copyright 2012 Google Inc. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.


// When the assessment page loads, activity-generic.js will render the contents
// of the 'assessment' variable into the enclosing HTML webpage.

// For information on modifying this page, see
// https://code.google.com/p/course-builder/wiki/CreateAssessments.


var assessment = {
  // HTML to display at the start of the page
  preamble: 'This course is for skilled and experienced Java and web developers. Before we begin, it would be best for the instructors to assess the proficiency of attendees with course materials. This assessment will cover rudimentary knowledge of object-oriented programming techniques, web-development terms and phrases, as well as enterprise software development patterns. There are no right or wrong answers here. Answer honestly and to the best of your ability. If you do not know the answer, simply respond with "I don\'t know".',


  // An ordered list of questions, with each question's type implicitly determined by the fields it possesses:
  //   choices              - multiple choice question (with exactly one correct answer)
  //   correctAnswerString  - case-insensitive string match
  //   correctAnswerRegex   - freetext regular expression match
  //   correctAnswerNumeric - freetext numeric match
  questionsList: [
    {questionHTML: 'Spring is?',
     choices: ["Object Relational Mapping library", "Service Bus", correct("Inversion of Control container"), "Application Server", "I don't know"]
    },

    {questionHTML: 'AJAX stands for?',
     choices: [correct("Asynchronous Javascript and XML"), "Autonomous Javascript and XML", "Asynchronous Java and XML", "Applescript, Javascript, and XML", "I don't know"]
    },

    {questionHTML: 'Eclipse is used for?',
     choices: ["Version Control System", correct("Integrated Development Environment"), "Stress-relieving chewing gum", "Continuous Integration", "I don't know"]
    },

    {questionHTML: 'URL stands for?',
     choices: ["Universal Resource Locator", "Uniform ReSTful Locator", correct("Uniform Resource Locator"), "Universal Resource Identifier", "I don't know"]
    },
    {questionHTML: 'JPA is an O/RM',
     choices: ["True", correct("False"), "I don't know"]
    },
    {questionHTML: 'Which is NOT a web services methodology?',
     choices: ["SOAP", "XML-RPC", "JAX-RPC", "REST", correct("ZEND"), "I don't know"]
    },
    {questionHTML: 'Do you plan to run rice bundled?',
     choices: ["Yes", "No", "I don't know"]
    },
    {questionHTML: 'What is the difference between rice bundled and embedded?',
     multiLine: true,
     correctAnswerRegex: /.*/i
    },
    {questionHTML: 'JQuery can be used to submit a form without reloading a page?',
     choices: [correct("True"), "False", "I don't know"]
    },
    {questionHTML: 'JSON is?',
     choices: ["An O/RM", "MVC", "Javscript web framework", correct("Javascript notation for a map"), "A web services methodology", "I don't know"]
    },
    {questionHTML: 'Eclipse shortcut for searching resources in the project?',
     choices: ["Alt-Control/Command-Shift-R", correct("Control/Command-Shift-R"), "Alt-Control/Command-R", "Alt-Shift-R", "I don't know"]
    },
    {questionHTML: 'Eclipse shortcut for searching java classes in the project?',
     choices: [correct("Control/Command-Shift-T"), "Control/Command-Shift-R", "Alt-Control/Command-T", "Alt-Shift-T", "I don't know"]
    },
    {questionHTML: 'A foreign key is used for?',
     choices: [correct("Referencial integrity between two database tables."), "Web services security", "Unique identifier for users", "I don't know"]
    },
    {questionHTML: 'Define database table normalization?',
     multiLine: true,
     correctAnswerRegex: /.*/i
    },
    {questionHTML: 'Define database table denormailization?',
     multiLine: true,
     correctAnswerRegex: /.*/i
    },
    {questionHTML: 'A correct INSERT statement is?',
     choices: ["INSERT ACCOUNT(ID, NAME) VALUES(1, 'Mine')", correct("INSERT INTO ACCOUNT VALUES(1, 'Mine')"), "INSERT ACCOUNT VALUES(1, 'Mine')",  "I don't know"]
    },
    {questionHTML: 'POST is?',
     choices: ["Cereal distributor", "JSON directive", correct("HTTP form method"), "Javascript data structure", "I don't know"]
    }
  ],

  // The assessmentName key is deprecated in v1.3 of Course Builder, and no
  // longer used. The assessment name should be set in the unit.csv file or via
  // the course editor interface.
  assessmentName: 'Pre', // unique name submitted along with all of the answers

  checkAnswers: false    // render a "Check your Answers" button to allow students to check answers prior to submitting?
}
