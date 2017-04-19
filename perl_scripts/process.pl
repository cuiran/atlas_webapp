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
    }elsif ($io =~ /distinguished_involution/m){
	process_di($io);
    }elsif ($io =~ /simple_roots/m){
	process_simple_roots($io);
    }elsif ($io =~ /print_real_Weyl/m){
	process_print_real_weyl($io);
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

print "<style>
table{border:1px solid black;}td{padding:5px; border:1px solid black;}</style>";
    print "<P><Table>";
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
<UL>
<LI>#: Cartan number
<LI>cpt: number of S<sup>1</sup> factors
<LI>real: number of R<sup>x</sup> factors
<LI>cx: number of C<sup>x</sup> factors
<LI>orbit: size of W-conjugacy class of &theta; 
<LI>fiber: rank of fiber of map to twisted involution
<LI>SI: number of strong involutions with same square as x
<LI>Im: type of system of imaginary roots &Delta;<sup>&theta;</sup>
<LI>Re: type of system of real roots &Delta;<sup>-&theta;</sup> 
<LI>Cx: type of complex root system &Delta;<sup>C</sup>
<LI>involution: (twisted) involution &theta; of T
</UL>";
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
    print "<script src=../static/js/wz_tooltip.js></script>";
    print "<script src=../static/js/structurePopups.js></script>";
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
    / *([0-9]*) *(\[.*\]) *([0-9 \*]*) *(\(.*\))(.) *([0-9]+) *(.*)/;
    my @roots=split ',', $roots;
    my $rank=scalar(@roots);
#    print "rank=$rank";

print "<style>table{border:1px solid black;}td{padding:5px; border:1px solid black;}</style>";

    print "<P><Table>";
    print "<tr><td>#&nbsp;</td><td>l&nbsp;</td><td colspan=$rank>cross&nbsp;</td><td colspan=$rank>Cayley&nbsp;</td><td>torus&nbsp;</td><td>#&nbsp;</td><td>Cartan&nbsp;</td><td>w&nbsp;</td></tr>";



    for (my $i=0;$i<$#kgb;$i++){
    my $x=$kgb[$i];

my ($l, $roots,$crossandcayley,$torus,$canonical,$cartan,$w)= $x =~ 
    / *([0-9]*) *(\[.*\]) *([0-9 \*]*) *(\(.*\))(.) *([0-9]*) *(.*) */;
    $w =~ s/ //g;
#print "l=$l\n roots=$roots\n crossandcayley=$crossandcayley\ntorus=$torus\ncanonical=$canonical\ncartan=$cartan\nw=$w";
    my @crossandcayley=split "\ +", $crossandcayley;
    my @roots= split ',', $roots;
    my @root_texts;
    foreach my $i (0..$#roots){
	my $root = $roots[$i];
	$root =~ s/\[|\]//g;
	if ($root eq 'C'){
	    push @root_texts,"complex";
	}elsif 
	    ($root eq 'n'){
	    push @root_texts,"noncompact imaginary";
	}elsif 
	    ($root eq 'c'){
	    push @root_texts,"compact imaginary";
	}elsif 
	    ($root eq 'r'){
	    push @root_texts,"real";
	}else{
	    push @root_texts,"other";
	}
	    
    }
#    <a onclick="kgbTip4(3, 0, ['complex','noncompact imaginary','complex'])">[C,n,C]</a>    
    my $roots_text="<a onclick=\"kgTip4(3,0, ['".join "'", @root_texts."'])\">$roots</a>";
print "<tr>
<td><a onclick=kgbTip1($i)>$i</td>
<td>$roots_text</td>";
    for my $c (@crossandcayley){
        print "<td>$c</td>";
    }
    print "<td>$torus</td><td>$canonical</td><td>$cartan</td><td><a onclick=kgbTip7('$w',0)>$w</td></tr>";
    }
print "</table>";
print "</div>";
print "<P><P><strong>Key:</strong><BR>
<UL>
<LI>#: Cartan number
<LI>cpt: number of S<sup>1</sup> factors
<LI>real: number of R<sup>x</sup> factors
<LI>cx: number of C<sup>x</sup> factors
<LI>orbit: size of W-conjugacy class of &theta; 
<LI>fiber: rank of fiber of map to twisted involution
<LI>SI: number of strong involutions with same square as x
<LI>Im: type of system of imaginary roots &Delta;<sup>&theta;</sup>
<LI>Re: type of system of real roots &Delta;<sup>-&theta;</sup> 
<LI>Cx: type of complex root system &Delta;<sup>C</sup>
<LI>involution: (twisted) involution &theta; of T
</UL>";
}

#set n=4\\nset G=SL(n,R)\\ndistinguished_involution(G)\\n\"\n--divider--\nVariable n: int\nVariable G: RealForm\nValue: \n| 1, 0, 0 |\n| 1, 0, -1 |\n| 1, -1, 0 |\n"

sub process_di{
    my $io=shift;
    my ($input,$output)=split("--divider--",$io);
#    print("<P>output=",$output);
    print "<P><strong>Distinguished Involution:</strong><BR>";
    $output =~ s/\n//g;        
    $output =~ s/.*Value://g;
    my @rows=split('\| *\|',$output);
print "<style>table{border:1px solid black;}td{padding:5px;}</style>";
    print "<table>";
    foreach my $row (@rows){
	print "<tr>";
	$row =~ s/\|//;
	my @entries=split(',',$row);
	foreach my $x (@entries){
	    print "<td>$x</td>";
	}
	print "</tr>";
    }
    print "</table>";

}

sub process_simple_roots{
    my $io=shift;
    my ($input,$output)=split("--divider--",$io);
#    print("<P>output=",$output);
    print "<P><strong>Simple Roots:</strong><BR>";
    print "(are the <em>columns</em> of the matrix:)<BR>";
    $output =~ s/\n//g;        
    $output =~ s/.*Value://g;
    my @rows=split('\| *\|',$output);
print "<style>table{border:0px solid black;}td{padding:5px;}</style>";
    print "<table>";
    foreach my $row (@rows){
	print "<tr>";
	$row =~ s/\|//;
	my @entries=split(',',$row);
	foreach my $x (@entries){
	    print "<td>$x</td>";
	}
	print "</tr>";
    }
    print "</table>";

}

#real weyl group is W^C.((A.W_ic) x W^R), where:\n
#W^C is trivial\nA is trivial\nW_ic is trivial\nW^R is trivial

sub process_print_real_weyl{
    my $io=shift;
    my ($input,$output)=split("--divider--",$io);
#    print("<P>output=",$output);
    print "<P><strong>Real Weyl Group W<sub>R</sub>:</strong><BR>";
    print "W<sub>R</sub>=N<sub>G(R)</sub>(H(R))/H(R)<BR>";
    print "W<sub>R</sub>&cong;W<sup>C</sup>&ltimes;((A&times;W<sub>ic</sub>) x W<sup>R</sup>)<P>";
    $output =~ s/\n//g;        
    $output =~ s/.*where://g;
#    print "output:$output\n";
    my ($WC,$A,$Wic,$WR) = $output =~ /W\^C(.*)A(.*)W_ic(.*)W\^R(.*)generators.*/;
    print "W<sup>C</sup>: $WC<BR>";
    print "A: $A<BR>";
    print "W<sub>ic</sub>: $Wic<BR>";
    print "W<sup>R</sup>: $WR<BR>";

}





detect_type($input_output);

