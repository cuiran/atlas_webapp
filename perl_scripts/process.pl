use strict;
use warnings;
 
my $filename = '/var/www/web_interface/atlas_app/perl_scripts/output.tmp';
#my $filename = '/home/ran/atlas_project/atlas_webapp/perl_scripts/output.tmp';
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
    }elsif ($io =~ /menu_item:information_on_parameter/m){
	information_on_parameter($io);
    }elsif ($io =~ /menu_item:Branch_to_K/m){
	branch_to_K($io);
    }elsif ($io =~ /menu_item:composition_series/m){
	composition_series($io);
    }elsif ($io =~ /menu_item:character_formula/m){
	character_formula($io);
    }elsif ($io =~ /menu_item:unitarity/m){
	unitarity($io);
    }else{
	print "Default return value",$io;
    }    
}

#string passed: "input: ...output:...", split into  ($input,$output)
# $input includes ...set G=U(3,2).. .(for example) - extract U(3,2) from here
sub get_group_from_input{
    my $input =shift;
    $input =~ s/\\n/X/g;
    my ($group) = $input =~ /.*set G=([^X]*)X/;
    $group;
}


sub process_cartans{
    my $io=shift;
    print "io: $io";
    my ($input,$output)=split("output:",$io);
    $input =~ s/.*input://;
    $output =~ s/\}$//;
    show_input($input);
    print "<h4>Atlas Output</h4>";
#    print("<P>output=",$output);
    $output =~ s/.*CartanClass\]//s;  #cut off everything up to [CartanClass]
    $output =~ s/Value.*//s;  #cut off everything up to [CartanClass]
    $output =~ s/\\n//g;        
    $output =~ s/"//g;        
#    print("<P>output2=",$output);
    my @cartans = split("Cartan number ",$output);


    print "<P><strong>Cartan subgroups</strong>
<a href=http://www.liegroups.org/software/documentation/atlasofliegroups-docs/tutorial/video_1B/cartan_classes.html>(More Information)</a>
";

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
<td><a onclick=cartanTip1($number)>$number</td>
<td><a onclick=cartanTipCompact($number,$compact)>$compact</td>
<td><a onclick=cartanTipSplit($number,$split)>$split</td>
<td><a onclick=cartanTipComplex($number,$complex)>$complex</td>
<td><a onclick=cartanTipOrbit($orbit_size)>$orbit_size</td>
<td><a onclick=cartanTipFiber($fiber)>$fiber</td>
<td><a onclick=cartanTipStrongInvolution($strong_inv)>$strong_inv</td>
<td><a onclick=cartanTipRootsIm($number,'$imaginary')>$imaginary</td>
<td><a onclick=cartanTipRootsReal($number,'$real')>$real</td>
<td><a onclick=cartanTipRootsComplex($number,'$complex_factor')>$complex_factor</td>
<td><a onclick=cartanTip3($number,'$involution')>$involution</td></tr>
</tr>";
}
    }

#cartanTip7(number, imagSystem, realSystem, systemType) {


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
<LI>Im: type of system of imaginary roots  &Delta;<sup>&theta;</sup> 
<LI>Re: type of system of real roots &Delta;<sup>-&theta;</sup> 
<LI>Cx: type of root system &Delta;<sup>C</sup>  -- this root system, of complex type, 
is a subset of the complex roots (those roots which are neither real nor imaginary), 
see Vogan, Proposition 3.12, p. 959 in Duke Math J. 49:4 (1982).
<LI>involution: (twisted) involution &theta; of T
</UL>";
}
sub process_real_forms{
    my $io=shift;
    my ($input,$output)=split("output:",$io);
    $input =~ s/.*input://;
    $output =~ s/\}$//;
    $output =~ s/\\n/X/g;
    show_input($input);
    print "<h4>Atlas Output</h4>";
    my @lines=split("X",$output);
    print "<strong>Real forms in the given inner class of G</strong>
<a href=http://www.liegroups.org/software/documentation/atlasofliegroups-docs/tutorial/video_1B/real_groups.html>(More Information)</a><P><P>";
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
#    print "io=", $io,"<P>";
    my ($input,$output)=split("output:",$io);
    $input =~ s/.*input://;
    $output =~ s/\}$//;
#    print("<P>input=",$input);
#    print("<P>output=",$output);
    my $group=$input;
    $group =~ s/.*G=//;
    $group =~ s/\\n.*//g;
#    $output =~ s/\\n//g;
#    print("<P>output=",$output);
    my ($output_kgb,$output_graph)=split("KGB_graph",$output);
    $output_graph =~ s/kgbsize:[ 0-9]*//;
    $output_graph =~ s/\\n/\n/g;
    $output_graph =~ s/\\"/\"/g;
