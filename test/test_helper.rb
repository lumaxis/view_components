# frozen_string_literal: true

ENV["RAILS_ENV"] = "test"

if ENV["COVERAGE"] == "1"
  require "simplecov"
  require "simplecov-console"

  SimpleCov.start do
    command_name "rails#{ENV['RAILS_VERSION']}-ruby#{ENV['RUBY_VERSION']}" if ENV["RUBY_VERSION"]
    formatter SimpleCov::Formatter::Console
  end
end

require "erb_lint/all"
require "minitest/autorun"
require "mocha/minitest"
require "rails"
require "rails/test_help"
require "view_component/test_helpers"
require "test_helpers/assert_allocations_helper"
require "test_helpers/component_test_helpers"
require "yard/docs_helper"
require "pry"
require "yaml"

require File.expand_path("../demo/config/environment.rb", __dir__)

require "primer/view_components"
require "primer/view_components/linters"
