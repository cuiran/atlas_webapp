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
    if user_input['show'] == 'Cartan_Subgroups':
        define_grp = set_group(user_input)
        define_cartans = "set cartans = Cartan_classes(G)\n"
        print_all = "for i: nr_of_Cartan_classes(G) from 0 do print(\"Cartan number \"+i); print_Cartan_info(cartans[i]) od"
        atlas_input = define_grp+define_cartans+print_all
    elif user_input['show'] == 'Real_Weyl_Group':
        if user_input['further']['Cartan']!="":
            define_grp = set_group(user_input)
            set_Cartan = "set H=Cartan_class(G,"+str(user_input['further']['Cartan'])+")\n"
            print_all = "print_real_Weyl(G,H)\n"
            atlas_input = define_grp+set_Cartan+print_all
        else:
            define_grp = set_group(user_input)
            define_cartans = "set cartans = Cartan_classes(G)\n" 
            print_all = "for i: nr_of_Cartan_classes(G) from 0 do print(\"Cartan number \"+i); print_Cartan_info(cartans[i]) od"
            atlas_input = define_grp+define_cartans+print_all
    elif user_input['show'] == 'Real_Forms':
        define_grp = set_group(user_input)
        define_real_forms = "set rf = real_forms(G)\n"
        print_all = "for a in rf do prints(a) od"
        atlas_input = define_grp+define_real_forms+print_all
    elif user_input['show'] == 'Distinguished_Involution':
        define_grp = set_group(user_input)
        show_dist_inv = "distinguished_involution(G)\n"
        atlas_input = define_grp+show_dist_inv
    elif user_input['show'] == 'Simple_Roots':
        define_grp = set_group(user_input)
        show_simple_roots = "simple_roots(G)\n"
        atlas_input = define_grp+show_simple_roots
    elif user_input['show'] == 'KGB_Elements':
        define_grp = set_group(user_input)
        print_KGB = "print_KGB(G)\n"
        print_KGB_graph = "prints(\"KGB_graph\")\nprint_KGB_graph(G)\n"
        atlas_input = define_grp+print_KGB+print_KGB_graph
    elif user_input['show'] == '':
        if user_input['rep'] == 'ds':
            if user_input['request'] == 'is_equal_rank':
                define_grp = set_group(user_input)
                equalrk = "is_equal_rank(G)\n"
                atlas_input = define_grp+equalrk
            elif user_input['request'] == 'rho':
                define_grp = set_group(user_input)
                get_rho = "rho(G)\n"
                atlas_input = define_grp+get_rho
        elif user_input['rep'] == 'spherical_ps':
            if user_input['request'] == 'is_split':
                define_grp = set_group(user_input)
                split = "is_split(G)\n"
                atlas_input = define_grp+split
            elif user_input['request'] == 'rho':
                define_grp = set_group(user_input)
                get_rho = "rho(G)\n"
                atlas_input = define_grp+get_rho
    elif user_input['show'] == 'information_on_parameter':
        if user_input['rep'] == 'ds':
            command = "prints(\"menu_item:information_on_parameter\")\n"
            define_grp = set_group(user_input)
            print_grp = "prints(\"group:\",G)\n"
            ds_param_text = user_input['dsparam']
            ds_param = list()
            for i in range(len(ds_param_text)):
                ds_param.append(int(ds_param_text[i]))
            set_dsparam = "set dsparam=discrete_series(G,"+str(ds_param)+")\n"
            parameter = "prints(\"parameter=\", dsparam)\n"
            inf_char = "prints(\"infinitesimal character=\", infinitesimal_character(dsparam))\n"
            lkt="prints(\"LKT:\", highest_weights(LKT(dsparam))[0])\n"
            lkt_dim="prints(\"LKT_dimension:\", dimension(highest_weights(LKT(dsparam))[0]))\n"
            atlas_input = command+define_grp+print_grp+set_dsparam+parameter+inf_char+lkt+lkt_dim
    elif user_input['show'] == 'Unitarity':
        if user_input['rep'] == 'ds':
            define_grp = set_group(user_input)
            ds_param_text = user_input['dsparam']
            ds_param = list()
            for i in range(len(ds_param_text)):
                ds_param.append(int(ds_param_text[i]))
            set_dsparam = "set dsparam=discrete_series(G,"+str(ds_param)+")\n"
            is_unitary = "is_unitary(dsparam)\n"
            atlas_input = define_grp+set_dsparam+is_unitary
        elif user_input['rep'] == 'spherical_ps':
            define_grp = set_group(user_input)
            ds_param_text = user_input['dsparam']
            ds_param = list()
            for i in range(len(ds_param_text)):
                ds_param.append(int(ds_param_text[i]))
            set_dsparam = "set dsparam=discrete_series(G,"+str(ds_param)+")\n"
            is_unitary = "is_unitary(dsparam)\n"
            atlas_input = define_grp+set_dsparam+is_unitary
    else:
        atlas_input = "x=10"
    return atlas_input
