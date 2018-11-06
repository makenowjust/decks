macro new(node)
  #<loc:{{node.filename}},{{node.line_number}},{{node.column_number}}>{{node}}.new
end

new BadType