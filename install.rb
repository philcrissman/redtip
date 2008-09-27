# Install hook code here

require 'ftools'

plugins_dir = File.expand_path(".")
redtip_dir = File.join(plugins_dir, 'redtip')
root_dir = File.join(redtip_dir, '..', '..', '..')

File.copy File.join(redtip_dir, 'javascripts', 'redtip.js'), File.join(root_dir, 'public', 'javascripts', 'redtip.js')
File.copy File.join(redtip_dir, 'stylesheets', 'redtip.css'), File.join(root_dir, 'public', 'stylesheets', 'redtip.css')
File.copy File.join(redtip_dir, 'images', 'closelabel.gif'), File.join(root_dir, 'public', 'images', 'closelabel.gif')