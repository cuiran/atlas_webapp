

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
