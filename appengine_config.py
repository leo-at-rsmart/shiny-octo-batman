# Copyright 2012 Google Inc. All Rights Reserved.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#      http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS-IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

"""Custom configurations and functions for Google App Engine."""

__author__ = 'psimakov@google.com (Pavel Simakov)'

import os
import sys


# Whether we are running in the production environment.
PRODUCTION_MODE = not os.environ.get(
    'SERVER_SOFTWARE', 'Development').startswith('Development')

# this is the official location of this app for computing of all relative paths
BUNDLE_ROOT = os.path.dirname(__file__)

# Default namespace name is '' and not None.
DEFAULT_NAMESPACE_NAME = ''

# Third-party library zip files.
THIRD_PARTY_LIBS = ['babel-0.9.6.zip', 'gaepytz-2011h.zip']

for lib in THIRD_PARTY_LIBS:
    thirdparty_lib = os.path.join(BUNDLE_ROOT, 'lib/%s' % lib)
    if not os.path.exists(thirdparty_lib):
        raise Exception('Library does not exist: %s' % thirdparty_lib)
    sys.path.insert(0, thirdparty_lib)

if not PRODUCTION_MODE:
    from google.appengine.api import apiproxy_stub_map  # pylint: disable-msg=g-import-not-at-top
    from google.appengine.datastore import datastore_stub_util  # pylint: disable-msg=g-import-not-at-top

    # Make dev_appserver run with PseudoRandomHRConsistencyPolicy, which we
    # believe is the best for localhost manual testing; normally dev_appserver
    # runs either under MasterSlave policy, which does not allow XG
    # transactions, or under TimeBasedHR policy, which serves counter-intuitive
    # dirty query results; this also matches policy for the functional tests
    #stub = apiproxy_stub_map.apiproxy.GetStub(
    #    'datastore_v3')
    #if stub:
    #    policy = datastore_stub_util.PseudoRandomHRConsistencyPolicy(
    #        probability=1)
    #    stub.SetConsistencyPolicy(policy)
