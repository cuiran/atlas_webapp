def set_group(user_input):
    if "n" in list(user_input.keys()):
        define_grp = (
            "set n="+user_input["n"]+"\n"+
            "set G="+user_input["group"]+"\n")
    else:
        define_grp = (
            "set p="+user_input["p"]+"\n"+
            "set q="+user_input["q"]+"\n"+
            "set G="+user_input["group"]+"\n")
    return define_grp


def get_atlasinput(user_input):
    if user_input['show'] in ['Cartan_Subgroups','Real_Weyl_Group']:
        define_grp = set_group(user_input)
        define_cartans = "set cartans = Cartan_classes(G)\n"
        print_all = "for i: nr_of_Cartan_classes(G) from 0 do print(\"Cartan number \"+i); print_Cartan_info(cartans[i]) od"
        atlas_input = define_grp+define_cartans+print_all
    else:
        atlas_input = "x=10"
    return atlas_input
