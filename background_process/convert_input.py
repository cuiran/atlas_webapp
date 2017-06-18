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

def get_grp_and_num(user_input):
    if "n" in list(user_input.keys()):
        group_and_numbers =( user_input["group"] + ","  + user_input["n"] + ")") 
    else:
        group_and_numbers =( user_input["group"] + "," + user_input["p"] +  "," + user_input["q"] + ")")
    return group_and_numbers


def get_atlasinput(user_input):
    if user_input['show'] == 'Cartan_Subgroups':
        # if user request to see Cartan subgroups
        define_grp = set_group(user_input)
        define_cartans = "set cartans = Cartan_classes(G)\n"
        print_all = "for i: nr_of_Cartan_classes(G) from 0 do print(\"Cartan number \"+i); print_Cartan_info(cartans[i]) od"
        atlas_input = define_grp+define_cartans+print_all
    elif user_input['show'] == 'Real_Weyl_Group':
        # if user request to see real Weyl group
        if user_input['further']['Cartan']!="":
            # if user want real Weyl group but haven't input a Cartan selection yet
            define_grp = set_group(user_input)
            set_Cartan = "set H=Cartan_class(G,"+str(user_input['further']['Cartan'])+")\n"
            print_all = "print_real_Weyl(G,H)\n"
            atlas_input = define_grp+set_Cartan+print_all
        else:
            # if user want real Weyl group and have chosen a Cartan
            define_grp = set_group(user_input)
            define_cartans = "set cartans = Cartan_classes(G)\n" 
            print_all = "for i: nr_of_Cartan_classes(G) from 0 do print(\"Cartan number \"+i); print_Cartan_info(cartans[i]) od"
            atlas_input = define_grp+define_cartans+print_all
    elif user_input['show'] == 'Real_Forms':
        # if user want real forms
        define_grp = set_group(user_input)
        define_real_forms = "set rf = real_forms(G)\n"
        print_all = "for a in rf do prints(a) od"
        atlas_input = define_grp+define_real_forms+print_all
    elif user_input['show'] == 'Distinguished_Involution':
        # if user want distinguished involusion
        define_grp = set_group(user_input)
        show_dist_inv = "distinguished_involution(G)\n"
        atlas_input = define_grp+show_dist_inv
    elif user_input['show'] == 'Simple_Roots':
        # if user want simple roots
        define_grp = set_group(user_input)
        show_simple_roots = "simple_roots(G)\n"
        atlas_input = define_grp+show_simple_roots
    elif user_input['show'] == 'KGB_Elements':
        # if user want KGB elements
        define_grp = set_group(user_input)
        print_KGB = "print_KGB(G)\n"
        print_KGB_graph = "prints(\"KGB_graph\")\nprint_KGB_graph(G)\n"
        atlas_input = define_grp+print_KGB+print_KGB_graph
    elif user_input['show'] == '':
        # if no show element is selected
        if user_input['rep'] == 'ds':
            # if no show element is selected and the rep selected is discrete series
            if user_input['request'] == 'is_equal_rank':
                # if the webpage request is_equal_rank
                # when user hasn't selected show item
                # but has selected rep as discrete series
                define_grp = set_group(user_input)
                equalrk = "is_equal_rank(G)\n"
                atlas_input = define_grp+equalrk
            elif user_input['request'] == 'rho':
                # if the webpage request the value of rho
                # when user hasn't selected show item
                # but has selected rep as discrete series
                define_grp = set_group(user_input)
                get_rho = "rho(G)\n"
                atlas_input = define_grp+get_rho
        elif user_input['rep'] == 'minimal_split_ps':
            # if no show element is selected and the rep selected is minimal split ps
            if user_input['request'] == 'is_split':
                # if webpage request value of is_split
                # when user hasn't selected show item
                # but has selected rep as min split ps
                define_grp = set_group(user_input)
                split = "is_split(G)\n"
                atlas_input = define_grp+split
            elif user_input['request'] == 'rho':
                # if webpage request value of rho
                # when user hasn't selected show item
                # but has selected rep as min split ps
                define_grp = set_group(user_input)
                get_rho = "rho(G)\n"
                atlas_input = define_grp+get_rho
    elif user_input['show'] == 'information_on_parameter':
        # if user want to see information on parameter
        if user_input['rep'] == 'ds':
            # if user want to see information and has selected rep as discrete series
            command = "prints(\"menu_item:information_on_parameter\")\n"
            define_grp = set_group(user_input)
            group_and_numbers = get_grp_and_num(user_input)
            print_grp = "prints(\"group:\",G)\n"
            get_nice_x= "set x_K=get_nice_x_from_group_and_integers(" + group_and_numbers + "\n"
            print_x_K="prints(\"x_K=\",x_K)\n"
            print_rho_K="prints(\"rho_K=\",rho_K(KGB(G,x_K)))\n"
            ds_param_text = user_input['dsparam']
            ds_param_asstring = make_param_string(ds_param_text)
            set_dsparam = "set dsparam=discrete_series(KGB(G,x_K),"+ds_param_asstring+")\n"
            parameter = "prints(\"parameter=\", dsparam)\n"
            inf_char = "prints(\"infinitesimal character=\", infinitesimal_character(dsparam))\n"
            lkt="prints(\"LKT:\", highest_weights(LKT(dsparam),KGB(G,x_K))[0])\n"
            lkt_dim="prints(\"LKT_dimension:\", dimension(highest_weights(LKT(dsparam))[0]))\n"
            atlas_input = command + define_grp + print_grp  +  get_nice_x+ print_x_K + print_rho_K + set_dsparam + parameter+ inf_char + lkt + lkt_dim
        if user_input['rep'] == 'minimal_split_ps':
            command = "prints(\"menu_item:information_on_parameter\")\n"
            define_grp = set_group(user_input) + '\n'
            print_grp = "prints(\"group:\",G)\n"
            group_and_numbers = get_grp_and_num(user_input)
            get_nice_x = "set x_K=get_nice_x_from_group_and_integers("+group_and_numbers+"\n"
            print_x_K = "prints(\"x_K=\",x_K)\n"
            print_rho_K = "prints(\"rho_K=\",rho_K(KGB(G,x_K)))\n"
            set_psparam = "set psparam=minimal_principal_series(G,"+epsilon_to_lambda(user_input)+","+make_param_string(user_input["nu"])+")"+"\n"
            parameter = "prints(\"parameter=\",psparam)\n"
            inf_char = "prints(\"infinitesimal character=\", infinitesimal_character(psparam))\n"
            lkts = "prints(\"LKTs:\", for mu in LKTs(psparam) do highest_weights(mu,KGB(G,x_K))[0] od)\n"
            lkt_dims="prints(\"LKT_dimensions:\", for mu in LKTs(psparam) do dimension(highest_weights(mu)[0]) od)\n"
            atlas_input =  command + define_grp + print_grp  +  get_nice_x+ print_x_K + print_rho_K + set_psparam + parameter+ inf_char + lkts + lkt_dims
    elif user_input['show'] == 'Branch_to_K':
        # if user want to see branch to K
        if user_input['rep'] == 'ds':
            #if user want to see branch to K and has selected rep as discrete series
            command = "prints(\"menu_item:Branch_to_K\")\n"
            define_grp = set_group(user_input)
            define_grp = set_group(user_input)
            if "n" in list(user_input.keys()):
                group_and_numbers =( user_input["group"] + ","  + user_input["n"] + ")") 
            else: 
                group_and_numbers =( user_input["group"] + "," + user_input["p"] +  "," + user_input["q"] + ")")
            print_grp = "prints(\"group:\",G)\n"
            get_nice_x= "set x_K=get_nice_x_from_group_and_integers(" + group_and_numbers + "\n"
            print_x_K="prints(\"x_K=\",x_K)\n"
            print_rho_K="prints(\"rho_K=\",rho_K(KGB(G,x_K)))\n"
            ds_param_text = user_input['dsparam']
            ds_param_asstring = make_param_string(ds_param_text)
            set_dsparam = "set dsparam=discrete_series(KGB(G,x_K),"+ds_param_asstring+")\n"
            parameter = "prints(\"parameter=\", dsparam)\n"
            tag = "prints(\"Value:\")\n"
            branch = "print_branch_irr_long(dsparam,KGB(G,x_K),3*height(dsparam))\n";
            atlas_input = command+define_grp+print_grp + get_nice_x + print_x_K + print_rho_K + set_dsparam+parameter+tag+branch
        if user_input['rep'] == 'minimal_split_ps':
            command = "prints(\"menu_item:Branch_to_K\")\n"
            define_grp = set_group(user_input) + '\n'
            print_grp = "prints(\"group:\",G)\n"
            group_and_numbers = get_grp_and_num(user_input)
            get_nice_x = "set x_K=get_nice_x_from_group_and_integers("+group_and_numbers+"\n"
            print_x_K = "prints(\"x_K=\",x_K)\n"
            print_rho_K = "prints(\"rho_K=\",rho_K(KGB(G,x_K)))\n"
            set_psparam = "set psparam=minimal_principal_series(G,"+epsilon_to_lambda(user_input)+","+make_param_string(user_input["nu"])+")"+"\n"
            parameter = "prints(\"parameter=\",psparam)\n"
            inf_char = "prints(\"infinitesimal character=\", infinitesimal_character(psparam))\n"

            branch_irr = "prints(\"branch_irr\");print_branch_irr_long(psparam,KGB(G,x_K),3*height(psparam)+20)\n";
            branch_std = "prints(\"branch_std\");print_branch_std_long(psparam,KGB(G,x_K),3*height(psparam)+20)\n";
            atlas_input =  command + define_grp + print_grp  +  get_nice_x+ print_x_K + print_rho_K + set_psparam + parameter+ inf_char + branch_irr + branch_std
    elif user_input['show'] == 'Unitarity':
        # if user want to see unitarity
        if user_input['rep'] == 'ds':
            # if user want to see unitarity and has selected rep as discrete series
            command = "prints(\"menu_item:unitarity\")\n"
            define_grp = set_group(user_input)
            ds_param_text = user_input['dsparam']
            ds_param_asstring = make_param_string(ds_param_text)
            set_dsparam = "set dsparam=discrete_series(G,"+ds_param_asstring+")\n"
            print_rep = "dsparam\n";
            is_unitary = "is_unitary(dsparam)\n"
            atlas_input = command+ define_grp+set_dsparam+print_rep+is_unitary
        elif user_input['rep'] == 'minimal_split_ps':
            command = "prints(\"menu_item:unitarity\")\n"
            define_grp = set_group(user_input) + '\n'
            set_psparam = "set psparam=minimal_principal_series(G,"+epsilon_to_lambda(user_input)+","+make_param_string(user_input["nu"])+")"+"\n"
            parameter = "prints(\"parameter=\",psparam)\n"
            print_rep = "psparam\n";
            is_unitary = "is_unitary(psparam)\n"
            atlas_input = command+ define_grp+set_psparam+print_rep+is_unitary
    elif user_input['show'] == 'character_formula':
        if user_input['rep'] == 'ds':
            command = "prints(\"menu_item:character_formula\")\n"
            define_grp = set_group(user_input)
            ds_param_text = user_input['dsparam']
            ds_param_asstring = make_param_string(ds_param_text)
            set_dsparam = "set dsparam=discrete_series(G,"+ds_param_asstring+")\n"
            print_rep = "dsparam\n";
            print_character_formula="prints(\"characterFormula:\");print_character_formula(dsparam)\n"
            atlas_input = command+define_grp+set_dsparam+print_rep+print_character_formula
        elif user_input['rep'] == 'minimal_split_ps':
            command = "prints(\"menu_item:character_formula\")\n"
            define_grp = set_group(user_input)
            set_psparam = "set psparam=minimal_principal_series(G,"+epsilon_to_lambda(user_input)+","+make_param_string(user_input["nu"])+")"+"\n"
            parameter = "prints(\"parameter=\",psparam)\n"
            print_rep = "psparam\n";
            print_character_formula="prints(\"characterFormula:\");print_character_formula(psparam)\n"
            atlas_input = command+define_grp+set_psparam+print_rep+print_character_formula


    elif user_input['show'] == 'composition_series':
        if user_input['rep'] == 'ds':
            command = "prints(\"menu_item:composition_series\")\n"
            define_grp = set_group(user_input)
            ds_param_text = user_input['dsparam']
            ds_param_asstring = make_param_string(ds_param_text)
            set_dsparam = "set dsparam=discrete_series(G,"+ds_param_asstring+")\n"
            print_rep = "dsparam\n";
            print_composition_series="prints(\"compositionSeries:\");print_composition_series(dsparam)\n"
            atlas_input = command+define_grp+set_dsparam+print_rep+print_composition_series
        elif user_input['rep'] == 'minimal_split_ps':
            command = "prints(\"menu_item:composition_series\")\n"
            define_grp = set_group(user_input)
            set_psparam = "set psparam=minimal_principal_series(G,"+epsilon_to_lambda(user_input)+","+make_param_string(user_input["nu"])+")"+"\n"
            parameter = "prints(\"parameter=\",psparam)\n"
            print_rep = "psparam\n";
            print_composition_series="prints(\"compositionSeries:\");print_composition_series(psparam)\n"
            atlas_input = command+define_grp+set_psparam+print_rep+print_composition_series

