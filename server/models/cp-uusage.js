'use strict';

module.exports = function(Cpuusage) {
    
/**
 * Needs to insert data every 5s intervel
 * @param {Function(Error, string)} callback
 */

Cpuusage.InsertDetails = function(callback) {
    var count;
    Cpuusage.getDataSource().connector.connect(function(err, db){
        if (err){
            callback("Error from mongo connection");
        }
        db.CPUusage.createIndex({created_Date: 1}, {expireAfterSeconds: 5});
        while(true){
               db.CPUusage.insertOne({
                         cpuUsage: Math.floor(Math.random() + 1),
                         NetworkUsage : Math.floor(Math.random() + 1),
                         MemoryUsage: Math.floor(Math.random() + 1),
                         created_Date: new Date()
                         
               })
               count = db.CPUusage.count();
               sleep(5*1000);
               callback(null,count);
              
        }
    }
    
    
    )
  };

};

