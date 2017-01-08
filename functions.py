import subprocess
import re
from create_atlas_input import *

#atlas_dir="/home/ran/atlas_project/latest/atlasofliegroups/" 
#atlas_dir = "/home/cuiran/atlas_software/atlasofliegroups/" 


def to_atlas_input(user_input):
	request = str(user_input["request"])
	if (request == "Cartan") or (request == "Cartan Subgroups"):
		atlas_input = get_Cartans(user_input)
	else:
		atlas_input = "n=11"
	return atlas_input

def run_atlas(some_input):
	cmd = ["../atlas all"]
	p = subprocess.Popen(
		cmd,
		cwd=atlas_dir+"atlas-scripts",
		shell=True,
		universal_newlines=True,
		stdout=subprocess.PIPE,
		stderr=subprocess.PIPE,
		stdin=subprocess.PIPE)
	output,err=p.communicate(input=some_input)
	return output,err