#    print("<P>output_kgb:",$output_kgb);
#    print("<P>output_graph:",$output_graph);
    show_input($input);
    print "<h4>Atlas Output</h4>";

#now write and process the KGB graph
    my $kgb_graph_dir="/var/www/web_interface/atlas_app/static/kgb_graphs";
    my $rand=int(rand(1000000));
    my $dot_file="KGB_graph_$rand".".dot";
    $dot_file =~ s/ /_/g;
    my $jpg_file="KGB_graph_$rand".".jpg";
    $jpg_file=~ s/ /_/g;
    print "<strong>K orbits on G/B</strong> <a href=http://www.liegroups.org/software/documentation/atlasofliegroups-docs/tutorial/K_orbits_on_G_B.html>(More Information)</a><P>";
    print "<fonts size=+1><strong>Graph of closure relations for K\\G/B, G=", $group,"<P>",
"<a href=\"static/kgb_graphs/$jpg_file\"  download=\"$jpg_file\">Download Graph</a><P>";
print "</strong></fontsize><P>";


    open(OUTPUT,">$kgb_graph_dir/$dot_file")|| die("can't open dot file");
    print OUTPUT $output_graph;
    close(OUTPUT);
    `dot -Tjpg $kgb_graph_dir/$dot_file -o$kgb_graph_dir/$jpg_file`;
    print "<IMG SRC=static/kgb_graphs/$jpg_file -height=\"200\", width=\"200\"><P><P>";



    $output_kgb =~ s/\n//g;        
    $output_kgb =~ s/.*\.//g;
#    print("<P>output2=",$output_kgb);
    my @kgb = split("[0-9]*:",$output_kgb);
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
    print "<tr><td>#&nbsp;</td><td>l&nbsp;</td><td>roots&nbsp;</td><td colspan=$rank>cross&nbsp;</td><td colspan=$rank>Cayley&nbsp;</td><td>torus&nbsp;</td><td>#&nbsp;</td><td>Cartan&nbsp;</td><td>w&nbsp;</td></tr>";



    for (my $i=0;$i<$#kgb;$i++){
    my $x=$kgb[$i];

my ($l, $roots,$crossandcayley,$torus,$canonical,$cartan,$w)= $x =~ 
    / *([0-9]*) *(\[.*\]) *([0-9 \*]*) *(\(.*\))(.) *([0-9]*) *(.*) */;
    $w =~ s/ //g;
    $w =~ s/\\n//;
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
    my $root_texts=join '\',\'', @root_texts;
#    <a onclick="kgbTip4(3, 0, ['complex','noncompact imaginary','complex'])">[C,n,C]</a>    
    my $roots_text="<a onclick=\"kgbTip4($rank,$i, ['".$root_texts."'])\">$roots</a>";
print "<tr>
<td><a onclick=kgbTip1($i)>$i</td>
<td><a onclick=kgbTip2($l,$i)>$l</td>
<td>$roots_text</td>";
    for my $j (0..$rank-1){
	my $c=$crossandcayley[$j];
        print "<td><a onclick=\"kgbTip5($j, $i, $c)\">$c</a></td>";
    }
    for my $j ($rank..2*$rank-1){
	my $c=$crossandcayley[$j];
	my $corminus1= $c;
	$corminus1 =~ s/\*/\-1/g;
        print "<td><a onclick=\"kgbTip6($j, $i, $corminus1)\">$c</a></td>";

    }

    my $canonical_string;
    if ($canonical eq "#"){
	$canonical_string = "<a onclick=\"kgbTipsharp($i,1,$cartan,'$w')\">#</a>";
    }else{
	$canonical_string="";
    }
    print "<td>$torus</td><td>$canonical_string</td>
<td><a onclick=\"kgbTip3($cartan,$i)\">$cartan</a></td>
<td><a onclick=kgbTip7('$w',0)>$w</td></tr>";
    }
print "</table>";
print "</div>";

print "<P><P><strong>Key:</strong><BR>
<UL>
<LI>\#: KGB number</LI>
<LI>l: length of orbit </LI>
<LI>roots: types of simple roots</LI>
<LI>cross: types of simple roots</LI>
<LI>Cayley: Cayley transforms of simple roots
<LI>torus: torus element
<LI>\#: canonical involution on this Cartan
<LI>Cartan: Cartan number
<LI>w:(twisted) involution
</UL>";


}

#set n=4\\nset G=SL(n,R)\\ndistinguished_involution(G)\\n\"\n--divider--\nVariable n: int\nVariable G: RealForm\nValue: \n| 1, 0, 0 |\n| 1, 0, -1 |\n| 1, -1, 0 |\n"

