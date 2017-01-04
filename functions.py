import subprocess
import re

atlas_dir="/home/ran/atlas_project/latest/atlasofliegroups/" 
#atlas_dir = "/home/cuiran/atlas_software/atlasofliegroups/" 

# this function takes user request and make a file in tmp folder for atlas to use
# the return value of this function is user input formatted to be displayed on the website
def input_to_at(some_input, rand_int):
    modified_input = some_input.split('\\n')
    modified_input = "\n".join(modified_input)
    input_file = open("/tmp/input_file_"+rand_int+".at", "w")
    input_file.write(modified_input)
    input_file.close()
    return modified_input


def trim_output(some_output):
    output_array = some_output.split('\n')
    trimmed_output = "\n".join(output_array[4:-3])
    return trimmed_output


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

# take raw atlas output and parse it into a dictionary, with keys the Cartan numbers
# and content the Cartan infos
def parse_Cartan_list(atlas_output):
	Cartan_text_block = re.findall(r'\[CartanClass\](.*)Value',atlas_output,re.DOTALL)[0]
	Cartan_text_noquotes = Cartan_text_block.replace('"','')
	Cartan_text_list = Cartan_text_noquotes.split("Cartan")[1:]
	Cartan_text_list = [x.strip() for x in Cartan_text_list]
	Cartan_list = [x.split("\n") for x in Cartan_text_list]
	Cartan_list_json = list()
	for x in Cartan_list:
		Cartan_dict = dict()
		Cartan_dict["name"] = x[0]
		Cartan_dict["info"] = "\n".join(x[1:])
		Cartan_list_json.append(Cartan_dict)
	return Cartan_list_json
