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
    '<h2>KIM Role Responsibility-based Routing</h2>',
    'KIM provides a feature which plugs into the KEW engine and effectively allows for routing to roles that are defined in KIM.  It does this through a mechanism called responsibilities.  A responsibility in KIM indicates an action that someone is responsible for taking, as opposed to an action that someone is “allowed” to take as is the case with permissions.  Generally speaking, the responsibility construct is very similar to permissions.  It has the concept of responsibility details (similar in nature to permission details) and responsibilities are also assigned directly to roles.',
    'In our case the responsibility we create will declare that members of the role to which that responsibility is assigned “will be responsible to approve BookOrder documents at the Warehouse Processing node”.',
    'We will define a Warehouse Manager role that uses a custom “role type” which will define a qualifier for the role based on the book category.  This means that each member that is added to the role will be added with a value for the qualifier.  So instead of saying, for example, that “user1” is a warehouse manager, the role can also define that “user1” is a warehouse manager for books in the “Science Fiction” category.  Our responsibility-based routing will use this to look at the categories of the books on the submitted Book Order and route the document to the appropriate members of the role.',
    'In this exercise we will walk you through an example of setting up a role that supports qualifiers as well as a responsibility to go along with that role which will trigger the desired workflow routing.  You will progress through a series of steps during this exercise in order to accomplish this.',
    '<h3>Checkout “exercise-kew-kim-routing” project</h3>',
    'To ensure a clean and consistent environment for everyone, we will check out a project from Subversion as a starting point.  This project will contain completed copies of all work from the previous exercises, as well as some starting points for this exercise.',
    'In order to get the copy of the project that you will need, please check out the exercise-kew-kim-routing project from the training Subversion repository.',
    '<h3>Define the “BookCategoryRoleType”</h3>',
    'The first step in this process is to define a role type which can be used on roles that use the book category as a qualifier for its members.  KIM has a general purpose typing system which is used for defining different types for roles, groups, permissions, etc.',
    'A KimType defines a few important things:',
    '<ul><li>The namespace and name for the type.</li>'
        + '<li>A list of attribute definitions that define which attributes that particular type supports (i.e. the book category in our case).</li>'
        + '<li>A service name which points to the service that implements the given type.  KIM defines multiple java interfaces and base classes which can be used to customize the behavior of a given type.  For our purposes we will be using the org.kuali.rice.kim.framework.role.RoleTypeService interface and it’s corresponding base class.  These services can define how fields are rendered in the user interface, customize processing of things like qualifiers, provide hooks to perform validation, customize the workflow process used for a particular KIM document, and much more.</li><ul>',
    'KIM does not provide a user interface or an XML format for defining custom types.  So the only way to get them into the system is via direct database inserts using SQL.  The specific tables at play here are:',
    '<ul><li><code>KRIM_TYP_T</code> – defines the actual KIM type, including it’s namespace, name, and the service name which implements the type.</li>'
        + '<li><code>KRIM_TYP_ATTR_DEFN_T</code> – defines data attributes and optionally associates them with a Data Dictionary component.  The attribute definition is not associated directly with a KIM type as they can be reused across multiple types.</li>'
        + '<li><code>KRIM_TYP_ATTR_T</code> – associates a specific KIM type with an attribute definition.  A KIM type can have any number of attribute definitions associated with it.</li></ul>',
    'For this exercise you will be creating a single entry in each of these tables.  A file in the <b>sql</b> directory named create-kim-type-category.sql has been created for you.  Let’s review each of the insert statements in this file so that you can familiarize yourself with what this sql is doing:',
    '<h3>Creating the KIM Type</h3',
    '<pre>'
        + 'INSERT INTO krim_typ_t (\n'
        + '	kim_typ_id, nmspc_cd, nm, srvc_nm, actv_ind, obj_id\n'
        + ') VALUES (\n'
        + 'LAST_INSERT_ID(),\n'
        + "'TRNAPP',\n"
        + "'Book Category',\n"
        + "'bookCategoryRoleTypeService',\n"
        + "'Y',\n"
        + "uuid());\n</pre>",
    'In this SQL statement we are create the <b>Book Category</b> KIM type in the <code>KRIM_TYP_T</code> table.  This essentially defines the type and gives it a label.  When we create our role, we will specify this as the role type.',
    'Most importantly, the value of the <code>srvc_nm</code> column contains a service name which must point to a service that implements the KimRoleTypeService interface.  This can be used to customize the behavior of various aspects of the role.  Although, as you will see later, we will simply use the default implementation of the role type service for this exercise.',
    '<h3>Creating the Attribute Definition</h3>',
    '<pre>'
        + 'INSERT INTO krim_attr_defn_t (\n'
        + ' 	kim_attr_defn_id, nmspc_cd, nm, lbl, cmpnt_nm, actv_ind, obj_id\n'
        + ') VALUES (\n'
        + 'LAST_INSERT_ID(),\n'
        + "'TRNAPP',\n"
        + "'category',\n"
        + "'Category',\n"
        + "‘train.bookstore.bo.Book’,\n"
        + "'Y',\n"
        + "uuid());\n</pre>",
    'This SQL simply creates an entry in the <code>KRIM_ATTR_DEFN_T</code> table which represents the book’s <code>category</code> attribute.  This table also supports the ability to integrate with the data dictionary via the column called <code>cmpnt_nm</code>.  You can see here that we’ve supplied it with the class name of our <b>Book</b> business object.',
    '<h3>Creating the KIM Type to Attribute Link</h3>',
    '<pre>'
        + 'INSERT INTO krim_typ_attr_t (\n'
        + ' 	kim_typ_attr_id, kim_typ_id, kim_attr_defn_id, sort_cd, actv_ind, obj_id\n'
        + ') VALUES (\n'
        + 'LAST_INSERT_ID(),\n'
        + "(select kim_typ_id from krim_typ_t where nmspc_cd='TRNAPP' and nm='Book Category'),\n"
        + "(select kim_attr_defn_id from krim_attr_defn_t where nmspc_cd='TRNAPP' and nm='category'),\n"
        + "'a',\n"
        + "'Y',\n"
        + "uuid());\n</pre>",
    'This SQL simply links the KIM type to the attribute.  A KIM type can be associated with any number of attribute definitions, but in our case we only have one.  Notice the sort_cd column on this table which helps define the order in which the attributes will appear on things like the user interface.',
    '<h3>Execute the SQL</h3>',
    'Now that we understand what this SQL is doing, let’s go ahead and execute it against the database.  To do that, follow these steps:',
    '<ol><li>Launch the mysql command line or the sql tool of your choice.</li>'
        + '<li>Copy the contents from <code>create-kim-type-category.sql</code> into your sql client and execute it.</li>'
        + '<li>This should create the new book category KIM type and its related attributes in the database.</li></ol>',
    '<h3>Publish the bookCategoryRoleTypeService to the KSB</</h3>',
    'In order for the KIM functionality to be able to properly identify your role type, you must wire your role type service up in Spring and then publish it to the Kuali Service Bus. ',
    'Recall that the service name you associated with the Book Category KIM type was <code>bookCategoryRoleTypeService</code>.  In order to wire this in Spring and make it available to the KSB, follow these steps:'
        + '<ol><li>Open the <code>trnapp-BookstoreModuleBeans.xml</code> file.</li>'
        + '<li>Add the following to the bottom of the file:'
        + '<pre class="pre-scrollable">'
        + '&lt;bean id="bookCategoryRoleTypeService"\n'
        + '      class="org.kuali.rice.kns.kim.role.RoleTypeServiceBase" /&gt;\n</pre></li>'
        + '<li>This creates an instance of the default RoleTypeService implementation in KIM and assigns it a bean id of <code>bookCategoryRoleTypeService</code>.  Notice how this matches the srvc_nm column that you configured in the KRIM_TYP_T table in an earlier step.  Since we aren’t implementing any custom processing here, using the default type works fine.  If you wanted to customize the role type, you could create a class that extends  RoleTypeServiceBase and overrides the portions that you want to customize.  You would then wire up that class in the spring file instead.</li>'
        + '<li>Next, we need to publish it to the service bus.  This is actually not immediately necessary for our specific setup because your client application and the Rice standalone server are being loaded as part of the same application.  However, once you integrate with a central Rice Standalone Server (in a later exercise), the KIM user interfaces (which are hosted from the server) will need to be able to locate and invoke your role type service in order to determine how to render certain portions of the UI.  This communication will need to done over the service bus between the server and the client application.  To publish the service, add the following at the end of <code>trnapp-BookstoreModuleBeans.xml</code>:'
        + '<pre class="pre-scrollable">'
        + '&lt;bean class="org.kuali.rice.ksb.api.bus.support.CallbackServiceExporter"&gt;\n'
        + '  &lt;property name="callbackService" ref="bookCategoryRoleTypeService" /&gt;\n'
        + '  &lt;property name="serviceNameSpaceURI" value="" /&gt;\n'
        + '  &lt;property name="localServiceName" value="bookCategoryRoleTypeService" /&gt;\n'
        + '  &lt;property name="serviceInterface"\n'
        + '            value="org.kuali.rice.kim.framework.role.RoleTypeService" /&gt;\n'
        + '&lt;/bean&gt;\n</pre></li></ol>',
    '<h3>Create the Warehouse Manager Role</h3>',
    'In this part of the exercise you will create the Warehouse Manager role using the KIM user interface.  To do this, follow these steps:',
    '<ol><li>Launch the web application.</li>'
        + '<li>Navigate to the <b>Administration</b> tab inside the portal.  Log in as the <b>admin</b> user if prompted.</li>'
        + '<li>Click on the <b>Role</b> link under the <b>Identity</b> section.</li>'
        + '<li>When the <b>Role Lookup</b> page finishes loading, click <b>create new</b> in the top right-hand corner.</li>'
        + '<li>This will bring up the <b>Kim Type Lookup</b> screen.  This is where you select the role type for the role you are creating.  We will use the one that you created in the last part of this exercise.  Click the <b>search</b> button.</li>'
        + '<li>The <b>Book Category</b> role type should be in this list.  If it’s not then recheck the previous portions of this exercise to ensure you performed them correctly.  Find <b>Book Category</b> in the list and click the <b>return value</b> link.</li>'
        + '<li>The resulting screen should be the Role creation screen.  If things have been set up correctly, then under the <b>Assignees</b> section, you should see an <b>Add Member</b> line which includes our <b>Category</b> qualifier:</li>'
        + '<li>On this screen, do the following:</li>'
        + '<li>Enter a <b>Description</b> of your choice.</li>'
        + '<li>Select <b>Training Application</b> for the namespace.</li>'
        + '<li>Enter <b>Warehouse Manager</b> for the role name.</li>'
        + '<li>Enter a <b>Role Description</b> of your choice.</li>'
        + '<li>Under the assignees section, enter a <b>Member Identifier</b> of <b>user4</b> and a category of <b>Photography</b>.</li>'
        + '<li>Click the <b>add</b> button.</li>'
        + '<li>Under the assignees section, enter a <b>Member Identifier</b> of <b>testuser1</b> and a category of <b>Science Fiction</b>.</li>'
        + '<li>Click the <b>add</b> button.</li>'
        + '<li>Now that the role document has been filled out, click the <b>submit</b> button.</li>'
        + '<li>Once the role has been submitted, navigate back to the <b>Role Lookup</b> and verify that the new Warehouse Manager role exists.</li></ol>',
    '<h3>Configure the BookOrderDocumentType</h3>',
    'In order for KEW to understand how to route to members of your role, you must configure the <b>Warehouse Processing</b> node that you defined in earlier exercises so that it uses role-based routing.',
    'To set this up, do the following:',
    '<ol><li>Copy the <code>BookOrderWarehouseProcessing.xml</code> file in the <b>workflow</b> directory to a file named <code>BookOrderKimRoleRouting.xml</code>.</li>'
        + '<li>Remove the <code>&lt;ruleAttributes&gt;</code>, <code>&lt;ruleTemplates&gt;</code>, and <code>&lt;rules&gt;</code> sections from this file, leaving only the <code>&lt;documentTypes&gt;</code>…<code>&lt;/documentTypes&gt;</code> section.</li>'
        + '<li>There should already be a <b>Warehouse Processing</b> node on your <code>BookOrderDocumentType</code>, however it is configured as a <code>&lt;requests&gt;</code> node which means that it is using the KEW routing rule system.  We are going to modify this to use KIM role-based routing.</li>'
        + '<li>Modify the <code>&lt;routePath&gt;</code> definition as follows:'
        + '<pre class="pre-scrollable">'
        + '&lt;routePath&gt;\n'
        + '  &lt;start name="AdHoc" nextNode="Fiscal Approval" /&gt;\n'
        + '  &lt;requests name="Fiscal Approval" nextNode="Warehouse Processing" /&gt;\n'
        + '  &lt;role name="Warehouse Processing" /&gt;\n'
        + '&lt;/routePath&gt;</pre></li>\n'
        + '<li>Next, modify the Warehouse Processing <code>&lt;routeNode&gt;</code> definition as follows:'
        + '<pre class="pre-scrollable">'
        + '&lt;role name="Warehouse Processing"&gt;\n'
        + '  &lt;activationType&gt;P&lt;/activationType&gt;\n'
        + '  &lt;qualifierResolver&gt;BookCategoryQualifierResolver&lt;/qualifierResolver&gt;\n'
        + '&lt;/role&gt;</pre></li>\n'
        + '<li>This tells the Warehouse Processing node to use KIM role-based routing and to use the specified qualifier resolver to resolve qualifiers needed for resolving role membership.  In our case, we need to extract the <b>category</b> qualifier since that is what the Warehouse Manager role requires.  In order to do this, we will use an XPath-based qualifier to extract the category (KEW provides one of these out of the box).  So we define <code>BookCategoryQualifierResolver</code> as follows (add this to the top of your <code>BookOrderKimRoleRouting.xml</code> file):'
        + '<pre class="pre-scrollable">'
        + '&lt;ruleAttributes xmlns="ns:workflow/RuleAttribute"\n'
        + '    xsi:schemaLocation="ns:workflow/RuleAttribute RuleAttribute"&gt;\n'
        + '  &lt;ruleAttribute&gt;\n'
        + '    &lt;name&gt;BookCategoryQualifierResolver&lt;/name&gt;\n'
        + '    &lt;className&gt;org.kuali.rice.kew.role.XPathQualifierResolver&lt;/className&gt;\n'
        + '    &lt;label&gt;BookCategoryQualifierResolver&lt;/label&gt;\n'
        + '    &lt;type&gt;QualifierResolver&lt;/type&gt;\n'
        + '    &lt;resolverConfig&gt;\n'
        + '      &lt;baseXPathExpression&gt;//book&lt;/baseXPathExpression&gt;\n'
        + '      &lt;attributes name="category"&gt;\n'
        + '        &lt;xPathExpression&gt;./category&lt;/xPathExpression&gt;\n'
        + '      &lt;/attributes&gt;\n'
        + '    &lt;/resolverConfig&gt;\n'
        + '  &lt;/ruleAttribute&gt;\n'
        + '&lt;/ruleAttributes&gt;</pre></li>\n'
        + '<lI>This uses a standard qualifier resolver implementation provided by KEW called the <code>XPathQualifierResolver</code> which can be configured to locate qualifier values using XPath expressions.  In our case we already fashioned some XPath expressions in a previous exercise to locate the book categories, so we will use a similar expression here.</li>'
        + '<li>Once you are done with this, launch the web application and use the <b>XML Ingester</b> to ingest <code>BookOrderKimRoleRouting.xml</code> which will configure your <code>BookOrderDocumentType</code> to use role-based routing.</li></ol>',
    '<h3>Create the Warehouse Processing Responsibility</h3>',
    'Now that the Warehouse Manager role has been created, the next step is to create a responsibility that we can utilize to establish the routing.  To do this, follow these steps:',
    '<ol><li>Ensure that the web application is running.</li>'
        + '<li>Click on the <b>Administration</b> tab.</li>'
        + '<li>Click on the <b>Responsibility</b> link under the <b>Identity</b> section.</li>'
        + '<li>Click the <b>create new</b> button in the top right-hand corner.</li>'
        + '<li>On the resulting screen:'
        + '<ol><li>Enter a <b>Description</b> of your choosing</li>'
        + '<li>Select <b>Training Application</b> for the <b>Responsibility Namespace</b></li>'
        + '<li>Enter <b>Warehouse Manager Responsibility</b> into the <b>Responsibility Name</b></li>'
        + '<li>Enter a <b>Responsibility Description</b> of your choosing</li>'
        + '<li>Type <b>BookOrderDocumentType</b> into the <b>Document Type Name</b> field</li>'
        + '<li>Type <b>Warehouse Processing</b> into the <b>Route Node Name</b> field</li>'
        + '<li>Leave the rest of the fields alone.</li></ol></li>'
        + '<li>Prior to submitting the document, you should see something similar to the following:</li>'
        + '<li>After you have verified that the data is entered correctly, click the <b>submit</b> button to create the responsibility.</li></ol>',
    '<h3>Set up <b>Assign Responsibility</b> Permission for TRNAPP Namespace</h3>',
    'You created the responsibility in the last portion of the exercise, and the next logical step is to add that responsibility to the Warehouse Manager role.  But first we need to define who is allowed to grant responsibilities to roles within the <b>TRNAPP</b> namespace.  Otherwise we will not be authorized to add our new responsibility to the role!',
    'As with <b>Grant Permission</b> and <b>Assign Role</b> permissions that we had to create in an earlier exercise, we need to configure a <b>Grant Responsibility</b> role for the TRNAPP namespace.  Follow these steps to configure this:',
    '<ol><li>Click on the <b>Administration</b> tab.</li>'
        + '<li>Click on the <b>Permission</b> link.</li>'
        + '<li>Enter <b>Grant Responsibility</b> into the <b>Permission Name</b> field and execute a search.</li>'
        + '<li>There should be two permissions returned, click <b>copy</b> on either of these.</li>'
        + '<li>Fill out the resulting Permission document as follows:</li>'
        + '<li>Enter text of your choosing for the <b>Description</b></li>'
        + '<li>Change <b>Permission Name</b> to <b>Grant Responsibility for TRNAPP</b></li>'
        + '<li>Modify the last word in the <b>Permission Description</b> where it mentions the namespace code and change it to <b>TRNAPP</b>.</li>'
        + '<li>In the <b>Permission Details</b> section, change the text there to read: <b>namespaceCode=TRNAPP</b></li>'
        + '<li>Click the <b>submit</b> button and the permission should now be created.  Next we need to assign it to a Role.</li>'
        + '<li>Navigate back to the <b>Administration</b> tab and click on the <b>Role</b> link.</li>'
        + '<li>On the Role Lookup screen, enter <b>Technical Administrator</b> in the <b>Role Name</b> field and execute a search</li>'
        + '<li>You should see the <b>KR-SYS : Technical Administrator</b> role in the result set, click <b>edit</b>.</li>'
        + '<li>We will add our new Permission to this Role as follows:'
        + '<ol><li>Enter text of your choosing for the <b>Description</b></li>'
        + '<li>Click on the lookup icon next to <b>Add Permission ID</b></li>'
        + '<li>On the resulting Permission Lookup, type <b>Grant Responsibility</b> into <b>Template Name</b> and execute a search</li>'
        + '<li>Find our new permission with <b>Permission Detail Values</b> that include <b>TRNAPP</b></li>'
        + '<li>Click the <b>return value</b> link next to this row</li></ol></li>'
        + '<li>Once back on the Role document, click the <b>add</b> button under the permission id.</li>'
        + '<li>Scroll to the bottom of this screen and click the <b>submit</b> button</li>'
        + '<li>To verify this worked, navigate back to the <b>Permission Lookup</b>, type <b>Grant Responsibility</b> into the <b>Template Name</b> field and execute a search.</li>'
        + '<li>In the result set, you should see that our new <b>Grant Responsibility for TRNAPP</b> permission is now assigned to the <b>KR-SYS : Technical Administrator</b> role.</li>'

        + '<li>At this point, members of the <b>KR-SYS : Technical Administrator</b> role (including the <b>admin</b> user) should be able to assign responsibilities to our <b>Warehouse Manager</b> role.</li></ol>',
    '<h3>Add the Responsibility to the Role</h3>',
    'Now that the responsibility has been created and we have set up the permission that allows us to add responsibilities, it’s time to add the responsibility to our Warehouse Manager role.  Follow these steps to do that:',
    '<ol><li>Navigate to the <b>Administration</b> tab in the portal and click on the <b>Role</b> link.</li>'
        + '<li>Click the <b>search</b> button and locate the Warehouse Manager role that we created earlier.  Click the <b>edit</b> link.</li>'
        + '<li>Enter a description of your choosing.</li>'
        + '<li>Find the <b>Responsibilities</b> section and click on the magnifying glass icon next to <b>Add Responsibility ID</b>.</li>'
        + '<li>On the resulting screen, click the <b>search</b> button and locate the responsibility that we created earlier.  Click the <b>return value</b> link.</li>'
        + '<li>Click the <b>add</b> button underneath <b>Add Responsibility ID</b>.</li>'
        + '<li>Select an <b>Action Type Code</b> of <b>APPROVE</b>.</li>'
        + '<li>Type <b>1</b> into the <b>Priority Number</b> field.</li>'
        + '<li>Select an <b>Action Policy Code</b> of <b>ALL</b>.</li>'
        + '<li>Click the <b>Force Action</b> checkbox.</li>'
        + '<li>The result should appear similar to the following:</li>'
        + '<li>Finally, click the <b>submit</b> button at the bottom of the document to update the role and add the responsibility.</li></ol>',
    '<h3>Test the Routing</h3>',
    'At this point, we are finally ready to test that routing against our role is working properly.  What will happen when the workflow engine encounters the new Warehouse Processing node is that it will proceed through the following steps:',
    '<ol><li>First, it will use the configured qualifier resolver to resolve the qualifiers that should be passed to KIM.  In our case, it will extract all book categories for all of the books on the book order from the document’s XML content.</li>'
        + '<li>Next it will ask KIM to resolve the responsibilities for it that match the current state on the document.  To do this it will pass the document type name and the current node name.  KIM will then locate all roles that have a corresponding responsibility assigned.  That will be the Warehouse Manager role in our case.</li>'
        + '<li>KIM will determine (based on the given book category qualifiers) which members of the role should receive the action requests.</li>'
        + '<li>KEW gets back this information and the configured responsibility action information (including the type of the request to send, approval policy, etc.) and generates the appropriate action requests.</li></ol>',
    'In order to test that this is working properly, do the following:',
    '<ol><lI>Navigate to the “Main Menu” in the portal and backdoor as the <b>user1</b> principal.</li>'
        + '<li>Click on the “Book Order” link.</li>'
        + '<li>On the resulting screen, add an order entry for a book in the <b>Photography</b> category and an order entry for a book in the <b>Science Fiction</b> category.</li>'
        + '<li>Click the submit button.</li>'
        + '<li>As per the way we configured this document type in a previous exercise, the document will first stop at Accounts Payable before it hits Warehouse Processing.  So you must first approve the document out of this route node.  To do this, execute a backdoor login as the “user3” principal.</li>'
        + '<li>Navigate to the <b>Action List</b> and load the document.  Click the <b>approve</b> button.</li>'
        + '<li>At this point, the document should be routing to our warehouse managers.  To verify this, navigate to the <b>Document Search</b>.</li>'
        + '<lI>Click the <b>search</b> button and then click on the route log icon to open up the route log.  You should see something like the following:</li>'

        + '<li>As you can see in the screenshot above, the document is awaiting approval from both the <b>Photography</b> and the <b>Science Fiction</b> warehouse managers.  Congratulations!  You now know how to leverage roles and responsibilities in KIM in order to perform workflow routing.</li><ol>',
];