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

    '<h2>MySQL</h2><h3>Downloading</h3>Visit the <a href="http://www.mysql.com">MySQL project site</a>.',

    'Near the top of the page, there is a <b>GA</b> tab. Click it and you will be directed to the download area. Select MySQL Server Community Edition.',

    'Now select the .',
    
    '<h3>Update <code>my.cnf</code></h3>',
    'Locate the <code>my.cnf</code> file for your mysql installation and open it in a text editor to add the following.',
    
    "<pre class=\"pre-scrollable\">[mysqld]\n"
    + "max_allowed_packet=20M\n"
    + "transaction-isolation=READ-COMMITTED\n"
    + "lower_case_table_names=1\n"
    + "max_connections=1000\n"
    + "innodb_locks_unsafe_for_binlog=1</pre>",
    
    '<h3>Installation</h3>',

    'Windows has the option of choosing an MSI installer or a zip file. I recommend the zip file because it makes the installation much simpler.',

    'Uncompress the zip file into <code>C:\Program Files</code>. This will make it easier to locate later.',
    
    'Mac users will use the MySQL pkg installer which will install mysql into <code>/usr/local/mysql</code>',
    
    '<h3>Add to the PATH Environment Variable</h3>',
    
    'On Windows, you probably uncompressed a zip file into <code>C:\\Program Files</code>, so you can simply add that to your PATH variable. ',

    'On Mac, edit your <code>$HOME/.bash_profile</code>, and add mysql to the PATH. Here is an example:',
    
    "<pre class=\"pre-scrollable\"># Get the aliases and functions\n"
    + "if [ -f ~/.bashrc ]; then\n"
    + "   . ~/.bashrc\n"
    + "fi\n\n"
    + "# User specific environment and startup programs\n"
    + "MYSQL_HOME=/usr/local/mysql\n"
    + "PATH=$PATH:$MYSQL_HOME/bin\n"
    + "export BASH_ENV PATH \n"
        + "unset USERNAME\n</pre>",

    'Also, the dmg file will have included a <code>MySQL.prefPane</code>. Double-clicking the prefPane icon will open a MySQL Preferences pane in the System Preferences application. You can use this to start/stop MySQL',
];
