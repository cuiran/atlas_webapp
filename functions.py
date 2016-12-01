import os

def input_to_at(some_input):
    modified_input = some_input.split('\\n')
    modified_input = "\n".join(modified_input)
    input_file = open("input_file.at","w")
    input_file.write(modified_input)
    input_file.close()
    return modified_input

def trim_output(some_output):
    output_array = some_output.split('\n')
    trimed_output = "\n".join(output_array[4:-3])
    return trimed_output