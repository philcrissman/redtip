require 'rake'
require 'rake/testtask'
require 'rake/rdoctask'

desc 'Default: run unit tests.'
task :default => :test

desc 'Test the redtip plugin.'
Rake::TestTask.new(:test) do |t|
  t.libs << 'lib'
  t.pattern = 'test/**/*_test.rb'
  t.verbose = true
end

desc 'Generate documentation for the redtip plugin.'
Rake::RDocTask.new(:rdoc) do |rdoc|
  rdoc.rdoc_dir = 'rdoc'
  rdoc.title    = 'Redtip'
  rdoc.options << '--line-numbers' << '--inline-source'
  rdoc.rdoc_files.include('README')
  rdoc.rdoc_files.include('lib/**/*.rb')
end

desc "Update redtip javascript and css files" 
task :update_scripts => [] do |t| 
  redbox_dir = File.expand_path(".")
  root_dir = File.join(redbox_dir, '..', '..', '..')
  File.copy File.join(redbox_dir, 'javascripts', 'redtip.js'), File.join(root_dir, 'public', 'javascripts', 'redtip.js')
  File.copy File.join(redbox_dir, 'stylesheets', 'redtip.css'), File.join(root_dir, 'public', 'stylesheets', 'redtip.css')
  File.copy File.join(redbox_dir, 'images', 'closelabel.gif'), File.join(root_dir, 'public', 'images', 'closelabel.gif')

  puts "Updated Scripts." 
end


