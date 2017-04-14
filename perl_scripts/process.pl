use strict;
use warnings;
 
my $filename = '/var/www/web_interface/atlas_app/perl_scripts/output.tmp';
#my $filename = '/var/www/web_interface2/atlas_app/output.tmp';
#my $filename = '/Users/rancui/Math/atlas_project/atlas_webapp/perl_scripts/output.tmp';
my $fh;
open($fh, '<:encoding(UTF-8)', $filename)
  or die "Could not open file '$filename' $!";
my $input_output;
while (my $row = <$fh>) {
    $input_output.= $row;
}

sub detect_type{
    my $io=shift;
    if ($io =~ /real_forms/m){
    process_real_forms($io);
    }elsif ($io =~ /cartans/m){
    process_cartans($io);
    }elsif ($io =~ /print_KGB/m){
    process_kgb($io);
    }else{
    print $io;
    }    
}


sub process_cartans{
    my $io=shift;
    my ($input,$output)=split("--divider--",$io);
#    print("<P>input=",$input);
#    print("<P>output=",$output);
    $output =~ s/.*CartanClass\]//s;  #cut off everything up to [CartanClass]
    $output =~ s/Value.*//s;  #cut off everything up to [CartanClass]
    $output =~ s/\n//g;        
    $output =~ s/"//g;        
 #   print("<P>output2=",$output);
    my @cartans = split("Cartan number ",$output);
    print "<P><strong>Cartan subgroups</strong><BR>";
    print "<P><Table border=1>";
    print "<tr>
<td>#&nbsp;</td>
<td>cpt&nbsp;</td>
<td>real&nbsp;</td>
<td>cx&nbsp;</td>
<td>orbit&nbsp;</td>
<td>fiber&nbsp;</td>
<td>SI&nbsp;&nbsp;&nbsp;</td>
<td>Im&nbsp;</td>
<td>Re&nbsp;</td>
<td>Cx&nbsp;&nbsp;&nbsp;</td>
<td>involution&nbsp;</td>
</tr>";

    # print "Cartans are:";
    # foreach my $cartan (@cartans){
    #   print "got $cartan";
    # }
    foreach my $cartan (@cartans){

my ($number,$compact,$complex,$split,$involution,$orbit_size,$fiber,$strong_inv,$imaginary,$real,$complex_factor)=
$cartan =~ /([0-9]*).*compact: *([0-9]*), complex: ([0-9]*), split: ([0-9]*)canonical twisted involution: (.*)twisted involution orbit size: ([0-9]*); fiber size: ([0-9]*); strong inv: ([0-9]*)imaginary root system: (.*)real root system: (.*)complex factor: (.*)/;

if (defined($number)){
    print "
<tr><td>$number</td>
<td>$compact</td>
<td>$split</td>
<td>$complex</td>
<td>$orbit_size</td>
<td>$fiber</td>
<td>$strong_inv</td>
<td>$imaginary</td>
<td>$real</td>
<td>$complex_factor</td>
<td>$involution</td>
</tr>";
}
    }

print "</table>";
print "<P><P><strong>Key:</strong><BR>
<table>
<tr><td align=right>#:</td><td width=10></td><td>Cartan number</td></tr>
<tr><td align=right>cpt:</td><td width=10></td><td>number of S<sup>1</sup> factors</td></tr>
<tr><td align=right>real:</td><td width=10></td><td>number of R<sup>x</sup> factors</td></tr>
<tr><td align=right>cx:</td><td width=10></td><td>number of C<sup>x</sup> factors</td></tr>
<tr><td align=right>orbit:</td><td width=10></td><td>size of W-conjugacy class of &theta; </td></tr>
<tr><td align=right>fiber:</td><td width=10></td><td>rank of fiber of map to twisted involution</td></tr>
<tr><td align=right>SI:</td><td width=10></td><td>number of strong involutions with same square as x</td></tr>
<tr><td align=right>Im:</td><td width=10></td><td>type of system of imaginary roots &Delta;<sup>&theta;</sup></td></tr>
<tr><td align=right>Re:</td><td width=10></td><td>type of system of real roots &Delta;<sup>-&theta;</sup> </td></tr>
<tr><td align=right>Cx:</td><td width=10></td><td>type of complex root system &Delta;<sup>C</sup></td></tr>
<tr><td align=right>involution:</td><td width=10></td><td>(twisted) involution &theta; of T</td></tr>
</table>"
}
sub process_real_forms{
    my $io=shift;
    my ($input,$output)=split("--divider--",$io);
    my @lines=split("\n",$output);
    print "Real forms in the given inner class of G:<P><P>";
    foreach my $line (@lines){
    if ($line =~ /group/){
        print($line,"<br>");
    }
    }
}

