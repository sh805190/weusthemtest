
let contactDB;
module.exports =  (injectedContactDB)=>{
    contactDB=injectedContactDB;
    return{
        addcontact:addcontact,
        updatecontact:updatecontact,
        deletecontact:deletecontact,
        getcontact:getcontact
    }
}
//add contact
function addcontact(req,res){
    contactDB.addcontact(req.body.fname,req.body.lname,req.body.email,req.body.phone,req.body.image,(response)=>{
        if(response.error!==undefined){
            res.send(response.error);

        }
        else{
            res.send(JSON.stringify(response));

        }

    })
}

function getcontact(req,res){
    contactDB.getcontact((response)=>{
        if(response.error!==undefined){
            res.send(response.error);

        }
        else{
            res.send(JSON.stringify(response.results.rows));

        }

    })
}

function updatecontact(req,res){
    console.log("backend"+JSON.stringify(req.body))
    contactDB.updatecontact(req.body.fname,req.body.lname,
        req.body.newfname,req.body.newlname,req.body.newemail,req.body.newphone,req.body.newimage,
        (response)=>{
        if(response.error!==undefined){
            res.send(response.error);

        }
        else{
            res.send(JSON.stringify(response));

        }

    })
}

function deletecontact(req,res){
    contactDB.deletecontact(req.body.fname,req.body.lname,(response)=>{
        if(response.error!==undefined){
            res.send(response.error);

        }
        else{
            res.send(JSON.stringify(response));

        }

    })
}