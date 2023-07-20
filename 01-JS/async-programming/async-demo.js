(function(){
    function addSync(x,y){
        console.log('   [@service] processing', x , ' and ', y)
        var result = x + y;
        console.log('   [@service] returing the result')
        return result;
    }

    function addSyncClient(){
        console.log('[@client] invoking the service')
        var result = addSync(100,200)
        console.log('[@client] result = ', result)
    }

    window['addSyncClient'] = addSyncClient;
        
})()