# 7:  2  [C,n]    5   8     *  10  (0,0)#2 1x2^e

sub process_kgb{
    my $io=shift;
    my ($input,$output)=split("--divider--",$io);
#    print("<P>input=",$input);
#    print("<P>output=",$output);
    $output =~ s/\n//g;        
    $output =~ s/.*\.//g;
#    print("<P>output2=",$output);
    my @kgb = split("[0-9]*:",$output);
    shift(@kgb);
#    foreach my $x (@kgb){ print("<BR>x=$x");}
    #do one step to get the rank
my ($l, $roots,$crossandcayley,$torus,$canonical,$cartan,$w)= $kgb[0] =~ 
    / *([0-9]*) *(\[.*\]) *([0-9 \*]*) *(\(.*\))(.)([0-9]*) *(.*)/;
    my @roots=split ',', $roots;
    my $rank=scalar(@roots);
#    print "rank=$rank";
    print "<div>";
    print "<table styletable { 
      border-spacing:10; 
      border-collapse:collapse;   
    }";
    print "<P><strong>K\\G/B</strong><BR>";
    print "<P><Table border=1 style=\"border-spacing: 10px;\">";

    print "<tr>
<td>#&nbsp;</td>
<td>l&nbsp;</td>
<td colspan=$rank>cross&nbsp;</td>
<td colspan=$rank>Cayley&nbsp;</td>
<td>torus&nbsp;</td>
<td>#&nbsp;</td>
<td>Cartan&nbsp;</td>
<td>w&nbsp;</td>
</tr>";



    for (my $i=0;$i<$#kgb;$i++){
    my $x=$kgb[$i];

my ($l, $roots,$crossandcayley,$torus,$canonical,$cartan,$w)= $x =~ 
    / *([0-9]*) *(\[.*\]) *([0-9 \*]*) *(\(.*\))(.)([0-9]*) *(.*)/;
#print "l=$l\n roots=$roots\n crossandcayley=$crossandcayley\ntorus=$torus\ncanonical=$canonical\ncartan=$cartan\nw=$w";
my @crossandcayley=split "\ +", $crossandcayley;
print "<tr>
<td>$i</td>
<td>$roots</td>";
    for my $c (@crossandcayley){
        print "<td>$c</td>";
    }
    print "<td>$torus</td><td>$canonical</td><td>$cartan</td><td>$w</td></tr>";
    }
print "</table>";
print "</div>";

print "<P><P><strong>Key:</strong><BR>
<table>
<tr><td align=right>#:</td><td width=10></td><td>KGB number</td></tr>
<tr><td align=right>roots:</td><td width=10></td><td>types of simple roots</td></tr>
<tr><td align=right>cross:</td><td width=10></td><td>Cross action of simple roots</td></tr>
<tr><td align=right>Cayley:</td><td width=10></td><td>Cayley transforms of simple roots</td></tr>
<tr><td align=right>torus:</td><td width=10></td><td>torus element</td></tr>
<tr><td align=right>#:</td><td width=10></td><td>distinguished involution on this Cartan</td></tr>
<tr><td align=right>Cartan:</td><td width=10></td><td>Cartan number</td></tr>
<tr><td align=right>w:</td><td width=10></td><td>(twisted) involution</td></tr>
</table>";
}





detect_type($input_output);

