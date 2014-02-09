#!/usr/bin/env ruby

# 
# == Synopsis
#
# Authentication class containing all operations around app authentication
#
# Author:: Leo Przybylski (mailto:leo@rsmart.com)

#require File.dirname(__FILE__) + '/../organization/organization.rb'
require 'uri'

class DisbursementVoucher
  
  attr_accessor :request
  
  def initialize(request_obj)
    @request = request_obj
  end

  def create
    @request.add(URI.escape("#{@request.url}/financialDisbursementVoucher.do?methodToCall=docHandler&command=initiate&docTypeName=DV#topOfForm", Regexp.new("[^#{URI::PATTERN::UNRESERVED}]")))
  end

  def copy(tocopy)
    @request.add("#{@request.url}/financialDisbursementVoucher.do",
                 {
                   'method'       => 'POST',
                   'content_type' => 'application/x-www-form-urlencoded',
                   'contents'     => "methodToCall.copy&amp;document.documentHeader.documentNumber=#{tocopy}"
                 })
  end

end
