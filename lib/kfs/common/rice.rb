#!/usr/bin/env ruby

# 
# == Synopsis
#
# Authentication class containing all operations around app authentication
#
# Author:: Leo Przybylski (mailto:leo@rsmart.com)

#require File.dirname(__FILE__) + '/../organization/organization.rb'
require 'uri'
require 'cgi'

class RiceUtility
  
  attr_accessor :request
  
  def initialize(request_obj)
    @request = request_obj
  end

end

class RoleLookup
  
  attr_accessor :request
  
  def initialize(request_obj)
    @request = request_obj
  end

  def start
    @request.add('/kr-dev/kr/lookup.do', 
      {
        'method'       => 'POST',
        'content_type' => 'application/x-www-form-urlencoded',
        'contents'     => CGI.escape("methodToCall=start&businessObjectClassName=org.kuali.rice.kim.bo.impl.RoleImpl&docFormKey=88888888")
      }, 
      {:secondary_server_req => @request.config.secondary_servers['rice'], :external => true}
    )
  end

  def search
    @request.add('/kr-dev/kr/lookup.do', 
      {
        'method'       => 'POST',
        'content_type' => 'application/x-www-form-urlencoded',
        'contents'     => CGI.escape("methodToCall=search&lookupableImplServiceName=roleLookupable&multipleValues=No&suppressActions=No&suppressActions=Yes&hasReturnableRow=No&showMaintenanceLinks=Yes&headerBarEnabled=Yes&hideReturnLink=Yes&businessObjectClassName=org.kuali.rice.kim.bo.impl.RoleImpl&docFormKey=88888888")
      }, 
      {:secondary_server_req => @request.config.secondary_servers['rice'], :external => true}
    )
  end

end
