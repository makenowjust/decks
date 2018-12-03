def format_literal_elements(elements, prefix, suffix)
  slash_is_regex!
  write_token prefix
  has_newlines = false
  wrote_newline = false
  write_space_at_end = false
  next_needs_indent = false
  found_comment = false
  found_first_newline = false
  found_comment = skip_space
  if found_comment || @token.type == :NEWLINE
    # add one level of indentation for contents if a newline is present
    offset = @indent + 2
    if elements.empty?
      skip_space_or_newline
      write_token suffix
      return false
    end
    indent(offset) { consume_newlines }
    skip_space_or_newline
    wrote_newline = true
    next_needs_indent = true
    has_newlines = true
    found_first_newline = true
  else
    # indent contents at the same column as starting token if no newline
    offset = @column
  end
  elements.each_with_index do |element, i|
    current_element = element
    if current_element.is_a?(HashLiteral::Entry)
      current_element = current_element.key
    end
    # This is to prevent writing `{{` and `{%`
    if prefix == :"{" && i == 0 && !wrote_newline &&
       (@token.type == :"{" || @token.type == :"{{" || @token.type == :"{%" ||
       @token.type == :"%" || @token.raw.starts_with?("%"))
      write " "
      write_space_at_end = true
    end
    if next_needs_indent
      write_indent(offset, element)
    else
      indent(offset, element)
    end
    has_heredoc_in_line = !@lexer.heredocs.empty?
    last = last?(i, elements)
    found_comment = skip_space(offset, write_comma: (last || has_heredoc_in_line) && has_newlines)
    if @token.type == :","
      if !found_comment && (!last || has_heredoc_in_line)
        write ","
        wrote_comma = true
      end
      slash_is_regex!
      next_token
      found_comment = skip_space(offset, write_comma: last && has_newlines)
      if @token.type == :NEWLINE
        if last && !found_comment && !wrote_comma
          write ","
          found_comment = true
        end
        indent(offset) { consume_newlines }
        skip_space_or_newline
        next_needs_indent = true
        has_newlines = true
      else
        if !last && !found_comment
          write " "
          next_needs_indent = false
        elsif found_comment
          next_needs_indent = true
        end
      end
    end
  end
  finish_list suffix, has_newlines, found_comment, found_first_newline, write_space_at_end
end