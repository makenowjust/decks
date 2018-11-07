require "ecr"

class Foo
  getter title

  def initialize(@title : String)
  end

  ECR.def_to_s "#{__DIR__}/foo.ecr"
end

puts Foo.new("hello world").to_s
