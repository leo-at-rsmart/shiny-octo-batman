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
  preamble: 'Liquibase is not vor everyone. In order to make sure this course is right for you, we want you to take this short assessment that evaluates the appropriateness of this course. This assessment is not intended to judge or grade you professionally. Its purpose is for us to determine what kind of people are taking this course and what you are taking away from the course. Please be honest with your answers. That means answer to the best of your knowledge. Any kind of research from this point forward is going to produce unrealistic results and will influence our understanding of the results.',

 
  // An ordered list of questions, with each question's type implicitly determined by the fields it possesses:
  //   choices              - multiple choice question (with exactly one correct answer)
  //   correctAnswerString  - case-insensitive string match
  //   correctAnswerRegex   - freetext regular expression match
  //   correctAnswerNumeric - freetext numeric match
  questionsList: [
    {questionHTML: 'Which comes before the others in the Maven Build Lifecycle?',
     choices: ["integration-test", "process-resources", correct("initialize"), "compile", "I don't know"]
    },

    {questionHTML: 'The <plugins /> section in a Maven POM is inherited by child projects and modules.',
     choices: [correct("False"), "True", "I don't know"]
    },

    {questionHTML: 'The only way to inherit dependencies from another project is to make that project a dependency of your own not make it a parent.',
     choices: [ "False", correct("True"), "I don't know"]
    },

    {questionHTML: 'MAVEN_OPTS is ... ',
     choices: [ "A section in the Maven POM", "A Maven plugin", correct("An environment variable for setting java options or maven options like -Xmx1g and -XX:MaxPermSize"), "An easter egg used to unlock gamma radiation and a black hole.", "The maven users mailing list.", "A Maven users convention held in Las Vegas.", "I don't know"]
    },

    {questionHTML: 'The SYS_GUID() function is native to what platform?',
     correctAnswerRegex: '/[oO]racle/'
    },

    {questionHTML: 'All database platforms support sequences',
     choices: [ correct("False"), "True", "I don't know"]
    },

    {questionHTML: "The following is valid Oracle SQL: <pre>CREATE TABLE IF NOT EXISTS TEM_AIRFARE_SRC_T\n"
     + "  (\n"
     + "     CODE     VARCHAR(10) NOT NULL,\n"
     + "     NAME     VARCHAR(40) NOT NULL,\n"
     + "     ACTV_IND VARCHAR(1) NOT NULL,\n"
     + "     VER_NBR  DECIMAL(8, 0) DEFAULT 1 NOT NULL,\n"
     + "     OBJ_ID   VARCHAR(36) NOT NULL,\n"
     + "     CONSTRAINT TEM_AIRFARE_SRC_T_TC0 UNIQUE (OBJ_ID),\n"
     + "     CONSTRAINT TEM_AIRFARE_SRC_T_TP1 PRIMARY KEY(CODE)\n"
     + "  );</pre>",
     choices: [ correct("False"), "True", "I don't know"]
    },

    {questionHTML: "The following is how to the Kuali Foundation patterns a sequence workaround in MySQL: <pre>CREATE TABLE IF NOT EXISTS TEM_AGENCY_SRVC_FEE_ID_SEQ \n"
     + "	(\n"
     + "		ID bigint(19) NOT NULL AUTO_INCREMENT, \n"
     + "		PRIMARY KEY(ID) \n"
     + "	);</pre>",
     choices: [ "False", correct("True"), "I don't know"]
    },

    {questionHTML: "Eclipse is ... \n",
     choices: [ "Gum", "Either solar or lunar", correct("A commonly used IDE."), "Another episode of the Twilight Saga", "I don't know"]
    },

    {questionHTML: "RENAME TABLE is better than dropping and creating because ... \n",
     choices: [ correct("It retains existing data."), "It's not better.", "I said so.", "Fewer lines of code.", "Fewer actions", "Fewer changes.", "I don't know"]
    }
  ],

  assessmentName: 'precourse', // unique name submitted along with all of the answers
  checkAnswers: false          // render a "Check your Answers" button to allow students to check answers prior to submitting?
}