#    elif user_input['show'] == 'composition_series':
#        if user_input['rep'] == 'ds':
#            command = "prints(\"menu_item:composition_series\")\n"
#            define_grp = set_group(user_input)
#            define_rep = "set p=trivial(G)\n"
#            print_rep = "print(\"p=\",p)\n";
#            print_composition_series="print_composition_series(p)\n"
#            atlas_input = command+define_grp+define_rep+print_rep+print_composition_series
#        elif user_input['rep'] == 'minimal_split_ps':
#            command = "prints(\"menu_item:composition_series\")\n"
#            define_grp = set_group(user_input)
#            define_rep = "set p=trivial(G)\n"
#            atlas_input = command+define_grp+define_rep
    else:
        atlas_input = "set x=10"
    return atlas_input

def str_to_intorfrac(s):
    # make sure the user entered an integer or a fraction
    try:
        return str(int(s))
    except ValueError:
        l = s.split('/')
        n = int(l[0])
        d = int(l[1])
        return str(n)+'/'+str(d)

def make_param_string(param_text):
    # the input is an array of strings, for example ['3/2','1/2']
    # the output should be a string that is an array '[3/2,1/2]'
    s = '['
    for i in range(len(param_text)):
        s = s+str_to_intorfrac(param_text[i])
        s = s+','
    # remove the last comma in string, we don't need that
    s = s[:-1]+']'
    return s

def epsilon_to_lambda(user_input):
    # convert ['pos','neg'] to the string [0,1]+rho(G)
    user_input_epsilon = user_input["epsilon"]
    s = '['
    for pm in user_input_epsilon:
        if pm == 'pos':
            s = s+'0'
            s = s+','
        elif pm == 'neg':
            s = s+'1'
            s = s+','
    s = s[:-1]+']'
    s = s+"+rho(G)"
    return s
