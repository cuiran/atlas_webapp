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