sub process_di{
    my $io=shift;
    my ($input,$output)=split("output:",$io);
    $input =~ s/.*input://;
    $output =~ s/\}$//;
    show_input($input);
    print "<h4>Atlas Output</h4>";

    print "<P><strong>Distinguished Involution</strong>
<a href=http://www.liegroups.org/software/documentation/atlasofliegroups-docs/tutorial/video_1B/real_forms.html?highlight=distinguished>(More Information)<BR>";
    $output =~ s/\\n//g;        
    $output =~ s/\"//g;
    $output =~ s/.*Value://g;
    my @rows=split('\| *\|',$output);

    my @matrix;
    foreach my $row (@rows){
	$row =~ s/\|//g;
	my @row= split ',', $row;
	push @matrix, join "&", @row;
    }

    print "<P>\$\\begin{pmatrix}";
    print join "\\\\", @matrix;
    print "\\end{pmatrix}\$";

    print "
<script type=\"text/x-mathjax-config\">
MathJax.Hub.Config({tex2jax: {inlineMath: [['$','$'], ['\\(','\\)']]}});
</script>
<script type=\"text/javascript\" async
src=\"https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS_CHTML\">
</script>";




}

sub process_simple_roots{
    my $io=shift;
    my ($input,$output)=split("output:",$io);
    $input =~ s/.*input://;
    $output =~ s/\}$//;
    show_input($input);
    print "<h4>Atlas Output</h4>";
    print("<P>output=",$output);
    print "<P><strong>Simple Roots:</strong> (the <em>columns</em> of the matrix):<P>";
    $output =~ s/\\n//g;        
    $output =~ s/\"//g;        
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
    my ($input,$output)=split("output:",$io);
    $input =~ s/.*input://;
    $output =~ s/\}$//;
    show_input($input);
    print "<h4>Atlas Output</h4>";
#    print("<P>output=",$output);
    print "<P><strong>Real Weyl Group W<sub>R</sub>:</strong>
<a href=
<BR>";
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

sub information_on_parameter{
    my $io=shift;
    my ($input,$output)=split("output:",$io);
    $input =~ s/.*input://;
    my $group =get_group_from_input($input);
    $output =~ s/\}$//;
#    print "<P>OUTPUT=", $output,"<P>";
    show_input($input);
    print "<h4>Atlas Output</h4>";
    print "<strong>Information about the parameter for G=$group</strong>
<a href=http://www.liegroups.org/software/documentation/atlasofliegroups-docs/tutorial/video_2A/parameters.html>(More Information)</a><P>
";

#    print("<P>output=",$output,"<P>");
 

    my ($menu_item,$n,$p,$q,$G,$group,$x,$x_K,$rho_K,$param,$parameter,$infinitesimal_character,$lkt,$lkt_dimension);
    $output =~ s/\\n/X/g;
    $output =~ s/\"//g;
    my @data = split "X", $output;
#    print "size:", scalar(@data);
#    print join "<P>", @data;
    if (scalar(@data)==12){
	($menu_item,$n,$G,$group,$x,$x_K,$rho_K,$param,$parameter,$infinitesimal_character,$lkt,$lkt_dimension)=@data;
    }	elsif(scalar(@data)==13){
	($menu_item,$p,$q,$G,$group,$x,$x_K,$rho_K,$param,$parameter,$infinitesimal_character,$lkt,$lkt_dimension)=@data;
	}else{
	    print("Not a valid discrete series parameter");exit();
	}

    if ($input =~ /dsparam/){
	print("This representation is in the discrete series<P>")
    };

    $parameter=~ s/.*\(//;
    $parameter=~ s/\).*//;
    my ($x,$lambda,$nu) = $parameter =~ /.*x=([0-9]*).*lambda=(.*),nu=(.*)/;
    print("<P><strong>p=</strong>parameter(",$x,",",$lambda,",",$nu,")<BR>");
    print("<strong>x</strong>=",$x,"<BR>");
    print("<strong>lambda</strong>=",$lambda,"<BR>");
    print("<strong>nu</strong>=",$nu,"<BR>");
    $infinitesimal_character =~ s/.*=//g;
    print("<strong>infinitesimal character</strong>: ", $infinitesimal_character,"<BR>");
    $x_K =~ s/.*=//;
    $rho_K =~ s/.*=//;
    print("<strong>x_K=</strong>", $x_K,"<BR>");
    print("<strong>rho_K=</strong>", $rho_K,"<BR>");
    $lkt =~ s/.*\[//;
    $lkt =~ s/\].*//;
    print("<strong>Lowest K-type</strong>: [", $lkt,"]<BR>");
    $lkt_dimension =~ s/.*://g;
    print("<strong>Dimension of lowest K-type</strong>: ", $lkt_dimension,"<BR>");


}

