import subprocess

def get_atlas_output(atlas_input,atlas_dir):
    p = subprocess.Popen(["../atlas all"],
        cwd=atlas_dir+"atlas-scripts",
        shell=True,
        universal_newlines=True,
        stdin=subprocess.PIPE,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE)
    output,err = p.communicate(input=atlas_input)
    if not err:
        atlas_output=output
        return atlas_output
    else:
        return err
