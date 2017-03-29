import datetime
import subprocess
import uuid
import threading

import pymongo

# fields in the mongo documents
_ID = '_id'                     # unique identifier for the query
STATUS = 'status'               # status indicating the state of the query
STARTED = 'started'             # when the query was started
FINISHED = 'finished'           # when the query was finished
INPUT = 'input'                 # the input used to start the query
OUTPUT = 'output'               # output from atlas for the query
ERROR = 'error'                 # for storing error messages, if any

# possible statuses for a query
INITIALIZED = "INITIALIZED"     # got started -- if the status is this, assume it's still running!
FAILED = "FAILED"               # failed somehow
TIMED_OUT = "TIMED_OUT"         # failed due to timeout (not yet implemented)
SUCCESS = "SUCCESS"             # completed and generated output

# set up the database
client = pymongo.MongoClient('localhost:27017')
database = client.atlas
queries_collection = database.queries  # type: pymongo.collection.Collection


def process_input(user_input, atlas_dir):
    # make the line breaks work properly. no clue why this helps
    #user_input = user_input.split('\\n')
    #user_input = "\n".join(user_input)

    # if there's already a non-failed query with this input, just look at that one
    query_id = try_find_existing_query(user_input)

    if query_id:
        return query_id

    query_id = str(uuid.uuid4())
    register_new_query(user_input, query_id)

    # this will run the query and update mongo with the result when it finishes
    bg_thread = threading.Thread(target=run_query,
                                 args=(user_input, query_id, atlas_dir))
    bg_thread.start()

    return query_id  # it's started, we're all having a good day


def try_find_existing_query(user_input):
    query = {
        INPUT: user_input,
        STATUS: {
            '$in': [INITIALIZED, SUCCESS]
        }
    }

    doc = queries_collection.find_one(query)
    if doc:
        return doc[_ID]
    else:
        return None


def run_query(user_input, query_id, atlas_dir):
    output, error = run_atlas_query(user_input, atlas_dir)
    update_query(query_id, output, error)
    return  # nothing; background threads don't return things


def trim_output(raw_atlas_output):
    lines = raw_atlas_output.split('\n')
    # first 3 lines are atlas boilerplate (version and stuff)
    # last two lines are also boilerplate
    trimmed_output = "\n".join(lines[3:-2])
    return trimmed_output


def register_new_query(user_input, query_id):
    inserted_doc = {
        _ID: query_id,
        STATUS: INITIALIZED,
        STARTED: datetime.datetime.utcnow(),
        INPUT: user_input,
        OUTPUT: None
    }

    queries_collection.insert_one(inserted_doc)


def update_query(query_id, output, error):
    search_doc = {
        _ID: query_id
    }

    if error:
        status = FAILED
    else:
        status = SUCCESS

    update_doc = {
        "$set": {
            OUTPUT: output,
            ERROR: error,
            STATUS: status,
            FINISHED: datetime.datetime.utcnow()
        }
    }

    queries_collection.update_one(search_doc, update_doc, upsert=False)


def check_query_status(query_id):
    search = {
        _ID: query_id
    }

    found = queries_collection.find_one(search)
    if found:
        err = found.get(ERROR)
    else:
        return "", "", "Unrecognized query_id: {}".format(query_id)

    status = found.get(STATUS)
    if status == SUCCESS:
        output = found.get(OUTPUT)
    else:
        print("status is "+status)
        output = None

    return status, output, err


def run_atlas_query(user_input, atlas_dir):
    p = subprocess.Popen(["../atlas all galois"],
                         cwd=atlas_dir+"atlas-scripts",
                         shell=True,
                         universal_newlines=True,
                         stdin=subprocess.PIPE,
                         stdout=subprocess.PIPE,
                         stderr=subprocess.PIPE)

    output, err = p.communicate(input=user_input)
    #output = output.decode('UTF-8')
    #err = err.decode('UTF-8')
    if not err:
        output = trim_output(output)

    return output, err

def perl_process(output):
    with open('perl_scripts/output.tmp','w') as f:
        f.write(output)
    f.close()
    p = subprocess.Popen(["perl perl_scripts/testperl.pl"],
        shell=True,
        universal_newlines=True,
        stdin=subprocess.PIPE,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE)
    out,err = p.communicate()
    subprocess.call(['rm','perl_scripts/output.tmp'])
    return out,err
