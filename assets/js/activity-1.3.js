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
    '<h2>Maven</h2><h3>Downloading</h3>Visit the <a href="http://maven.apache.org">Maven project site</a>.',

    'Locate the download link to get Maven. Choose to download the apache-maven-3.2.1.zip file.',

    '<h3>Installing</h3>It is just a zip file, so you install by uncompressing it in your desired location. For Windows users, I recommend installing in C:\Program Files\Java.',

    '<h3>Setup Environment Variables</h3>You will need to add the location you installed Maven into a new M2_HOME environment variable.',

    'You will also need to add the bin directory to your PATH environment variable.',

];

