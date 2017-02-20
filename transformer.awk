BEGIN {
  FS="\\|;"
}
{
  tag = "BAD";
  if ($1 == 1) {
    tag = "GOOD"
  }
  body = $3

  print "\"" tag  "\", \"" $3 """\""
}
