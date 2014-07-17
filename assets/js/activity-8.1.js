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
    '<h2>Document Types and the KEW APIs</h2>',

    'During this exercise we will take you through the setup and testing of numerous different Kuali Enterprise Workflow document type definitions.  A lot of these will already be written for you, so you will be learning largely by example.  At the end of the exercise, if you have additional time feel free to try experimenting with the document type definitions we worked with during this exercise.',

    '<h3>Checkout “exercise-kew-api” project</h3>',
    'To ensure a clean and consistent environment for everyone, we will check out a project from Subversion as a starting point.  This project will contain completed copies of all work from the previous exercises, as well as some starting points for this exercise.',

    'In order to get the copy of the project that you will need, please check out the exercise-kew-api project from the training Subversion repository.',

    '<h3>The Test Harness</h3>',
    
    'For this exercise we will be using unit tests as the means by which to demonstrate usage of the Workflow API and to test our various Document Type definitions.',

    'This test harness is the same as the one we’ve used in past exercises with the exception that it puts the workflow engine into “synchronous” processing mode.  Without this, the workflow engine performs all routing as background processes (this is for performance reasons).  This is not convenient when performing unit tests because it requires the use of Thread.sleep() to wait for background processes to complete.  The use of “synchronous” mode works around this quite nicely.  Note, however, that synchronous mode is not recommended for production application usage (for various reasons)!',

    '<h3>Simple Document Type with Ad-Hoc Routing</h3>',
    
    'One of the simplest cases of a Workflow document type that can be created is one with a single Route Node that is used in conjunction with ad hoc requests sent via the Workflow API.',

    'To set up this kind of Document Type, follow these steps:',

    '<ol><li>Open the file named example-01.xml in the workflow directory.</li>'
        + '<li>Examine the Document Type definition contained therein.  Notice that it defines a single node named “AdHoc”.</li>'
        + '<li>It also has an activation type of P for “parallel” which means that multiple requests created at that node will be allowed to be activated (and sent to Action Lists) in parallel.</li>'
        + '<li>Launch the web application and navigate to the “XML Ingester”.</li>'
        + '<li>Ingest example-01.xml</li>'
        + '<li>Now we will look at the unit tests that were created to test this document type.</li>'
        + '<li>Open the train.kew.Example01Test in the src/test/java directory.</li>'
        + '<li>There are two tests contained within this test class:'
        + '<ul><li>testAdHocExample_AdHocToPrincipal() tests sending and approving adhoc requests to a principal</li>'
        + '<li>testAdHocExample_AdHocToGroup() tests sending and approving adhoc requests to a group</li></ol></li>'
        + '<li>Execute these tests, they should both pass.</li>'
        + '<li>Take some time to examine the implementation of these test methods.  Notice their usage of the WorkflowDocument API, which is the main API class in Kuali Enterprise Workflow.</li></ol>',
    
    '<h3>Routing Rules using Simple Rule Templates</h3>',
    
    'In this example, we will create a Document Type that has nodes that use Routing Rules.  When Routing Rules are created they are associated with a “Rule Template” and a “Document Type”.  The Rule Template can define “Rule Attributes” which can implement logic that handles how rules are evaluated.',

    'We are going to use a simple case of a RuleTemplate with no attributes to demonstrate routing to a simple rule.',

    'Note that there is a GUI that can be used to create and maintain Routing Rules.  However, for the sake of expediency in our hands-on exercises, we will configure them via XML along with the Document Type.',

    'Follow these steps to set this up and test it:',
    '<ol><li>Open the file named example-02.xml in the workflow directory.</li>'
        + '<li>Notice how this file defines a SimpleRuleTemplate as well as a node on the document type, which uses this rule template.</li>'
        + '<li>There is also a Rule defined in the XML which essentially says: “If document type is SimpleRuleExample and rule template is SimpleRuleTemplate, then send an Approve request to user1”.</li>'
        + '<li>Also notice on the rule that forceAction is set to “false”.  This means that when this rule fires, if user1 has already taken action on the document (including submitting it into routing) this approval request will essentially be “auto-approved” so that user1 is not forced to take action again.  We will verify this in our unit test.</li>'
        + '<li>Launch the web application and navigate to the “XML Ingester”.</li>'
        + '<li>Ingest example-02.xml</li>'
        + '<li>Next, open train.kew.Example02Test.</li>'
        + '<li>Notice the two tests in this class:'
        + '<ul><li>testSimpleRule_WithApproval() routes the document as the “admin” user and then verifies that “user1” gets the approval request</li>'
        + '<li>testSimpleRule_BypassApproval() routes the document as the “user1” user and verifies that the approval request generated by the rule is bypassed because forceAction is set to false</li></ul></li>'
    
        + '<li>Executes these tests, they should both pass.</li></ol>',
    
    '<h3>Parallel Branching using Split Nodes</h3>',

    'KEW supports to ability to create parallel branches of execution in a workflow process using the concept of “Split” and “Join” nodes.', 
    'The default implementation of a Split node will split the path across all of the branches simultaneously (as opposed to following only one branch).  This is what we will configure for this part of the exercise.', 
    'Follow these steps:',
    '<ol><li>Open the file named example-03.xml in the workflow directory.</li>'
        + '<li>Notice the split node definition in this file.  We have associated a different Rule Template with each of these branches.</li>'
        + '<li>There is a Rule for each template, on Branch1 an approval request will get generated to user1.</li>'
        + '<li>On Branch2 an approval request will get generated to user2.</li>'
        + '<li>Launch the web application and navigate to the “XML Ingester”.</li>'
        + '<li>Ingest example-03.xml</li>'
        + '<li>Open train.kew.Example03Test</li>'
        + '<li>This test case only contains a single test.  It does the following:'
        + '<ol><li>Creates a routes an instance of our SplitExample document type</li>'
        + '<li>Verifies that the document has 2 active nodes after routing it.  This verifies that the route path split successfully.</li>'
        + '<li>Verifies that both user1 and user2 have outstanding approvals.</li>'
        + '<li>Approves as user2 and verifies that user1 still has their outstanding approval request.  Also verifies that the document has transitioned to the SimpleJoin node from Branch2</li>'
        + '<li>Approves as user1 and verifies that the document has gone FINAL</li></ol></li>'
        + '<li>Execute this test, it should pass.</li></ol>',
    
    '<h3>Using Conditional Split Nodes</h3>',

    'In some cases, instead of following all branches after a split, you may want to only follow one.  In these cases you can implement a custom org.kuali.rice.kew.engine.node.SplitNode which can be used to evaluate which branches should be executed during a split operation.',
    
    'In the example for this exercise, we will attach some XML content to our workflow document and use that to make a determination on which branch to follow.  Follow the steps to execute this example:', 
    
    '<ol><li>Open the file named example-04.xml in the workflow directory.</li>'
        + '<li>This is mostly a copy of the document type from example 3, however notice that a custom type has been defined for the Split node.</li>'
        + '<li>This custom type points to train.kew.ConditionalSplit, open that file.</li>'
        + '<li>This is a split node which looks for XML on the document in a form like the following:<br/>'
        + '<pre>&lt;branchNumber&gt;1&lt;/branchNumber&gt;</pre></li>'
    
        + '<li>It then constructs a branch name based on that number and passes that back to the workflow engine via a SplitResult.</li>'
        + '<li>We will test this out now, launch the web application and navigate to the “XML Ingester”.</li>'
        + '<li>Ingest example-04.xml</li>'
        + '<li>Open train.kew.Example04Test</li>'
        + '<li>This test case contains two test cases, one which submits <code>&lt;branchNumber&gt;1&lt;/branchNumber&gt;</code> and the other which submits branch number 2 in the document XML.</li>'
        + '<li>Run these tests, they should both pass.</li></ol>',

    '<h3>Using a PostProcessor</h3>',
    'A PostProcessor is used to receive event notification from the workflow engine.  The most commonly used of these are:',
    '<ul><li>Notification when a route node transition has occurred.</li>'
        + '<li>Notification when a document status change has occurred.</li></ul>',
    'For this example we’ll use a simple post processor that can track when it gets called and which we can utilize to build a unit test.  To do this, follow these steps:',
    '<ol><li>Open the file named example-05.xml in the workflow directory.</li>'
        + '<li>This is modeled after our first very simple document type, but a postProcessorName has been added.</li>'
        + '<li>This defines the class name of the post processor to use.  The post processor must implement the org.kuali.rice.kew.framework.postprocessor.PostProcessor interface.</li>'

        + '<li>The example document type has already specified one for you called train.kew.TrackingPostProcessor</li>'
    
        + '<li>This post processor has already been implemented, open it up and examine its implementation.</li>'
        + '<li>It provides two static lists that track both route node (also known as “route level”) changes and status changes.  You should be able to query these from your test to verify that the post processor was invoked.</li>'
    
        + '<li>First you will need to launch the web application and navigate to the “XML Ingester”.</li>'
        + '<li>Ingest example-05.xml</li>'
        + '<li>Open train.kew.Example05Test</li>'
        + '<li>Follow the instructions inside of the testPostProcessor() method to write a unit test that uses the TrackingPostProcessor to verify that the post processor is getting invoked.</li>'
        + '<li>Note that the TrackingPostProcessor maintains internal static lists of route node and route status changes.  This allows for it to record the calls that happened against the PostProcessor and make it available to our unit test.  Otherwise we would not have an easy way to get ahold of these values.  The workflow engine will create a new instance of the post processor class each time the engine is executed, so by making the lists static (associated with the class instead of instances of the class), it allows for us to retrieve the values even though the original PostProcessor which produced them has been destroyed.</li>'
        + '<li>When you are finished, execute the test and make sure that it passes.</li></ol>',
    
    '<h2>On Your Own</h2>',
    'Now that you’ve seen some examples of how to use the Kuali Workflow Engine, you can try out a few other scenarios if you have extra time.',
    'You could investigate the Post Processor some more and use a document with more than one node so that you can observe how the doRouteLevelChange method works.  There are other methods on the PostProcessor interface as well which may be of interest (such as doActionTaken, doBeforeProcess, doAfterProcess, etc.)',

];

