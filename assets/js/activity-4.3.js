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

    'In the last exercise we looked at KIM largely from a functional and administrative perspective.  In this exercise we will get hands-on with the various APIs that KIM offers, writing some unit tests to exercise them.',
    'There are a few primary API classes that KIM provides.  These are:',
    '<ul><li>IdentityService</li>'
        + '<li>GroupService</li>'
        + '<li>PermissionService</li>'
        + '<li>RoleService</li>'
        + '<Li>ResponsibilityService</li></ul>',

    'The tests that you will be writing will work primarily with the first three services on this list.',
    
    '<h3>Checkout “exercise-kim-api” project</h3>',
    'To ensure a clean and consistent environment for everyone, we will check out a project from Subversion as a starting point.  This project will contain completed copies of all work from the previous exercises, as well as some starting points for this exercise.',
    
    'In order to get the copy of the project that you will need, please check out the exercise-kim-api project from the training Subversion repository.',
    
    'This exercise will require that you have all permissions and roles set up properly from the last exercise.  If you do not, please let the instructor know so that you can get your data in a consistent state required for the unit tests in this exercise to execute successfully.',
    
    '<h3>Test API Operations Related to Principals</h3>',

    'We have created a IdentityTest that you can use as a starting point.',
    
    '<ol><li>Open the train.kim.IdentityTest class found in the src/test/java directory.</li>'
        + '<li>Run this test class.  Recall that the way to run this test is to right-click on it in the “Package Explorer” view, and select “Run As -> JUnit Test”.</li>'
        + '<li>Since you haven’t made any changes yet, all tests should pass!</li>'
        + '<li>Look at the testPrincipals() method.  This is currently using the KIM API to get a reference to the Principal object for the admin principal.</li>'
        + '<lI>Follow the instructions in this file to add to the test.</li>'
        + '<li>When you are done, run the test again and verify that it passes.</li></ol>',

    '<h3>Test API Operations Related to Entities</h3>',
    '<ol><li>Open the train.kim.IdentityTest class<li>'
        + '<lI>Run this test class, all tests should pass.</li>'
        + '<li>Find the testEntities() method.</li>'
        + '<li>Note it’s current behavior and implement the test that it is asking for in comments.</li></ol>',
    'The KIM Entity data model allows for lots of different pieces of data to be associated with the entity.  In the set of Rice entities out of the box though, it doesn’t populate much of this data.  It generally has the names and email address available but not extra identity data such as phone numbers, addresses, etc.',
    'This has an effect on what kind of data you can work with in your tests.',
    
    '<h3>Test API Operations Related to Groups</h3>',
    'We haven’t done much with Groups so far in any of our exercises.  If you want to see which groups are available in the system, do the following:',
    '<ol><lI>Launch the web application.</li>'
        + '<li>Navigate to the “Administration” tab.</li>'
        + '<li>Click on the “Group” link.</li>'
        + '<li>This will bring up the Group Lookup screen, hit the “search” button and it will return all Groups in the database.</li>'
        + '<li>Click on any of the group names to see the full details of the group (including membership).</li></ol>',
    
    'Next, we’ll write some code that exercises the KIM Group APIs.',
    '<ol><li>Open the train.kim.GroupTest class.</li>'
        + '<li>There are four test methods in this class with empty method bodies:'
        + '<ol><li>testGetGroup</li>'
        + '<li>testGetGroupMemberPrincipalIds</li>'
        + '<li>testGetGroupIdsForPrincipal</li>'
        + '<li>testIsMemberOfGroup</li></ol></li>'
        + '<li>Follow the instructions located in comments inside of each of these in order to implement these tests.</li>',
        + '<li>Once you are done, run the unit test and verify that all tests pass.</li></ol>',
    
    '<h3>Test Authorization Checks against KIM Permissions</h3>',
    'The isAuthorized(…) method is offered by KIM for making permission checks.  In this part of the exercise, we will write some tests that test the various permissions we set up in the last exercise.',
    
    '<ol><li>Open the train.kim.PermissionTest class.</li>'
        + '<li>The first two tests are testing the “Assign Role” and “Grant Permission” permissions that we granted to the “KR-SYS : Technical Administrator” role during the last exercise.</li>'
        + '<li>Run this test class.  All tests should pass.  If they do not, that means that the permission and role data from the last exercise did not get set up correctly in your database.  Please go back and review that you did not miss anything.</li>'
        + '<li>Now, you should implement testIsAuthorized_InitiateDocument_BookOrder() yourself.  Please follow the instructions in the comments.  This test should test that “user1” is authorized to Initiate Book Order documents, which is the permission we configured at the end of our last exercise.</li></ol>',

    '<h3>On Your Own</h3>',
    'KIM provides many other operations on its services that you will want to familiarize yourself with.  If you have additional time, you can write additional tests that touch pieces of the KIM API that we haven’t worked with yet.',
    'The javadocs for the five services listed above are a good place to start to learn about the other operations that are available.',

];


// Note that the following code (that is not part of the definition of the
// 'activity' variable) needs to be surrounded with the commented tags
// '// <gcb-no-verify>' and '// </gcb-no-verify>', so that the verifier script
// in tools/verify.py does not treat the code as invalid. For more details,
// please see https://code.google.com/p/course-builder/wiki/VerifyCode


//<gcb-no-verify>

// JavaScript support code for displaying text into the proper output textarea:
function check42(id, intext) {
  switch (id) {
    case 1:
    document.quiz.output1.value = intext;
    break;

    case 2:
    document.quiz.output2.value = intext;
    break;

    case 3:
    document.quiz.output3.value = intext;
    break;
  }
}

//</gcb-no-verify>