sub composition_series{
    my $io=shift;
    my ($input,$output)=split("output:",$io);
    $input =~ s/.*input://;
    $output =~ s/\}$//;
    show_input($input);
    print "<h4>Atlas Output</h4>";
    $output =~ s/\\n/X/g;
    $output =~ s/\"//g;
    my ($preamble,$cs)=split 'Value:', $output;
#    print "preamble=", $preamble,"<P>";
#    print "cs=", $cs;
    my ($menu_item,$n,$G,$junk,$parameter)= split 'X', $preamble;

    $parameter=~ s/.*\(//;
    $parameter=~ s/\).*//;
    my ($x,$lambda,$nu) = $parameter =~ /.*x=([0-9]*).*lambda=(.*),nu=(.*)/;
    print("<P><strong>p=</strong>parameter(",$x,",",$lambda,",",$nu,")<BR>");
    print("<strong>x</strong>=",$x,"<BR>");
    print("<strong>lambda</strong>=",$lambda,"<BR>");
    print("<strong>nu</strong>=",$nu,"<BR>");
    
    my @terms= split 'X', $cs;
    print "<strong>Composition Series</strong><P>";
    print "<table border=1><tr><td>mult</td><td>x</td><td>lambda</td><td>nu</td></tr>";
    foreach my $term (@terms){
	my ($mult,$x,$lambda,$nu)= $term =~ /([0-9]*).*x=([0-9]*).*lambda=(.*)nu=(.*)/;
	next unless ($mult);
	print "<tr><td>$mult</td><td>$x</td><td>$lambda</td><td>$nu</td</tr>";
    }
    print "</table>";
    print "<P><P><strong>Key:</strong><BR>
<UL>
<LI>(x,lambda,nu): parameter for irreducible module 
<LI>mult: multiplicity irreducible module (x,lambda,nu) in composition series of p
</UL>";
}

sub character_formula{
    my $io=shift;
    my ($input,$output)=split("output:",$io);
    $input =~ s/.*input://;
    $output =~ s/\}$//;
    show_input($input);
    print "<h4>Atlas Output</h4>";
    $output =~ s/\\n/X/g;
    $output =~ s/\"//g;
    my ($preamble,$cs)=split 'Value:', $output;
#    print "preamble=", $preamble,"<P>";
#    print "cs=", $cs;
    my ($menu_item,$n,$G,$junk,$parameter)= split 'X', $preamble;

    $parameter=~ s/.*\(//;
    $parameter=~ s/\).*//;
    my ($x,$lambda,$nu) = $parameter =~ /.*x=([0-9]*).*lambda=(.*),nu=(.*)/;
    print("<P><strong>p=</strong>parameter(",$x,",",$lambda,",",$nu,")<BR>");
    print("<strong>x</strong>=",$x,"<BR>");
    print("<strong>lambda</strong>=",$lambda,"<BR>");
    print("<strong>nu</strong>=",$nu,"<BR>");
    
    my @terms= split 'X', $cs;
    print "<strong>Character Formula</strong><P>";
    print "<table border=1><tr><td>mult</td><td>x</td><td>lambda</td><td>nu</td></tr>";
    foreach my $term (@terms){
	my ($mult,$x,$lambda,$nu)= $term =~ /([0-9-]*).*x=([0-9]*).*lambda=(.*)nu=(.*)/;
	next unless ($mult);
	print "<tr><td>$mult</td><td>$x</td><td>$lambda</td><td>$nu</td</tr>";
    }
    print "</table>";
    print "<P><P><strong>Key:</strong><BR>
<UL>
<LI>(x,lambda,nu): parameter for standard  module
<LI>mult: multiplicity of standard module (x,lambda,nu) in composition series of p
</UL>";
}


sub branch_to_K{
    my $io=shift;
    my ($input,$output)=split("output:",$io);
    $input =~ s/.*input://;
    $output =~ s/\}$//;
    show_input($input);
    print "<h4>Atlas Output</h4>";
    print "<strong>Branch of irreducible representation to K</strong><P>";
#    print("<P>output=",$output,"<P>");
    if ($output =~ /Undefined/){
	print("Not a valid discrete series parameter");exit();
    }


    $output =~ s/\\n/X/g;
    $output =~ s/\"//g;
    my ($preamble,$ktypes)=split 'Value:', $output;
    
    my @preamble_data = split 'X', $preamble;
