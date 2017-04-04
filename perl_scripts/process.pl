use strict;
use warnings;
 
my $filename = '/var/www/web_interface/atlas_app/output.tmp';
open(my $fh, '<:encoding(UTF-8)', $filename)
  or die "Could not open file '$filename' $!";
my $io;
while (my $row = <$fh>) {
    $io.= $row;
}

sub detect_type{
    my $io=shift;
    if ($io =~ /real_forms/m){
	process_real_forms($io);
    }else{
	print "NOT FOUND";
    }    
}

sub process_real_forms{
    my $io=shift;
    my ($input,$output)=split("--divider--",$io);
    my @lines=split("\n",$output);
    print "<table>";
    foreach my $line (@lines){
	print "<tr><td>$line</td></tr>";
    }
    print "</table>";
}



detect_type($io);

 
while (my $row = <$fh>) {
  chomp $row;
  print "$row\n";
}

print("done");


