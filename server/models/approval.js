module.exports = function(mongodb,app,config){
    //This REST model is a proxy to the messages model for appoving and querying approved messages
    var notapp = function(id, params, callback) {
        callback('NOT APPLICABLE');
    };

    var approvals = {
        find: function(params, callback) {
            app.service('messages')
                find({query:{approved: true}},callback);
        },
        get: notapp,
        create: function(data, params, callback) {
            app.service('messages')
                .patch(data.id,{approved:true},callback);
        },
        update: notapp,
        patch: notapp,
        remove: function(id, params, callback) {
            if(id === 'all'){
                app.service('messages')
                    .find({query:{approved:true}},function(err,recs){
                        recs.forEach(function(rec){
                            app.service('messages')
                                .patch(rec._id,{approved:false},callback);
                        });
                    });
                return;
            }

            app.service('messages')
                .patch(id,{approved:false},callback);
        }
    };
    app.use('/approvals', approvals);
};