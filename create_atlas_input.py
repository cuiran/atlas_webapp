def set_group (group,rank):
	s = (
		"set n="+rank+"\n"+
		"set G="+group+"\n")
	return s

def get_Cartans(user_input):
	group = str(user_input["group"])
	rank = str(user_input["rank"])
	atlas_input = (
		set_group(group,rank)+
		"set cartans = Cartan_classes(G)\n"+
		"for i: nr_of_Cartan_classes(G) from 0 do print(\"Cartan number \"+i); print_Cartan_info(cartans[i]) od")
	return atlas_input

def get_realforms(user_input):
	group = str(user_input["group"])
	rank = str(user_input["rank"])
	atlas_input = (
		set_group(group,rank)+
		"set rf = real_forms(G)\n"+
		"for a in rf do prints(a) od")
	return atlas_input

def get_distinv(user_input):
	group = str(user_input["group"])
	rank = str(user_input["rank"])
	atlas_input = (
		set_group(group,rank)+
		"distinguished_involution(G)\n"
		)
	return atlas_input

def get_simple_roots(user_input):
	group = str(user_input["group"])
	rank = str(user_input["rank"])
	atlas_input = (
		set_group(group,rank)+
		"simple_roots(G)\n")
	return atlas_input

def print_KGB(user_input):
	group = str(user_input["group"])
	rank = str(user_input["rank"])
	atlas_input = (
		set_group(group,rank)+
		"print_KGB(G)\n")
	return atlas_input

def real_weyl(user_input):
	group = str(user_input["group"])
	rank = str(user_input["rank"])
	Cartan_num = str(user_input["Cartan"])
	atlas_input = (
		set_group(group,rank)+
		"set H=Cartan_class(G,"+Cartan_num+")\n"
		"print_real_Weyl(G,H)\n")
	return atlas_input


def branch_to_K(user_input):
	group = str(user_input["group"])
	rank = str(user_input["rank"])
	if user_input["param"] == "trivial":
		atlas_input=(
			set_group(group,rank)+
			"set t=trivial(G)\n"+
			"print_branch_std_long(t,10)\n")
	return atlas_input

def unitarity(user_input):
	group = str(user_input["group"])
	rank = str(user_input["rank"])
	if user_input["param"]=="trivial":
		atlas_input = (
			set_group(group,rank)+
			"set t=trivial(G)\n"+
			"is_unitary(t)\n")
	return atlas_input

def cuspidal_data(user_input):
	group = str(user_input["group"])
	rank = str(user_input["rank"])
	if user_input["param"]=="trivial":
		atlas_input = (
			set_group(group,rank)+
			"set t=trivial(G)\n"+
			"cuspidal_data(t)\n")
	return atlas_input

