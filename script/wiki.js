require.config({
    paths : {
        text: 'script/require/json',
        async: 'script/require/async',
        json: 'script/require/json'
    }
});

let route = location.hash.substr(1).split('~@~')
let version = route[1]
let path
if(route[0] == 'config.toml') path = 'config'
console.log(version)

require(['json!./data/'+version+'/'+path+'.json'], (data) => {
    document.write(data)
})