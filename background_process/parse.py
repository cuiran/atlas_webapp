import subprocess
import json

def perl_process(user_input,atlas_output,perl_scripts_dir):
    trimmed_out = trim(atlas_output)
    with open(perl_scripts_dir+'output.tmp','w') as f:
        f.write("{input:"+json.dumps(user_input)+",\noutput:"+json.dumps(trimmed_out)+"}")
    f.close()
    p = subprocess.Popen(["perl "+perl_scripts_dir+"process.pl"],
        shell=True,
        universal_newlines=True,
        stdin=subprocess.PIPE,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE)
    output,err = p.communicate()
    return output,err

def parse_output(user_input,atlas_output):
    if user_input['show']=='Cartan_Subgroups':
        parsed_out = trim(atlas_output)
    elif (user_input['show']=='Real_Weyl_Group') and (user_input['further']['Cartan']==""):
        parsed_out = get_cartan_options(atlas_output)
    elif user_input['show']=="":
        if user_input['rep'] == 'ds':
            if user_input['request'] == 'is_equal_rank':
                parsed_out = trim(atlas_output)
            elif user_input['request'] == 'rho':
                parsed_out = trim(atlas_output)
    elif user_input['show']=='Unitarity':
        parsed_out = trim(atlas_output)
    return parsed_out

def trim(atlas_output):
    lines = atlas_output.split('\n')
    trimmed_out = '\n'.join(lines[3:-2])
    return trimmed_out

def get_cartan_options(atlas_output):
    lines = atlas_output.split('\n')
    cartan_idx_inlines = [i for i,x in enumerate(lines) if x.startswith('"')]
    cartans = list()
    for i in range(len(cartan_idx_inlines)):
        cartans.append(lines[cartan_idx_inlines[i]][1:-1])
        cartans.append(lines[cartan_idx_inlines[i]+1])
    return cartans
