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

    '<h2>Adding KIM Permissions to your Application</h2>This exercise will not involve any coding and will consist primarily of setup via the Kuali Identity Management user interface screens.',

    '<h3>Checkout “exercise-security” project</h3>',
    'To ensure a clean and consistent environment for everyone, we will check out a project from Subversion as a starting point.  This will essentially be a completed copy of the previous exercises.',
    '<p>In order to get the copy of the project that you will need, please check out the <b>exercise-security</b> project from the training Subversion repository.</p>',

    '<h3>Inspect the Current Permissions</h3>',

    '<p>For this part of the exercise, we will use the “Routing and Identity Management Document Type Hierarchy” screen to investigate the current permissions associated with the <b>BookOrderDocumentType.</b>',

    '<ul><ol><li>Launch the web application and navigate to the main menu.</li>'
        + '<li>Click on the <b>Routing and Identity Management Document Type Hierarchy</b> link under the “Workflow” section.</li>'
        + '<li>Click the “show” button next to <b>KualiDocument</b></li>'
        + '<li>Navigate to the bottom of the list, you should see your <b>Book Order</b> document type.</li>'
        + '<li>Click on the “View Document Configuration” link.</li>'
        + '<li>Notice the <b>Permissions</b> section here.  Document types are arranged in a hierarchy, and when we created <b>BookOrderDocumentType</b> we had it extend from <b>RiceDocument.</b>  On this screen, you can see which permissions we are inheriting from <b>RiceDocument</b> and from its parent <b>KualiDocument</b></li><ol>',

    '<h3>Create a Namespace for our Roles and Permissions</h3>',
    'Since KIM consists of a set of shared services that can be used to implement authorization across multiple applications, roles and permissions are both required to have a Namespace associated with them.  We will create one using the following steps:',
    '<ol><li>Click on the “Administration” tab in the portal.</li>'
        + '<li>Click on the “Namespace” link under the “Configuration” section</li>'
        + '<li>Click the “create new” button.  Fill out the Namespace document as follows:'
        + '<ol><li>Fill in the description with the text of your choosing.</li>'
        + '<li>Type “TRNAPP” into “Namespace Code”</li>'
        + '<li>Type “Training Application” into “Namespace Name”</li>'
        + '<li>Leave the “Application ID” blank.</li>'
        + '<li>Make sure the “Active Indicator” is checked.</li>'
        + '<li>Click the submit button.</li></ol></li>'
        + '<li>To verify that the Namespace was successfully created, click on the “Administration” tab.</li>'
        + '<li>Click on the “Namespace” link again and click “search” on the resulting screen.</li>'
        + '<li>You should see your new Namespace in the list.</li></ol>',

    '<h3>Override the “Initiate Document” Permission</h3>',
    'We can override the <b>Initiate Document</b> permission we are inheriting from RiceDocument by defining an “Initiate Document” permission that is associated with our BookOrderDocumentType.  To do this, follow these steps:',
    '<ol><li>Click on the <b>Administration</b> tab in the portal.</li>'
        + '<li>Click on the <b>Permission</b> link.  Click “create new” on the resulting screen.</li>'
        + '<li>Fill out the resulting Permission document screen as follows:'
        + '<ol><li>Enter text of your choosing for the “Description”</li>'
        + '<li>Next to <b>Template Id</b> click the lookup like and search by a template name of “Initiate Document”.  You should only see one result, return this back to the original form by using the “return value” link.</li>'
        + '<li>Under “Permission Namespace” select your new namespace “Training Application”</li>'
        + '<li>Type “Initiate Book Order Document” into the “Permission Name” field.</li>'
        + '<li>Enter a description of your choosing into the “Permission Description” field.</li>'
        + '<li>In the “Permission Details” text area, type “documentTypeName=BookOrderDocumentType”.  Be very careful to spell this correctly!</li></ol></li>'
        + '<li>Prior to submitting it, your document should look similar to the following:</li>'
        + '<li>Once you have the Permission document filled out, click the “submit” button.</li>'
        + '<li>To verify that the Permission was successfully created, navigate back to the "Administration” tab and do the following:<ol>'
        + '<li>Click on the “Permission” link</li>'
        + '<li>Select “Training Application” for the Permission Namespace and click “search”</li>'
        + '<li>Only one permission should be returned, and it should be the one you just created</li></ol></li></ol>',
    
    '<h3>Create a Permission to Allow for us to Assign Roles</h3>',
    'Kuali Rice out of the box has granted “Assign Role” permissions based on the following namespaces:',
    '<ul><li>KUALI</li>'
        + '<li>KR*</li>',
    '<p>Notice that our new “TRNAPP” namespace is not covered by either of those.  That means that if we try to create a Role within that namespace right now, we won’t be allowed to assign anyone to the Role.</p>',
    '<p>We will copy one of these Permissions to allow for us to perform the next step of our exercise which involves creating the “Inventory Manager” role.</p>',
    'To do this, follow these steps:',
    '<ol><li>Click on the “Administration” tab.</li>'
        + '<li>Click on the “Permission” link.</li>'
        + '<li>Enter “Assign Role” into the “Permission Name” field and execute a search.</li>'
        + '<li>There should be two permissions returned, click “copy” on either of these.</li>'
        + '<li>Fill out the resulting Permission document as follows:'
        + '<ol><li>Enter text of your choosing for the “Description”</li>'
        + '<li>Change the “Permission Name” to “Assign Role TRNAPP Namespace”</li>'
        + '<li>Modify the last word in the “Permission Description” where it mentions the namespace code and change it to “TRNAPP”.</li>'
        + '<li>In the “Permission Details” section, change the text there to read: “namespaceCode=TRNAPP”</li></ol></li>'
        + '<li>Click the “submit” button and the permission should now be created.  Next we need to assign it to a Role.</li>'
        + '<li>Navigate back to the “Administration” tab and click on the “Role” link.</li>'
        + '<li>On the Role Lookup screen, enter “Technical Administrator” in the “Role Name” field and execute a search</li>'
        + '<li>You should see the “KR-SYS : Technical Administrator” role in the result set, click “edit”.</li>'
        + '<li>We will add our new Permission to this Role as follows:'
        + '<ol><li>Enter text of your choosing for the “Description”</li>'
        + '<li>Click on the lookup icon next to “Add Permission ID”</li>'
        + '<li>On the resulting Permission Lookup, type “Assign Role” into “Template Name” and execute a search</li>'
        + '<li>Find our new permission with “Permission Detail Values” that include “TRNAPP”</li>'
        + '<li>Click the “return value” link next to this row</li>'
        + '<li>Once back on the Role document, click the “add” button under the permission id.  Make sure that it successfully added the new permission to the bottom of the list of permissions on the role before proceeding.</li>'
        + '<li>Scroll to the bottom of this screen and click the “submit” button</li></ol></li>'
        + '<li>To verify this worked, navigate back to the “Permission Lookup”, type “Assign Role” into the “Template Name” field and execute a search.</li>'
        + '<li>In the result set, you should see that our new “Assign Role” permission is now assigned to the “KR-SYS : Technical Administrator” role.</li>'
        + 'At this point, members of the “KR-SYS : Technical Administrator” role (including the “admin” user) should be able to create our new “Inventory Manager” role.</li>',
    
    '<h3>Create a Permission to Allow for us to Grant Permissions</h3>',
    'As with Roles, Kuali Rice out of the box has “Grant Permission” permissions already created based on the following namespaces:',
    '<ul><li>KUALI</li>'
        + '<li>KR*</li></ul>',
    '<p>We need to create a “Grant Permission” permission for the “TRNAPP” namespace so that we can perform the next step of the exercise.</p>',

    '<p>The steps to do this will be very similar to the previous part of this exercise titled “Create a Permission to Allow for us to Assign Roles”.  Follow these steps exactly (steps 1 through 13), but substitute “Assign Role” with “Grant Permission” (remember to use “Grant Permission TRNAPP Namespace” for the permission name).</p>',
    
    '<p>At the end of these steps, when you search on the “Permission Lookup” with a “Template Name” of “Grant Permission” you should see the following:</p>',
    '<ol><li>Create the Inventory Manager Role</li>'
        + '<li>In this part of the exercise, we will create a Role for Inventory Managers, assign it to the permission we created, and then add the principal named “user1” to it.  To do this, do the following:</li>'
        + '<li>Click on the “Administration” tab.</li>'
        + '<li>Click on the “Role” link.</li>'
        + '<li>On the resulting screen, click the “create new” button.</li>'
        + '<li>The first step is to select the “Role Type” to use.  The Default role type should be fine for this role.  </li>'
        + '<li>Click the “search” button.</li>'
        + '<li>Find the Role Type with Type Name of “Default” and click the “return value” link at the beginning of that row.</li>'
        + '<li>This will bring up the Role document.  To fill this document out, do the following:'
        + '<ol><li>Enter text of your choosing for the “Description”</li>'
        + '<li>Select “Training Application” for the “Namespace”</li>'
        + '<li>If the “Assignees” section disappears when you select this namespace, it means that something did not get set up correctly from the “Create a Permission to Allow for us to Assign Roles” section of this exercise.  If that’s the case please go back and review that you followed those steps correctly.</li>'
        + '<li>Enter “Inventory Manager” for the “Role Name”</li>'
        + '<li>Under “Permissions” use the lookup icon to find the “Initiate Document” Permission we created earlier (search by permission namespace of “Training Application”) and return it back to the Role document using the “return value” link.</li>'
        + '<li>After returning back to the Role document, click the “add” button underneath the permission id.</li>'
        + '<li>If you get a message that you are not authorized to add the permission, then it means that something did not get set up correctly from the “Create a Permission to Allow for us to Grant Permissions” section of this exercise. If that’s the case please go back and review that you followed those steps correctly.</li>'
        + '<li>Under assignees section, type “user1” into the “Member Identifier” field and click the “add” button at the end of the row.</li>'
        + '<li>Click the “submit” button at the bottom of the Role document.</li></ol></li>'
        + '<li>At this point our “Inventory Manager” role should be created and have been granted the permission to Initiate Book Orders.</li>'
        + '<li>To verify this is set up correctly, navigate back to the “Routing and Identity Management Document Type Hierarchy” page and click on “View Document Configuration” next to the BookOrderDocumentType. </li></ol>',

    '<p>Notice the new “Initiate Document” permission on the BookOrderDocumentType.  Also notice how the “Initiate Document” permission from the parent RiceDocument has a gray line through it to denote that it has been overridden.</p>',

    '<h3>Test the Permission</h3>',
    '<p>In this part of the exercise, we will test the permission by verifying that only user1 can initiate Book Order documents.  To test this, do the following:</p>',
    '<ol><li>Navigate back to the portal Main Menu.</li>'
        + '<li>Click on the “Book Order” link</li>'
        + '<li>You should immediately see a message which says user admin is not authorized to initiate document BookOrderDocumentType”</li>'
        + '<li>Use the backdoor login field in the top right-hand corner of the screen to log in as user1 by typing “user1” into the field and clicking the “login” button.</li>'
        + '<li>Now navigate back to the “Book Order” link.  When you click on it this time it should open the screen to create a new Book Order successfully.</li>'
        + '<li>Congratulations!  You now know how to create Roles and Permissions using Kuali Identity Management.</li></oL>'
    
];
