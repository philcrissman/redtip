module RedtipHelper
  @@c = 0
  
  def link_to_redtip(name, id, html_options = {})
    @uses_redtip = true
    @@c += 1
    html_options.merge!({:id => "redtip_link_#{@@c}"})
    offsetTop = html_options[:offsetTop] || 25
    offsetLeft = html_options[:offsetLeft] || 0
    link_to_function name, "RedTip.showTip('#{id.to_s}', 'redtip_link_#{@@c}', {offsetTop: #{offsetTop}, offsetLeft: #{offsetLeft} })", html_options
  end
  
  def link_to_close_redtip(name, html_options = {})
    @uses_redtip = true
    link_to_function name, 'RedTip.close()', html_options
  end
  
  def button_to_close_redtip(name, html_options = {})
    @uses_redtip = true
    button_to_function name, 'RedTip.close()', html_options
  end  
  
  def link_to_dropdown(name, id, html_options = {})
    @uses_redtip = true
    @@c += 1
    html_options.merge!({:id => "redtip_link_#{@@c}"})
    offsetTop = html_options[:offsetTop] || 25
    offsetLeft = html_options[:offsetLeft] || 0
    width = html_options[:width] || 100
    link_to_function name, "RedTip.showDropDown('#{id.to_s}', 'redtip_link_#{@@c}',  {offsetTop: #{offsetTop}, offsetLeft: #{offsetLeft}, width: #{width} })", html_options
  end
end
