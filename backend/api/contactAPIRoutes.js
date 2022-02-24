module.exports =  (router,app,contactAPI)=>{
    router.post('/addcontact',app,contactAPI.addcontact);
    router.post('/updatecontact',app,contactAPI.updatecontact);
    router.post('/deletecontact',app,contactAPI.deletecontact);

    router.post('/getcontact',app,contactAPI.getcontact);


    return router;

}