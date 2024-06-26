export function showHelp() {
  console.log(`
WC(1)                     BSD General Commands Manual                    WC(1)

NAME
  wc -- word, line, character, and byte count

SYNOPSIS
  wc [-clmw] [file ...]

DESCRIPTION
  The wc utility displays the number of lines, words, and bytes contained in each input file, or stan-
  dard input (if no file is specified) to the standard output.  A line is defined as a string of charac-
  ters delimited by a <newline> character.  Characters beyond the final <newline> character will not be
  included in the line count.

  A word is defined as a string of characters delimited by white space characters.  White space charac-
  ters are the set of characters for which the iswspace(3) function returns true.  If more than one
  input file is specified, a line of cumulative counts for all the files is displayed on a separate line
  after the output for the last file.

  The following options are available:

  -c      The number of bytes in each input file is written to the standard output.  This will cancel
          out any prior usage of the -m option.

  -l      The number of lines in each input file is written to the standard output.

  -m      The number of characters in each input file is written to the standard output.  If the current
          locale does not support multibyte characters, this is equivalent to the -c option.  This will
          cancel out any prior usage of the -c option.

  -w      The number of words in each input file is written to the standard output.

  When an option is specified, wc only reports the information requested by that option.  The order of
  output always takes the form of line, word, byte, and file name.  The default action is equivalent to
  specifying the -c, -l and -w options.

  If no files are specified, the standard input is used and no file name is displayed.  The prompt will
  accept input until receiving EOF, or [^D] in most environments.

ENVIRONMENT
  The LANG, LC_ALL and LC_CTYPE environment variables affect the execution of wc as described in
  environ(7).

EXIT STATUS
  The wc utility exits 0 on success, and >0 if an error occurs.
  `);
}
