def get_Cartans(user_input):
	group = str(user_input["group"])
	rank = str(user_input["rank"])
	atlas_input = (
		"set n="+rank+"\n"+
		"set G="+group+"\n"+
		"set cartans = Cartan_classes(G)\n"+
		"for i: nr_of_Cartan_classes(G) from 0 do print(\"Cartan number \"+i); print_Cartan_info(cartans[i]) od")
	return atlas_input	
