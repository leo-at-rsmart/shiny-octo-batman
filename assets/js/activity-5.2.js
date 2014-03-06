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

    'In this exercise we are going to define a routing process for the Book Order document that consists of 2 route nodes in the following order:',
    '<ol><li>Fiscal Approval – this node will route the document to an “Accounts Payable” group that will be responsible for ensuring enough funds are available for the order.  If they deem that is the case then they will approve the order.</li>'
        + '<li>Warehouse Processing – this node will route the document to an appropriate warehouse floor manager for approval depending on the category of Books on the Book Order.  If the books include more than one category, then more than one warehouse floor manager could receive the request.  The warehouse floor manager will approve the order once it has been filled.</li></ol>',
    'In order to complete this exercise, we will need to ensure that the Book Order is attaching enough XML to the workflow document to facilitate routing.  By default, the KNS will serialize the entire document to XML using a library called XStream.  Oftentimes, this generates far too much XML.  Thankfully, the data dictionary offers us a way to streamline the XML content that we generate.  We will see how that is done as part of this exercise.',

    '<h3>Checkout “exercise-kew-bookstore” project</h3>',

    'To ensure a clean and consistent environment for everyone, we will check out a project from Subversion as a starting point.  This project will contain completed copies of all work from the previous exercises, as well as some starting points for this exercise.',
    'In order to get the copy of the project that you will need, please check out the exercise-kew-bookstore project from the training Subversion repository.',
    
    '<h3>Update the Book Order Data Dictionary File</h3>',
    'First, we need to update the BookOrderDocument.xml data dictionary file to add a section that defines the attributes we want to make available to the workflow engine.  This will essentially control what kind of XML gets generated for our document so that we can easily construct an XPath expression later to locate it.',
    'To do this, follow these steps:',
    '<ol><li>Open the BookOrderDocument.xml data dictionary file.</li>'
        + '<li>There is a commented out section in this file with a bean id of BookOrderDocument-WorkflowProperties.  Uncomment this section.</li>'
        + '<li>Also uncomment the commented out workflowProperties property on BookOrderDocument-parentBean</li></ol>',
    'The workflow properties definition is used to instruct the KNS which attributes to serialize into XML, starting from a base path.',
    'In our case, we use “document.bookOrderEntries” which will essentially call getDocument().getBookOrderEntries() on the form and then serialize the various org.kuali.rice.krad.datadictionary.WorkflowProperty beans defined within.',
    'After making this change, test that your XML is getting generated properly by performing the following steps:',
    '<ol><li>Launch the web application and login (or execute a backdoor login) as user1.</li>'
        + '<li>Click on the “Book Order” link to initiate a new Book Order.</li>'
        + '<li>Fill out the book order, being sure to add a book or two to the list.</li>'
        + '<li>Hit the submit button.</li>'
        + '<li>Write down or copy the document id somewhere.  We will need it a few steps later.</li>'
        + '<li>To check the XML that has been generated, execute a backdoor login as the admin user.</li>'
        + '<li>Click on the “Administration” tab.</li>'
        + '<li>Click on the “Document Operation” link.</lI>'
        + '<li>Enter the document id of the Book Order that you submitted.</li>'
        + '<li>Once the document operation screen loads, scroll down and find the field labeled “Doc Content”.  This will contain the XML that was generated for your document.  It should look similar to the following:'
        + '<pre class="pre-scrollable">'
        + '&lt;documentContent&gt;&lt;applicationContent&gt;&lt;org.kuali.rice.krad.workflow.KualiDocumentXmlMaterializer&gt;\n'
        + '    &lt;document class="train.bookstore.document.BookOrderDocument"&gt;\n'
        + '      &lt;bookOrderEntries&gt;\n'
        + '        &lt;train.bookstore.bo.BookOrderEntry&gt;\n'
        + '          &lt;id&gt;14&lt;/id&gt;\n'
        + '          &lt;documentId&gt;3115&lt;/documentId&gt;\n'
        + '        &lt;bookId&gt;24&lt;/bookId&gt;\n'
        + '        &lt;quantity&gt;5&lt;/quantity&gt;\n'
        + '        &lt;book&gt;\n'
        + '          &lt;title&gt;The Hitchhikers Guide to the Galaxy&lt;/title&gt;\n'
        + '          &lt;category&gt;Science Fiction&lt;/category&gt;\n'
        + '          &lt;author&gt;\n'
        + '            &lt;id&gt;14&lt;/id&gt;\n'
        + '            &lt;firstName&gt;Douglas&lt;/firstName&gt;\n'
        + '            &lt;lastName&gt;Adams&lt;/lastName&gt;\n'
        + '            ...\n'
        + '          &lt;/author&gt;\n'
        + '        &lt;/book&gt;\n'
        + '        ...\n'
        + '       &lt;/train.bookstore.bo.BookOrderEntry&gt;\n'
        + '       ...\n'
        + '     &lt;/bookOrderEntries&gt;\n'
        + '   &lt;/document&gt;\n'
        + ' &lt;/org.kuali.rice.krad.workflow.KualiDocumentXmlMaterializer&gt;&lt;/applicationContent&gt;&lt;/documentContent&gt;\n'
        + '</pre></li></ol>',
    
    'If you see a large amount of additional XML (i.e. thousands of lines) than this or hardly any XML at all, it means that your WorkflowAttributes were not configured correctly.  If this is the case, please go back and verify the previous steps or ask the instructor for assistance.',

    '<h3>Create the Fiscal Approval Node</h3>',

    'This node will consist of simple group routing.  This will be similar to what we did in the last exercise when setting up rules to route to groups for our unit tests.  You can use the Document Types we created in that exercise as examples.',

    '<Perform the following steps to complete this part of the exercise:',

    '<ol><li>Copy the file named workflow/BookOrderDocumentType.xml to workflow/BookOrderAccountsPayable.xml and add a routeNodes and routePath section to the BookOrderDocumentType definition.  You can see examples of these in some of the workflow configuration that you ingested in previous exercises.</li>'
        + '<li>Include a <code>&lt;start&gt;</code> node named “AdHoc”.</li>'
        + '<li>Add a <code>&lt;requests&gt;</code> node after the AdHoc node named “Fiscal Approval”.</li>'
        + '<li>While we are in here, we should define the “doc handler” for the Book Order document type.  This will allow us to load a Book Order by clicking on its document id in either Document Search or the Action List.</li>'
        + '<li>Add the following right before the <routePaths> section:'
        + '<pre>'
        + '&lt;docHandler&gt;${application.url}/bookOrder.do?methodToCall=docHandler&lt;/docHandler&gt;'
        + '</pre></li>'

        + '<li>Next, Set the ruleTemplate for this node to “FiscalApprovalTemplate”.</li>'
        + '<li>Add a &lt;ruleTemplates&gt; section to this XML file which contains a single rule template named “FiscalApprovalTemplate”.  This should be a simple rule template which contains no attributes (similar to the ones we created last exercise),</li>'
        + '<li>Add a &lt;rules&gt; section with a single rule configured for the BookOrderDocumentType document type and the FiscalApprovalTemplate rule template.</li>'
        + '<li>On this rule, please be sure to define &lt;forceAction&gt;true&lt;/forceAction&gt;</li>'
        + '<li>Define a responsibility on this rule which routes an approval request to the “TRNAPP : Accounts Payable” group.  This should look like the following:</li>'
        + '<pre>'
        + '&lt;responsibility&gt;\n'
        + '  &lt;groupName namespace="TRNAPP"&gt;Accounts Payable&lt;/groupName&gt;\n'
        + '  &lt;actionRequested&gt;A&lt;/actionRequested&gt;\n'
        + '&lt;/responsibility&gt;\n'
        + '</pre></li>'
        + '<li>Next you need to create the group.  This can be done via the user interface, but to save some time, we will create the group via XML ingestion.</li>'
        + '<li>Add the following to the top of your BookOrderAccountsPayable.xml file (but within the main &lt;data&gt; element:'
        + '<pre>'
        + '&lt;groups xmlns="ns:workflow/Group" \n'
        + '        xsi:schemaLocation="ns:workflow/Group resource:Group"&gt;\n'
        + '  &lt;group&gt;\n'
        + '    &lt;namespace&gt;TRNAPP&lt;/namespace&gt;\n'
        + '    &lt;name&gt;Accounts Payable&lt;/name&gt;\n'
        + '    &lt;members&gt;\n'
        + '      &lt;principalName&gt;user3&lt;/principalName&gt;\n'
        + '    &lt;/members&gt;\n'
        + '  &lt;/group&gt;\n'
        + '&lt;/groups&gt;\n'
        + '</li></pre>'

        + '<lI>After you have all of this defined, launch the web application.</li>'
        + '<li>Navigate to the “XML Ingester” and ingest the BookOrderAccountsPayable.xml file.  Note that this will effectively update your BookOrderDocumentType to the latest document type definition as defined in the XML file.</li>'
        + '<li>Your Book Order document type should now be set up to do “Fiscal Approval” routing, but let’s test to make sure!</li></ol>',
    '<h3>Test Fiscal Approval Routing</h3>',
    'To test that your setup is working, follow test steps.',
    '<ol><li>Execute a backdoor login as user1</li>'
        + '<li>Click on the <b>Book Order</b> link.</li>'
        + '<li>Fill out a the form and click submit (for now, it shouldn’t matter which books you add to the order, as long as they exist!)</li>'
        + '<li>Once the document has been submitted, it should route for approval to user3 as a member of the <b>TRNAPP : Accounts Payable</b> group.</li>'
        + '<li>To verify this, execute a back door login as <b>user3</b></li>'
        + '<li>Click on the <b>Action List</b> button at the top of the portal.</li>'
        + '<li>You should see the document in user3’s action list.  This should look something like the following:</li>'
    
        + '<li>Click on the Route Log icon in the <b>Log</b> column.  On the resulting screen it should show that the document is awaiting approval from the <b>Accounts Payable</b> group.</li>'
        + '<li>Now, click on the linked document id in the <b>Id</b> column of the Action List.</li>'
        + '<li>It should open the Book Order that was submitted.  There should be an <b>approve</b> button at the bottom of this page.</li>'
        + '<li>Click the “approve” button to submit the approval for <b>user3</b>.</li>'
        + '<li>After approving, this should send you back to the Action List of <b>user3</b>.  The document should no longer be there.</li>'
        + '<li>Navigate to <b>Document Search</b> and perform a search.  The document should be returned in the result set and should have a status of <b>FINAL</b></li></ol>',
    
    '<h3>Create the Warehouse Processing Node</h3>',
    '<li>For this part of the exercise we are going to create some more complex routing rules that are driven by document data.  Recall that for Warehouse Processing we will be routing based on the category of the books in our order.  For the sake of simplicity, we will create rules based on the following categories:',
    '<ul><li>Science Fiction</li>'
        + '<li>Photography</li></ul>',
    'You may have some books in your database that fall under both of these categories from previous exercises.  If not, then use the Book maintenance document to create some.',
    'Kuali Enterprise Workflow provides some standard rule attributes that can be configured and ingested in XML and can be used to perform matching logic using XPath.  This is how we will configure the rules.  To do this, follow these steps:',
    '<ol><li>Copy the <kbd>workflow/BookOrderAccountsPayable.xml</kbd> file to <kbd>workflow/BookOrderWarehouseProcessing.xml</kbd></li>'
        + '<li>Remove everything from this file with the exception of the BookOrderDocumentType document type definition.</li>'
        + '<li>First, we must define the “Rule Attribute” that will be used to perform matching based on book category.</li>'
        + '<li>Add a &lt;ruleAttributes&gt; section at the top of the file (inside of the &lt;data&gt; element) as follows:'
        + '<pre class="pre-scrollable">'
        + '&lt;ruleAttributes \n'
        + '  xmlns="ns:workflow/RuleAttribute" \n'
        + '  xsi:schemaLocation="ns:workflow/RuleTemplate resource:RuleAttribute"&gt;\n'
        + '...\n'
        + '&lt;/ruleAttributes&gt;\n'
        + '</pre></li>'    
        + '<li>Within this section, enter the following:'
        + '<pre class="pre-scrollable">&lt;ruleAttribute&gt;\n'
        + '  &lt;name&gt;BookCategoryAttribute&lt;/name&gt;\n'
        + '  &lt;label&gt;Book Category Attribute&lt;/label&gt;\n'
        + '  &lt;className&gt;org.kuali.rice.kew.rule.xmlrouting.StandardGenericXMLRuleAttribute&lt;/className&gt;\n'
        + '  &lt;type&gt;RuleXmlAttribute&lt;/type&gt;\n'
        + '  &lt;routingConfig&gt;\n'
        + '    &lt;fieldDef name="category" title="Category" workflowType="RULE"&gt;\n'
        + '      &lt;display&gt;\n'
        + '      &lt;type&gt;text&lt;/type&gt;\n'
        + '      &lt;/display&gt;\n'
        + '      &lt;validation required="true" /&gt;\n'
        + '      &lt;fieldEvaluation&gt;\n'
        + "        &lt;xpathexpression&gt;//book/category = wf:ruledata('category')&lt;/xpathexpression&gt;\n"
        + '      &lt;/fieldEvaluation&gt;\n'
        + '    &lt;/fieldDef&gt;\n'
        + '  &lt;/routingConfig&gt;\n'
        + '&lt;/ruleAttribute&gt;\n</pre></li>'
        + '<li>Next, define the rule template which contains this attribute as follows:'
        + '<pre class="pre-scrollable">&lt;ruleTemplate&gt;\n'
        + '  &lt;name&gt;WarehouseProcessingTemplate&lt;/name&gt;\n'
        + '  &lt;description&gt;Warehouse Processing Rule Template&lt;/description&gt;\n'
        + '  &lt;attributes&gt;\n'
        + '    &lt;attribute&gt;\n'
        + '      &lt;name&gt;BookCategoryAttribute&lt;/name&gt;\n'
        + '    &lt;/attribute&gt;\n'
        + '  &lt;/attributes&gt;\n'
        + '&lt;/ruleTemplate&gt;\n</pre></li>'
        + '<li>Next, update <b>BookOrderDocumentType</b> to add a <b>Warehouse Processing</b> node that uses the <code>WarehouseProcessingTemplate</code> rule template.</li>'
        + '<li>Finally, we need to define two rules for each of the categories we are going to route based on.  These will be slightly different than our past rules because they will also include <b>rule extensions</b> for the category associated with the rule.</li>'
        + '<li>Here is an example of one of the rules, create the other one on our own (recall that we are using <b>Science Fiction</b> and <b>Photography</b> as the two categories we will be routing based on):'
        + '<pre class="pre-scrollable">&lt;rule&gt;\n'
        + '  &lt;documentType&gt;BookOrderDocumentType&lt;/documentType&gt;\n'
        + '  &lt;ruleTemplate&gt;WarehouseProcessingTemplate&lt;/ruleTemplate&gt;\n'
        + '  &lt;description&gt;Warehouse processing for Photography&lt;/description&gt;\n'
        + '  &lt;forceAction&gt;true&lt;/forceAction&gt;\n'
        + '  &lt;ruleExtensions&gt;\n'
        + '    &lt;ruleExtension&gt;\n'
        + '      &lt;attribute&gt;BookCategoryAttribute&lt;/attribute&gt;\n'
        + '      &lt;ruleTemplate&gt;WarehouseProcessingTemplate&lt;/ruleTemplate&gt;\n'
        + '      &lt;ruleExtensionValues&gt;\n'
        + '        &lt;ruleExtensionValue&gt;\n'
        + '          &lt;key&gt;category&lt;/key&gt;\n'
        + '          &lt;value&gt;Photography&lt;/value&gt;\n'
        + '        &lt;/ruleExtensionValue&gt;\n'
        + '      &lt;/ruleExtensionValues&gt;\n'
        + '    &lt;/ruleExtension&gt;\n'
        + '  &lt;/ruleExtensions&gt;\n'
        + '  &lt;responsibilities&gt;\n'
        + '    &lt;responsibility&gt;\n'
        + '      &lt;principalName&gt;user4&lt;/principalName&gt;\n'
        + '      &lt;actionRequested&gt;A&lt;/actionRequested&gt;\n'
        + '    &lt;/responsibility&gt;\n'
        + '  &lt;/responsibilities&gt;\n'
        + '&lt;/rule&gt;\n</pre></li></ol>'
        + '<li>This completes the setup work.  Complete the exercise by ingesting your BookOrderWarehouseProcessing.xml file and routing a book order (with books in the appropriate category) to ensure that the document is routing to the warehouse floor manager(s) successfully.</li>'
        + '<li>You will need to be sure to approve the document as user3 first when the document arrives at the Fiscal Approval node in order for it to transition to the Warehouse Processing node.</li>'
        + '<li>Once you do this, if you open the route log, it should look like the following, with a request to the warehouse processing responsible parties for Photography and Science Fiction:</li>',
];