#    print "size:", scalar(@preamble_data);
#    print "<P>Preamble data:", join "<P>", @preamble_data,"<P>";
    my ($menu_item, $n,$p,$q, $G, $group, $Variable_x_K, $x_K, $rho_K, $var_dsparam,$dsparam);
    if (scalar(@preamble_data)==9) {
	($menu_item, $n, $G, $group, $Variable_x_K, $x_K, $rho_K, $var_dsparam,$dsparam) = split 'X', $preamble;
    }elsif (scalar(@preamble_data)==10){
    ($menu_item, $p,$q, $G, $group, $Variable_x_K, $x_K, $rho_K, $var_dsparam,$dsparam) = split 'X', $preamble;
    }else{
	print "Error parsing output";
    }
	
    my @data = split "X", $ktypes;
#    print("data:", join "<P>", @data);

    my ($s,$x,$lambda,$dim,$height);

        $x_K =~ s/.*=//;
    $rho_K =~ s/.*=//;
    
    $dsparam =~ s/.*final //;

    if ($input =~ /dsparam/){
	print("This representation is in the discrete series<P>")
    };

    print("<P><strong>p=</strong>$dsparam","<BR>");

    print("<strong>x_K=</strong>", $x_K,"<BR>");
    print("<strong>rho_K=</strong>", $rho_K,"<BR>");

print "<style>table{border:1px solid black;}td{padding:5px; border:1px solid black;}</style>";
    print("<TABLE BORDER=1><TR><TD>mult.</TD><TD>lambda</TD><TD>dim</TD><TD>height</TD></TR>");
    foreach my $line (@data){
	next unless ($line =~ /KGB/);
	my ($s,$x,$lambda,$dim,$height) =
	    $line =~ / *\((.*)\)\*.*\#([0-9]*),(.*)\) *([0-9]*) *([0-9]*).*/;
	$s =~ s/\+.*//g;
	print "<TR><TD>$s</TD><TD>$lambda</TD><TD>$dim</TD><TD>$height</TD></TR>";
    }
    print("</TABLE>");
    print "<P><P><strong>Key:</strong><BR>
<UL>
<LI>x_K: KGB element determining the positive roots of K
<LI>rho_K: one-half the sum of the positive roots of K
<LI>mult: multiplicity of the K-type</LI>
<LI>lambda: highest weight</LI>
<LI>dimension</LI>
<LI>height</LI>
</UL>";

}

sub unitarity{
    my $io=shift;
    my ($input,$output)=split("output:",$io);
    $input =~ s/.*input://;
    $output =~ s/\}$//;
    show_input($input);
    print "<h4>Atlas Output</h4>";
#    print("<P>output=",$output,"<P>");

#output="menu_item:unitarity\nVariable n: int\nVariable G: RealForm\nVariable dsparam: Param\nValue: final parameter(x=0,lambda=[2]/1,nu=[0]/1)\nValue: true"
    $output =~ s/\\n/X/g;
    $output =~ s/\"//g;
    my ($preamble,$parameter,$unitary)=split 'Value:', $output;
#    print "preamble:", $preamble,"<P>";
    my @preamble_data = split 'X', $preamble;

    my ($menu_item,$n,$p,$q,$G,$junk);
    if (scalar(@preamble_data)==4) {
    my ($menu_item,$n,$G,$junk,$parameter)= split 'X', $preamble;
    }elsif (scalar(@preamble_data)==6){
    my ($menu_item,$p,$q,$G,$junk,$parameter)= split 'X', $preamble;
    }else{
	print "Error parsing output";
    }

    $parameter=~ s/.*\(//;
    $parameter=~ s/\).*//;
    my ($x,$lambda,$nu) = $parameter =~ /.*x=([0-9]*).*lambda=(.*),nu=(.*)/;
    print("<P><strong>p=</strong>parameter(",$x,",",$lambda,",",$nu,")<BR>");
    print("<strong>x</strong>=",$x,"<BR>");
    print("<strong>lambda</strong>=",$lambda,"<BR>");
    print("<strong>nu</strong>=",$nu,"<BR>");
    if ($unitary="true"){
	print "This representation is unitary."}else{
	print "This representation is <strong>not</strong> unitary."}
}

sub show_input{
    my $input=shift;
    $input =~ s/.*menu_item:[a-zA-Z_\\]*\"\)//;
    $input =~ s/\\n/<br>/g;
    $input =~ s/\\\"/\"/g;
    $input =~ s/\",$//;
#    print "<h4>Atlas Code</h4>";
#    print "<em>This is the atlas code which was run</em>:<br>";
    $input =~ 
    print "START INPUT".$input."END INPUT";

}




detect_type($input_output);

