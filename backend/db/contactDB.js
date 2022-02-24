let pgPool;
module.exports = (injectedPgPool) => {
    pgPool = injectedPgPool;

    return {
        addcontact: addcontact,
        updatecontact: updatecontact,
        deletecontact: deletecontact,
        getcontact:getcontact

    };
};
//add contact
function addcontact(fname, lname, email, phone, image, cbFunc) {
    const getQuery = `insert into contactinfo values (
        '${fname}','${lname}','${email}','${phone}','${image}'
        ) `;
    pgPool.query(getQuery, (response) => {
        cbFunc(response);
    });
}
// lname='${lname}'::text,email='${email}'::text,phone='${phone}'::text,imageurl='${image}'::text,
// 
function updatecontact(fname, lname, newfname, newlname, newemail,newphone,newimage, cbFunc) {
    console.log(newlname)
    const getQuery = `update contactinfo set fname='${newfname}',lname='${newlname}',email='${newemail}',phone='${newphone}',imageurl='${newimage}' WHERE  fname = '${fname}' AND lname = '${lname}'
        `;
    console.log(getQuery)
    pgPool.query(getQuery, (response) => {
        cbFunc(response);
    });
}

function deletecontact(fname, lname, cbFunc) {
    const getQuery = `DELETE FROM contactinfo WHERE fname = '${fname}' AND lname = '${lname}'`;
    pgPool.query(getQuery, (response) => {
        cbFunc(response);
    });
}


function getcontact(cbFunc) {
    const getQuery = `select * FROM contactinfo`;
    pgPool.query(getQuery, (response) => {
        cbFunc(response);
    });
}