# WC-Tool

A word is defined as a string of characters delimited by white space characters. White space charac-
ters are the set of characters for which the iswspace(3) function returns true. If more than one
input file is specified, a line of cumulative counts for all the files is displayed on a separate line
after the output for the last file.

The following options are available:

# -c

The number of bytes in each input file is written to the standard output. This will cancel
out any prior usage of the -m option.

# -l

The number of lines in each input file is written to the standard output.

# -m

The number of characters in each input file is written to the standard output. If the current
locale does not support multibyte characters, this is equivalent to the -c option. This will
cancel out any prior usage of the -c option.

# -w

The number of words in each input file is written to the standard output.

When an option is specified, wc only reports the information requested by that option. The order of
output always takes the form of line, word, byte, and file name. The default action is equivalent to
specifying the -c, -l and -w options.
