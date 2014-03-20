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


// Usage instructions: Create a single array variable named 'activity'. This
// represents explanatory text and one or more questions to present to the
// student. Each element in the array should itself be either
//
// -- a string containing a set of complete HTML elements. That is, if the
//    string contains an open HTML tag (such as <form>), it must also have the
//    corresponding close tag (such as </form>). You put the actual question
//    text in a string.
//
// -- a JavaScript object representing the answer information for a question.
//    That is, the object contains properties such as the type of question, a
//    regular expression indicating the correct answer, a string to show in
//    case of either correct or incorrect answers or to show when the student
//    asks for help. For more information on how to specify the object, please
//    see http://code.google.com/p/course-builder/wiki/CreateActivities.

var activity = [
    '<h2>Introduction to Maintenance Documents</h2',
    
    '<script async class="speakerdeck-embed" data-id="2b4037308fde0131ed3a7a557317c4b7" data-ratio="1.33333333333333" src="//speakerdeck.com/assets/embed.js"></script>',

    '<h2>Exercise: Maintenance Documents</h2>',

    '<script async class="speakerdeck-embed" data-id="2b9ed7c0919401319fc0623dfa5ee5e7" data-ratio="1.33333333333333" src="//speakerdeck.com/assets/embed.js"></script>',

];


// Note that the following code (that is not part of the definition of the
// 'activity' variable) needs to be surrounded with the commented tags
// '// <gcb-no-verify>' and '// </gcb-no-verify>', so that the verifier script
// in tools/verify.py does not treat the code as invalid. For more details,
// please see https://code.google.com/p/course-builder/wiki/VerifyCode


//<gcb-no-verify>

// JavaScript code to check which area of the image the user clicked on
// and display the appropriate message in the output textarea:
function check24(incoming) {
  if (incoming == 1) {
    document.quiz.output.value = 'You have clicked on the web page title, which is always the first line of text in a result.';
  } else if (incoming == 2) {
    document.quiz.output.value = 'You have clicked on the web address, which is always the green text in a result block.';
  } else {
    document.quiz.output.value = 'You have found the snippet, which is the black text that shows where your search terms appear on the page.';
  }
}

//</gcb-no-verify>
